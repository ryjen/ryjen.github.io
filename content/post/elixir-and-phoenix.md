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

## Introduction

<a href="https://emotext.micrantha.com">
<img src="/image/blog/emotext_screen.png" height=349 width=680 alt="Emotext Session" />
</a>

If you dont know [phoenix](http://phoenixframework.org) framework, I'd describe it as rails for elixir.  If you dont know [Elixir](http://elixir-lang.org) I'd describe it as a [functional](https://en.wikipedia.org/wiki/Functional_programming) language that feels like ruby for [erlang](http://erlang.org).  

If you don't know erlang it has been around a while (open-sourced in 1998) and the virtual machine is designed to be highly fault tolerant and scalable for use in telecoms, banking and instant messaging (WhatsApp).


## Experimenting

To exercise the framework, I created yet another chat app (I know, I know).

The premise is it will use slash commands for text-based social actions.  

For example typing **/smile Fred** the following would happen (assuming your username is Bob):

<div class="card bg-default">
<ul>
<li>You would see <b>You smile happily at Fred.</b></li>
<li>Fred would see <b>Bob smiles happily at you.</b></li>
<li>Anyone else in the app would see <b>Bob smiles happily at Fred.</b></li>
</ul>
</div>

Aliases were added as well, so **:) Fred** would do the same as above.

## Conclusion

Not much to say technically for now, using a pure functional language was tricky but doable once you get the hang of it.  It does require a different mindset, but its a nice change.  Did not take that long to make.

Am also going to leave it closed source for now.  Will put more info here if that changes, or ask me too see it.  Would be happy to share.

In the meantime there are some good tutorials out there:

*   [building a crud phoenix app](http://gogogarrett.sexy/programming-in-elixir-with-the-phoenix-framework-building-a-basic-CRUD-app/)
*   [building a phoenix json api](https://robots.thoughtbot.com/testing-a-phoenix-elixir-json-api)
*   [realtime todo list](http://learnelixir.com/blog/2014/10/30/real-time-to-do-list-with-phoenix-channel/)
*   [building a phoenix blog](http://codetunes.com/2015/phoenix-blog/)

## Todo

I did not get around to testing the scale ability of phoenix and the erlang virtual machine.   I'll just take their word for it.
  
