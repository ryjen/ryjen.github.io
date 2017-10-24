---
title: Textman Part 1
date: 2016-05-10
draft: true
tags:
    - text games
    - asci art
    - games
    - command line
    - curses
    - c++
description: "sillyness"
draft: true
---

a ascii art hero, who has amazing adventures and solves interesting problems.

Dev Log
------

The initial implementation sees an animatable ascii art hero that can walk and jump.

The engine is a simple entity based system with rendering done on the [curses](https://en.wikipedia.org/wiki/Curses_(programming_library)) library.

The next step will be to create a way to render a scene in the background that scrolls when the hero walks.

<video width="320" height="240" controls>
  <source src="/video/Textman.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
