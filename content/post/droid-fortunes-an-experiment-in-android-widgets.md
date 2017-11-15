---
title: 'Droid Fortunes: An Experiment in Android Widgets'
tags:
  - android
  - fortunes
  - java
  - widgets
date: 2012-07-04
description: "android development"
banner: /images/blog/droidfortunes.png
---

## Background

I have it set up on my OSX machine to give me a random [fortune](http://en.wikipedia.org/wiki/Fortune_%28Unix%29) when I log into the shell.
I thought it would be a good idea to port this to Android in the form of a widget and Droid Fortunes was born!

So a little more background on the the 'fortune' command for those who do not know.  The program itself is simple enough - display a random message stored in a database.  The 'database' is actually a collection of files representing a 'category'.  Each category has a list of messages separated by a '&#37;' on a new line.

Fortunes are mapped to a random-access data file using 'strfile' (basically a header with size information followed by a list of addresses for each message in the file).

Fortunes also have the concept of an 'offensive' fortunes, which are encoded using [rot13](http://en.wikipedia.org/wiki/ROT13) so anyone viewing the files is not offended.

## Testing

My original prototype of Droid Fortunes attempted to mimic the C implementation by decoding the random access data files.  This was a problem because the addresses in the data file were not portable.

My second prototype used the raw data files and this was a problem as well because it was pretty slow.

At this point, its obvious a database is needed.  I wrote a very simple '[fortune2sqlite](git://gist.github.com/3051477.git)' converter utility to create and populate a sqlite database. After some attempts at importing a sql script, I finally ended up copying the pre-generated database from resources into user-space for use.

## UI

### Widget Layout

So data taken care of, it needs a UI.  Turns out android Widgets use something called '[RemoteViews](http://developer.android.com/reference/android/widget/RemoteViews.html)' to update its UI without an application running.  This is the route a widget must take to transmit information to the Launcher process.  This means you cannot use the typical 'findViewById()' method to coordinate data/UI.  My original implementation was mainly figuring out the RemoteViews usage the event handling. While it worked was not very pretty as I am not a graphic designer.

I have since found the 'Protips' widget from the OS (available as open source) which was very similar to what I was doing except displaying Android tips instead of fortunes - hence I've updated my UI to mimic that widget.  Eventually I will replace the little 'droid' character with something custom.

![DroidFortunes Widget View](/images/blog/droidfortunes.png)

Another issue is that the widgets are not always going to be able to display the full fortune text.  ScrollView is not available in widgets, so my alternative was to add an ellipsis after 5 lines (...) and open a full activity display when the widget is clicked.  I also added two buttons on bottom left/right corners - one for settings and one for manually advancing to the next fortune.

![[DroidFortunes Details View](/images/blog/droidfortunes_details.png)
```sql
    SELECT f.* FROM fortunes f JOIN category c ON f.type = c.name WHERE c.enabled ORDER BY RANDOM() LIMIT 1
```
Nice and simple query gets the job done.

### Settings

Haven't quite finished implementing this yet but basically I want to be able to turn on/off fortune categories and offensive fortunes.

Eventually I would like to implement importing new UNIX fortunes or adding your own fortunes (maybe from funny text messages or something). I would like this to be a paid feature, but I'll have to make sure I'm not infringing on any licenses by using the fortune database.

![DroidFortunes Settings View](/images/blog/droidfortunes_settings.png)

## Conclusion

So all in all, I'm pleased with the result.  It took me approximately 30 hours to get this far but the grunt work is done.
