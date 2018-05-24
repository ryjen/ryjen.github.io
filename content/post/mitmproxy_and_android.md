---
title: "Mitmproxy and Android"
description: "Some notes on using a network sniffer with android"
date: 2018-05-16
tags: ["proxy", "android", "network", "security", "certificates"]
categories: ["mobile"]
---

## Introduction

Debugging network traffic for your app can be useful, and sometimes necessary if the data is not what is expected or inconsistent.


## The Proxy

I prefer the open source proxy [mitmproxy](https://mitmproxy.org =300x203).  Easy to install on OSX with [homebrew](https://brew.sh).

 `brew install mitmproxy` 

I'll leave it up to you to explore its greatness, I just wanna clarify the android setup.

## Steps

### 1) mitmproxy

Choose a port (ex. 8888)  and start the program: `mitmproxy -p 8888`: 

![mitmproxy](/image/blog/mitmproxy.png)
 
If you prefer a web interface `mitmweb`: 

![mitmweb](/image/blog/mitmweb.png)

### 2) Android

Find your IP address on [whatismyip.com](https://whatismyip.com).  For example `55.55.55.55`.

#### 2.1) Emulator

a) Open the extended controls from the emulator.

 ![extended controls](/image/blog/extended_controls.png)

b) Go to Settings and click on the Proxy tab. Enter your IP address and a port. ![emulator proxy](/image/blog/emulator_proxy.png)

#### 2.2) Device

Download a [proxy app](https://play.google.com/store/apps/details?id=org.proxydroid&hl=en) and enter the same settings.

#### 2.3) Certificates

a) Open the mitmproxy portal to download its HTTPS certificate: `https://mitm.it`

b) Download the Android certificate and install it.  Name it whatever your want.

![mitm cert](/image/blog/mitm_cert.png)

## Gotcha

Starting in Android N, [user certificates are not used by default](https://android-developers.googleblog.com/2016/07/changes-to-trusted-certificate.html).  Your app will have to define a [network configuration](https://developer.android.com/training/articles/security-config) to use the certificate.

Configuring this is possible only during debugging using the `debug-overrides` directive.

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <debug-overrides>
        <trust-anchors>
            <!-- Trust preinstalled CAs -->
            <certificates src="system" />
            <!-- Additionally trust user added CAs -->
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```


