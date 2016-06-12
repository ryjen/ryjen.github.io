---
title: Blackberry + Push + Android
tags:
  - android
  - android studio
  - apk
  - bar
  - blackberry
  - gradle
  - java
  - push messaging
date: 2014-09-14
description: "hacking push messaging on android on blackberry"
banner: /images/blog/bb_apk_packager.png
---

I would like to track my experience with setting up push messaging for blackberry using an android application.

The main [blackberry link on this subject](http://developer.blackberry.com/android/apisupport/creating_push-enabled_android_apps.html) provides some basics, however I will try go into some detail on the process I used.

There is an accompanying [github project](http://github.com/ryjen/droidBBpush) for this post you can reference.

### Phase 1: Client Side Build Configuration

The android api for push messaging is now included in the Google Play Services, which is not supported on blackberry devices.   The [word from Blackberry](http://developer.blackberry.com/android/apisupport/creating_push-enabled_android_apps.html) is to use the legacy stand-alone SDK which they say is still supported _(2014-09-14)_.

Normal android builds should use Google Play Services to I'm going to split the project using Gradle build variants.

**1)** First thing to do is to create two seperate source code folders.  One for google play services, and another for the legacy SDK blackberry will use.  So this is what our src directory will look like:
```
    - main
        - java
        - res
        - ApplicationManifest.xml
    - blackberry    // legacy gcm
        - java
      - assets
           - android.cfg
           - MANIFEST.MF
    - googlePlay    // google play gcm
        - java
        - ApplicationManifest.xml
    - libs
    - gcm.jar   // legacy gcm sdk for blackberry
```
**2)** Now add a new product flavor in your build.gradle.  Note that I am using flavors with the same name as the folders I created above.  You can use different folders/flavours but you must then assign a source folder to a flavor
```groovy
    productFlavors {
        blackberry {}
        googlePlay {}
    }
```
**3)** Add the [legacy GCM SDK](https://code.google.com/p/gcm/) to your project. It is available [from this link](https://gcm.googlecode.com/git/gcm-client-deprecated/dist/gcm.jar). Download it and put in the libs directory.

**4)** Now configure build dependencies per flavor by adding the google play services and the legacy sdk for blackberry:

```groovy
    dependencies {
      compile fileTree(dir: 'libs', include: ['*.jar'], exclude: ['gcm.jar']) // be sure to exclude the legacy sdk
        googlePlayCompile 'com.google.android.gms:play-services:4.3.+'
        blackberryCompile files('libs/gcm.jar')
    }
```

**5)** The _main_ source folder's AndroidManifest.xml contains the following common configuration for push messaging. Don't forget to replace package names as appropriate:
```xml
    <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />

    <uses-permission android:name="com.arg3.examples.droidbb.permission.C2D_MESSAGE" />

    <permission
        android:name="com.arg3.examples.droidbb.permission.C2D_MESSAGE"
        android:protectionLevel="signature" />

    <service android:name=".gcm.GCMIntentService" />

    <receiver
            android:name=".gcm.GCMBroadcastReceiver"
            android:permission="com.google.android.c2dm.permission.SEND">
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />

            <action android:name="com.google.android.c2dm.intent.REGISTRATION" />

            <category android:name="com.arg3.examples.droidbb" />
        </intent-filter>
    </receiver>
```
**6)** The _googlePlay_ source folder should contain an AndroidManifest.xml with the following:
```xml
    <meta-data android:name="com.google.android.gms.version"
        android:value="@integer/google_play_services_version" />
```
You do not need to include any other configuration, AndroidManifest's in different source folders get merged.

**7)** Add two files to the blackberry specific build.  They are not part of the build but they will get used when creating a BAR file in phase 3. First file is 'android.cfg' with the following:
```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android>
       <push>
          <appid>some_appID</appid>
          <ppgurl>http://cpXXX.pushapi.eval.blackberry.com</ppgurl>
          <tokenprefix>bb-</tokenprefix>
       </push>
    </android>
```
**appId** and **ppgurl** should the the values give to you when you register for blackbery push messaging.  The token prefix, will prefix the android GCM token when returned to you, it is not required.

**8)** The second file is 'MANIFEST.MF' with the following:
```
    Entry-Point-System-Actions: _sys_use_consumer_push
```
Which will allow the application to consume push messages.

### Phase 2: Client Side Source Code

Check the [complete project](http://github.com/ryjen/droidBBpush) for this post which contains all the source code.

The brief version is that there are two version of the code, each containing three classes:

**GCMBroadcastReceiver** which receives a push request and deploys to the service.

**GCMHandler** which initializes the service and posts to the registrar.

and **GCMIntentService** which does something with the message.

There are also **PushNotifier** which displays the notification, **PushRegistrar** with registers a device with your server.

### Phase 3: The BAR File

_Step 1:_

First assemble your blackberry apk:
```
    ./gradlew assembleBlackberryRelease
```
From Android Studio you also run &ldquo;Build -> Generate Signed APK&rdquo;.

_Step 2:_

Fire up the GUI version of APK Packager from the [blackberry command line tools](https://developer.blackberry.com/android/tools/) for android.  If you have the blackberry plugin for android studio installed you can access it from &ldquo;Build -> Package APK to BAR&rdquo;

_Step 3:_

Specify the input apk (should be in _build/outputs/apk/blackberry-release.apk_) and output bar file.

_Step 4:_

Click advanced settings and add the android.cfg file and the custom manifest file we defined in Phase 1. Make sure you check the checkbox to _merge_ the manifest files.

_Step 5:_

[![APK Packager](/images/blog/bb_apk_packager.png)](/images/blog/bb_apk_packager.png)

The end result should look something like this:

Package the app.  Sign it if you have a signing keys, and deploy it if you have a device connected.

This of course can all be scripted on the command line as well, which QA likes.

### Phase 4: Server Side Code

Again refer to the [github project for this post](http://github.com/ryjen/droidBBpush) for the backend code.

I used the java Push SDK available from blackberry, if you're not using java you will have to implement the [PAP protocol](http://en.wikipedia.org/wiki/Password_authentication_protocol) and [Push Access Protocol](http://help.blackberry.com/en/developers/deliverables/51382/) yourself.  I initially tried to do this, but the service is kinda fussy how arguments work together and the SDK did alot of the validation for me.

Notes on the implementation:

*   if you specified the &ldquo;bb-&rdquo; or whatever prefix for your push tokens to identify them as blackberry, you will have to remove those when you send it through the backend SDK.
*   Be warned the Mac installer for the Blackberry PushSDK doesn't work it says that its damaged (at least for me on Mavericks). You can get around it by executing the inner app from the command line:
```
    ~/Downloads/bpss-1.2.0.29.app/Contents/MacOS/bpss-1.2.0.29
```
