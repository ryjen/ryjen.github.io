---
title: Favourite 'nixisms
description: A log of what I ❤️ about unix type systems.
draft: true
date: 2018-11-05
tags: [linux, unix, favourite, log]
categories: [linux]
---

## introduction

Doing a lot of user interface coding for work makes me **avoid users on my own self learning**.  That means using technology that is developer or technical focused (ie - no move that pixel here or make that interactive).  I prefer the UX professionals to design anyway.

## dotfiles

Dotfiles in linux are **hidden files that are used for configuration**.  Have them in a git repository gives you configuration on the go.  If you have multiple environments you may need more complex management.

There are many ways and **tools to manage your dotfiles**, such as GNU stow, RCM, YADM, etc.
Having tried several, I've settled on keeping it simple with good 'ol GNU `stow` 🐃.

[A project](https://github.com/Kraymer/F-dotfiles) that **established good conventions for organizing** your configurations is a good starting point.

### benefits

* a config system that is portable and consistent across environments and platforms
* updatability and cleanliness through symlinks and conventions
* ability to pick and choose which configurations to install (or remove)

### helpful links: 

* [stow documentation](https://www.gnu.org/software/stow/manual/stow.html): how to use stow
* [awesome dotfiles](https://github.com/webpro/awesome-dotfiles): a list of awesome for dotfiles

## environment shims

Having the ability to run **different versions of a programming language or framework** can be very useful for consistency in problem solving.  

Enter environment [shim](https://en.wikipedia.org/wiki/Shim_(computing))s that sit at the front of your path, intercepting tools and forwarding to the right version.  

Maybe not uniquely a unix solution (all you need is a CLI path), nonetheless, they **fit well in the ecosystem as a developer**.

* [pyenv](https://github.com/pyenv/pyenv) for python
* [rbenv](https://github.com/rbenv/rbenv) for ruby
* [exenv](https://github.com/exenv/exenv) for elixir
* [goenv](https://github.com/syndbg/goenv) for golang
* [nodenv](https://github.com/nodenv/nodenv) for node

[Web polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) solve browser compatibility standards in a similar way.

If there is a system version of the tool installed, it will typically appear with "system" as the version.  You might need system permission to work with that version.

Cleanliness is another benefit of shims - you don't pollute your system and installed versions are easily removed.

## docker / linux namespaces


[Namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) were a cool addition to linux that enable **partitioning of kernel resources**.   While `chroot` isolates at a file system level, namespaces isolate everything - processes, network, users.  They could be considered like a virtual machine without the virtual hardware, thus more efficient (virtual machines will have more security through abstraction with a hypervisor)

There are currently **7 namespaces in linux**, each enabling a different resource functionality.  Namespaces can be implemented with corresponding [system commands and C api](http://man7.org/linux/man-pages/man7/namespaces.7.html).

Using the first namespace, mount, allows a process to create new mount points without affecting the rest of the system.

The final namespace, user, allows isolation of privledges and user isolation.  Container systems like [docker](https://www.docker.com/) and [lxcd](https://linuxcontainers.org/lxd/) were able to form with the user namespace.

There were some neat LXCD sessions at the recent [Open Source Summit 2018](https://events.linuxfoundation.org/events/open-source-summit-north-america-2018/) in Vancouver.

Containers have been very useful in providing **stable environments for development and releases**.  My homelab micro services, CI and PaaS all run using docker, isolated on the same server.  

[Rancher OS](https://rancher.com/rancher-os/) is an operating system that runs the entire host system in docker containers.

## vim

Oh vim.... your like a complicated lover, hard to get, but with a few accessories - so worth it.  

[neovim](https://neovim.io/) is my fork of choice, and easily aliased to `vim` as a drop in without changing your configuration.

My favourite plugins are included in my [dotfiles](https://github.com/ryjen/dotfiles/blob/master/vim/.vim/config/plug.vim).  The ones I used the most are:

* [fzf](https://github.com/junegunn/fzf.vim): search directory for files
* [multi cursors](https://github.com/terryma/vim-multiple-cursors): edit text at the same time in multiple places
* [buffergator](https://github.com/jeetsukumaran/vim-buffergator): quickly switch open buffers in a list
* [YouCompleteMe](https://github.com/Valloric/YouCompleteMe): intellisense
* [lightline](https://github.com/itchyny/lightline.vim): editing status bar

The **editing modes** and **navigation** using keystrokes in Vim are useful for **never having to use a mouse again**. Once you get the hang of it, your wrists are happier.

## shells / piping / redirection

My favourite shell is ZSH, using [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) for plugins and themes.  

for scripting portability, bash is a better choice and using the env command. <br> `#!/usr/bin/env bash`

I've started a pretty decent attempt at [writing my own shell](https://github.com/ryjen/os/tree/master/shell).  Compared to [other tutorials](https://brennan.io/2015/01/16/write-a-shell-in-c/) for writing shells it does have support for multiple pipes and redirection.  `TODO: elaborate`

[CommandLine Fu](https://www.commandlinefu.com/commands/browse/sort-by-votes) is a great resource for cool tricks on the command line.  But by far, the most valuable trick to master is job control.  Multitasking can achieved by:

1. suspending the current foreground process using **CTRL-Z**
2. doing some other stuff
3. returning to the suspended process with the **fg** command

### helpful link

* [job control](http://linuxreviews.org/beginner/jobs/)

## everything is a file

* [proc filesystem]() examples
* [fifo files]() examples
* [shm / mmap]() examples

TODO: cool tricks and examples

## security

TODO: fill out

## open source / c

I would not exist without these. Would have hanged myself at my kitchen job.  BTW hangman is a great hello world app.

## Downsides

- configuration heavy
- messy filesystem

TODO: mention more
