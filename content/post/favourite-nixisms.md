---
title: Favourite 'nixisms
description: A log of what I ❤️ about unix type systems.
date: 2018-11-05
tags: [linux, unix, favourite, log]
categories: [linux]
---

## dotfiles

There are many ways and tools to manage your dotfiles, having tried several, I like to use good 'ol GNU `stow`. (why is there no Gnu emoji?? its a different form of a bull, sh*t)

In my dotfiles repo there is a stow config for different environments (home,work)/ Cloning [a project that setup good file conventions]() that has good file naming conventions for stow and git helps as well.

The end result is:

- a config system that is portable across environments and platforms.
- updatability and cleanliness through symlinks
- stow allows you to pick and choose which things to install configuration for

Helpful links:
- [stow tutorial]()
- [dotfiles standards]()

## environment shims

Having the ability to run different versions of a programming language or framework can be very useful for consistency in problem solving.  

Enter environment [shim](https://en.wikipedia.org/wiki/Shim_(computing))s. Sitting at the front of your path they intercept tools and forward to the right version.  

Maybe not uniquely a unix solution as all you need is a CLI path, nonetheless, having your dotfiles add them to the path automatically is helpful.

- [pyenv]() for python
- [rbenv]() for ruby
- [exenv]() for elixir
- [goenv]() for golang
- [nodenv]() for node

Web polyfills solve browser compatibility standards in a similar way.

If there is a system installed version of the tools, they will usually appear as **"system"** as the version.  Usually, you will need root permission to work with that version.

Cleanliness is another benefit of shims - you don't pollute your system and installed versions are easily removed.

## docker / linux namespaces

[Namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) were a cool addition to linux that enable partitioning of kernel resources.   

I learned about them from someone (forgot their name) doing a demo of their functionality through programming simple C programs. 

There are 7 namespaces in linux, each enabling a different resource functionality.

For example, using the first namespace, mount, allows a process to create new mount points without root or affecting the rest of the system.

The final namespace, user, allowed isolation of privledges and user identification isolation.  Container systems like [docker]() and [lxcd]() were able to form with this namespace.

Docker has proven for me to be very useful in providing stable environments for development and releases.  My entire homelab micro services, CI and PaaS run using docker.

## vim

Oh vim.... your like a complicated woman, hard to get, but with a few accessories - so worth it.

- neovim
- plugins (see dotfiles)
- favourite keystrokes

## shells / piping / redirection

My favourite shell is ZSH, using [oh-my-zsh]() for plugins and themes.  For scripting, I like to use bash.

- writing your own shell
- chaining pipes
- background processes / CTRL-Z / fg / jobs

TODO: add some value here, is this for newbs?

## files (for 100% everything)

- [proc filesystem]() examples
- [fifo files]() examples
- [shm / mmap]() examples

TODO: cool tricks and examples

## security

TODO: fill out

## open source / c

I would not exist without these, would have hanged myself at my kitchen job.  BTW hangman is a great hello world for new tech!

## Downsides

- configuration heavy
- messy filesystem

TODO: mention more


