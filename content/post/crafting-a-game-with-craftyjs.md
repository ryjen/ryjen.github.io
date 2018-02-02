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
draft: true
---


#### Introduction

Found a pretty cool javascript game engine called [CraftyJS](http://craftyjs.com/) that I've been playing with the past couple of days.

Has support for things like Entity Component System, Collision, Sprite Maps, etc.

#### The Project

[![Amos the Alien](/image/blog/amos_the_alien.png)](https://amos.coda.life)

Amos the Alien is a small demo I made.

First thing to do if your going to try yourself is to head over [Crafty Components](http://craftycomponents.com) and download the boilerplate.  It really shows off a sophisticated paradigm for creating crafty games.

I knew that I wanted a scrolling background of some sort.

To do this in Crafty, the best way would be to create a _'Scrollable'_ component that scrolls in either direction on the screen.

Then you can create a _'Background'_ entity that contains a list of scrollable components.  I created a simple _scroll_ method is used during frame events or when the main character moves.

Another nice thing about Crafty is the concept of _scenes_ built in.  In my main "scene" i simple create the background, character and platform entities for the demo above.

The only caveat I found with crafty is the _twoway_ movement component.  It is not possible that I can see to know when your character is jumping and where.  I had to modify the crafty source to include a "Jump" event and an isJumping() function.

