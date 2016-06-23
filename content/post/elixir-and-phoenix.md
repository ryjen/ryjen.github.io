---
title: Elixir and Phoenix
tags:
  - chat
  - elixir
  - erlang
  - phoenix
  - web framework
date: 2015-09-09
description: "erlang vm chat application"
banner: /images/blog/emotext_screen.png
---

Saw a post on reddit about this new web framework [phoenix](http://phoenixframework.org).  It is an [elixir](http://elixir-lang.org) based framework.  Elixir is based upon [erlang](http://erlang.org).  Erlang has been around a while (open-sourced in 1998) and is a massively scalable and highly reliable language used in telecoms, banking and instant messaging (among others).

Elixir brings very ruby-ish syntax to the language.  Phoenix framework is like rails for elixir, and is pretty full featured.

A simple chat app should be enough to exercise this framework.  (Yet another chat app, or yet another chat that uses the yet another naming convention. Just kidding).

### [emotext](https://emotext.arg3.com)

The chat app that brings emoticons to textual form.  For example typing **:) Fred** or **/smile Fred** the following would happen (assuming your username is Bob):

*   You would see **You smile happily at Fred.**
*   Fred would see **Bob smiles happily at you.**
*   Anyone else in the app would see **Bob smiles happily at Fred.**

Overall, if your used to ruby and rails, phoenix is not a far leap.  I don't think I'll get anywhere near being able to test the scalability of phoenix, but it was a fun exercise.  Maybe I'll post some code later, if you think its a cool project I always [welcome help](mailto:deadc0da@gmail.com?subject=Help%20with%20Emotext).  In the meantime there are some good tutorials out there:

*   [building a crud phoenix app](http://gogogarrett.sexy/programming-in-elixir-with-the-phoenix-framework-building-a-basic-CRUD-app/)
*   [building a phoenix json api](https://robots.thoughtbot.com/testing-a-phoenix-elixir-json-api)
*   [realtime todo list](http://learnelixir.com/blog/2014/10/30/real-time-to-do-list-with-phoenix-channel/)
*   [building a phoenix blog](http://codetunes.com/2015/phoenix-blog/)

![Emotext Session](/images/blog/emotext_screen.png)
