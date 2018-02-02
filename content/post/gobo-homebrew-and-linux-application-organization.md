---
title: Gobo / Homebrew and Linux Application Organization
tags:
  - filesystem
  - gobo
  - homebrew
  - linux
date: 2015-08-03
description: "package managers"
banner: http://www.gobolinux.org/images/gobonew.png
draft: true
---


#### Introduction

I really liked the way [Gobo Linux](http://www.gobolinux.org) re-factored the organization of a linux filesystem.

The short story of Gobo was to have each Recipe (application/library) install everything it needs into its own directory. The app files are then linked to support the legacy filesystem that the OS needs (You can read more at [Gobo at Glance](http://www.gobolinux.org/index.php?page=documentation) or [the history of gobo linux](http://www.gobolinux.org/?page=k5)).

Sound familiar?  It's very much like [Homebrew](http://brew.sh) which installs each Formula in a Cellar with links to /usr/local.

This is also not unlike Apple applications themselves, which if you open up are their own fileystem with everything they need to run.

This means that **uninstalling** something is pretty trivial and you feel organized with all application files in their own directory instead of spread out across the filesystem.

I hope that package manager systems will continue to go this route in the future of *NIX.
