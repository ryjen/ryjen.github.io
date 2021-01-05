---
title: Microsoft Dev Stack on macOS
tags:
  - dotnet
  - xamarin
  - visual studio
  - cross platform
  - mobile
  - web
date: 2016-11-27
description: a microsoft cross-platform mobile and cloud first development stack on macOS
banner: /images/blog/vs_for_macos.png
---

 Gonna evangelize a little bit.

 When [Microsoft](http://microsoft.com) bought Xamarin, they did not underestimate the power of [Xamarin.Forms](https://www.xamarin.com/forms) for building cross platform UIs.  Now with the release of Visual Studio for macOS and the Dotnet Core, its looks like its going to stay alive.

#### Development Environment

- macOS, XCode
- Android SDK
- [Dotnet core](https://blogs.msdn.microsoft.com/dotnet/2014/12/04/introducing-net-core/)
- [Visual Studio for macOS](https://www.visualstudio.com/vs/visual-studio-mac/)
- [nuget](https://www.nuget.org)

#### Web ASP.NET Production Environment

- [Digital Ocean](http://digitalocean.com)
- [Dotnet core on Docker](https://hub.docker.com/r/microsoft/dotnet/)
- [Dokku](https://github.com/dokku/dokku), docker based heroku

#### Platforms Targeted in One Solution

- iOS
- Android
- Web ASP.NET

#### Benefits

- Build everything in one language
- Common code library
- Has Xamarin Forms for cross platform UI
- Mobile apps compile native ([more on mobile](#moreonmobile))
- Reproducibility and deployability for webapps

<a name="msnews"></a>
#### Microsoft Friendliness

- [Introducing Dotnet Core](https://blogs.msdn.microsoft.com/dotnet/2014/12/04/introducing-net-core/)
- [Microsoft Joins Linux Foundation and Welcomes Google to .NET Foundation](http://news.microsoft.com/2016/11/16/microsoft-contributes-to-open-ecosystem-by-joining-linux-foundation-and-welcoming-google-to-the-net-community/#sm.0000vlfgmpqosfayrcj1cpvit3n4o#zFYyqfuTPBvZCC2o.97)
- [Microsoft brings Ubuntu bash to Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about)

<a name="moreonmobile"></a>
####  More on using Xamarin for Mobile Solutions

- very fast release cycles that keep you up to date with mobile SDKs
- UI classes have direct mapping to native SDK classes
- If native libraries don't already have a package in NuGet, a binding can be written to use them
- A test cloud is offered for enterprise testing
- Have the option/benefit of XAML layouts and data binding on mobile dev
- [Certification is available](https://university.xamarin.com/resources/certification)!

<a name="othersolutions"></a>
#### Other Cross Platform Solutions

- [Multi OS Engine](https://software.intel.com/en-us/multi-os-engine) for Java
- [Flutter](https://flutter.io) for Dart/JS
- [Cordova](https://cordova.apache.org) for JS


