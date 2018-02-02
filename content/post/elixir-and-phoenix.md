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

#### Introduction

Saw a post on reddit about this new web framework [phoenix](http://phoenixframework.org).  It is an [elixir](http://elixir-lang.org) based framework.  Elixir is based upon [erlang](http://erlang.org).  Erlang has been around a while (open-sourced in 1998) and is a massively scalable and highly reliable language used in telecoms, banking and instant messaging (among others).

Elixir brings very ruby-ish syntax to the language.  Phoenix framework is like rails for elixir, and is pretty full featured.


#### Experimenting

To exercise the framework, I wanted to create yet another chat app.

This time using slash commands for text-based social actions.  

For example typing **:) Fred** or **/smile Fred** the following would happen (assuming your username is Bob):

<div class="card bg-default">
<ul>
<li>You would see <b>You smile happily at Fred.</b></li>
<li>Fred would see <b>Bob smiles happily at you.</b></li>
<li>Anyone else in the app would see <b>Bob smiles happily at Fred.</b></li>
</ul>
</div>


#### Technical Details

Not much to say, using a pure functional language was tricky but doable once you get the hang of it. Going to leave it closed source for now.  Will put more info here if that changes.

In the meantime there are some good tutorials out there:

*   [building a crud phoenix app](http://gogogarrett.sexy/programming-in-elixir-with-the-phoenix-framework-building-a-basic-CRUD-app/)
*   [building a phoenix json api](https://robots.thoughtbot.com/testing-a-phoenix-elixir-json-api)
*   [realtime todo list](http://learnelixir.com/blog/2014/10/30/real-time-to-do-list-with-phoenix-channel/)
*   [building a phoenix blog](http://codetunes.com/2015/phoenix-blog/)

#### Todo

I did not get around to testing the scalability of phoenix and the erlang virtual machine.   I'll just take their word for it for now.

#### Conclusion

Overall, if your used to ruby and rails, phoenix is not a far leap.  Going functional requires a different mindset (its not like C).
  
<img src="/image/blog/emotext_screen.png" height=349 width=680 alt="Emotext Session" />
