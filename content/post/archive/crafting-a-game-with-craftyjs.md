---
title: Crafting a Game With CraftyJS
tags:
  - games
  - javascript
  - web
date: 2012-11-17
description: "javascript games"
aliases:
  - blog/2012/11/17/crafting-a-game-with-craftyjs
banner: /images/blog/amos_the_alien.png
---


#### Introduction

Briefly going to mention a javascript game engine called [CraftyJS](http://craftyjs.com/) that I've been playing with the past couple of days. 

Has the usual suspects like Entity Component System, Collision, Sprite Maps, etc.


#### The Project

[![Amos the Alien](/image/blog/amos_the_alien.png)](https://amos.coda.life)

[Amos the Alien](https://amos.coda.life) is a small demo I made.

I knew that I wanted a scrolling background of some sort - in other words - parallax scrolling.  I also knew that I wanted two modes of scrolling:  A) automatic background scrollin (clouds, etc) and character movement scrolling.

To do this in Crafty, the best way would be to create a _'Scrollable'_ component that scrolls in either direction on the screen.

Then you can create a _'Background'_ entity that contains a list of scrollable components.  A _scroll_ method is used during frame events or when the main character moves.

Crafty also has _scenes_ for which I built the background, character and platform entities for the demo above.

All and all, it was fun.  Might continue it one day, but not really motivated to.


