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

[![Amos the Alien](/images/blog/amos_the_alien.png)](https://amos.coda.life)

Found a pretty cool javascript game engine called [CraftJS](http://craftyjs.com/) that I've been playing with the past couple of days.

Has support for things like Entity Component System, Collision, Sprite Maps, etc.

### [Amos the Alien](https://amos.coda.life)

Amos the Alien is a small demo I made, you can check my progress there.

First thing to do if your going to try yourself is to head over [Crafty Components](http://craftycomponents.com) and download the boilerplate.  It really shows off a sophisticated paradigm for creating crafty games.

The first thing I knew I wanted to create was a game that had a scrolling background of some sort.

To do this in Crafty, the best way would be to create a _'Scrollable'_ component that scrolls in either direction on the screen.

Then you can create a _'Background'_ entity that contains a list of scrollable components.  I created a simple _scroll_ method is used during frame events or when the main character moves.

Another nice thing about Crafty is the concept of _scenes_ built in.  In my main "scene" i simple create the background, character and platform entities for the demo above.

The only caveat I found with crafty is the _twoway_ movement component.  It is not possible that I can see to know when your character is jumping and where.  I had to modify the crafty source to include a "Jump" event and an isJumping() function.

### Implementation notes

To achieve a parallax type scrolling effect the 'Scrollable' entity has a 'scroll' method, but also has the ability to bind the event loop and scroll automatically.  Currently only accepts horizontal scrolling.
```javascript
    Crafty.c("Scrollable", {
        _speed: 2,
        _autoScrolling: false,

        init: function() {
            this.requires("2D, "+gameContainer.conf.get('renderType')+"");
        },

        setSpeed: function(speed) {
            this.speed = speed;
            return this;
        },

        autoScroll: function() {
            this.bind("EnterFrame", function() {
                this.scroll(1);
            });
            this.autoScrolling = true;
        },

        getSpeed: function() {
            return this.speed;
        },

        scroll: function(direction) {
            this.x -= this.speed * direction;

            if (this.x + this.w &lt; -Crafty.viewport.x) {
                this.x = Crafty.viewport.width + -Crafty.viewport.x;
            }
            else if(this.x &gt; Crafty.viewport.width + -Crafty.viewport.x) {
                this.x = -this.w;
            }
        }
    });
```
The background itself is an entity which may contain several 'Scrollable' components.  The 'scroll' method on a background will adjust the stage CSS for the image and update its children if necessary.  Currently only scrolls horizontally as well.
```javascript
    Background = BaseEntity.extend({
        _bg: 0,
        _bgWidth: 0,

        initialize: function() {
            this._elements = [];
            this.set({'entity': this});
        },

        destroy: function() {
            for(var i =0; i &lt; this._elements.length; i++) {
                this._elements[i].destroy();
            }
        },

        /* adds a sprite to the background */
        addScrollableSprite: function(sprite, speed, posX, posY, autoscroll) {

            var img = Crafty.e("Scrollable, " + sprite);

            img.setSpeed(speed).attr({x:posX, y:posY});

            this._elements.push(img);

            if(typeof autoscroll !== 'undefined' &amp;&amp; autoscroll)
              img.autoScroll();

            return img;
        },

        /* sets the background image */
        setImage: function(image) {
            Crafty.background("url(" + image + ") ");

            var actualImage = new Image();
            var model = this;

            actualImage.onload = function() {
                model._bgWidth = actualImage.width;
            }
            actualImage.src = image;
            this._bgWidth = actualImage.width;

        },

        /* sets the background color */
        setColor: function(color) {
            Crafty.background(color);
        },

        /* scrolls the background and its children */
        scroll: function(direction) {
            for(var i = 0; i &lt; this._elements.length; i++) {
              /* skip auto scrolling elements */
                if(this._elements[i].autoScrolling) continue;

                this._elements[i].scroll(direction);
            }

            if( this._bg - Crafty.viewport.width &gt; -this._bgWidth)
            {
                this._bg -= direction;

                if(this._bg &lt;= 0)
                    Crafty.stage.elem.style.backgroundPosition = this._bg + "px 0px";
            }
        }
    });
```
In my main scene for example I can load the background like so:
```javascript
    var background = new Background();
    background.setImage('web/world/1/background1.png');
    background.addScrollableSprite('cloud1', 0.2, 5, 20, true);
    background.addScrollableSprite('cloud2', 0.4, 200, 100, true);
    background.addScrollableSprite('cloud3', 0.6, 250, 190, true);

    /* assign to a global map */
    sc["background"] = background;
```
And when my character moves, I can update the background scrolling like so:
```javascript
    .bind("Moved", function(e) {

        var direction = this.x &gt; e.x ? 1 : this.x &lt; e.x ? -1 : 0;

        sc["background"].scroll(direction);
    }
```
