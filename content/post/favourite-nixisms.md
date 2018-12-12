---
title: Favourite 'nixisms
description: A log of what I ❤️  about unix type systems.
draft: true
date: 2018-11-05
tags: [linux, unix, favourite, log]
categories: [linux]
---

## introduction

Should share some common things about unix type systems that I enjoy daily.


## dotfiles

Dotfiles in linux are **hidden files that are used for configuration**.  It is common to have a set of dotfiles that you use regularily on different or new systems.
There are many ways and **tools to manage your dotfiles**, but a good tool is GNU stow.
A combination of `.gitignore` and `.stow-global-ignore` rules keep order and enforce security if pushed to a public repository.

I really like the consistency this brings to a nix environment, and over time, adds quality to your setup.  Using GNU stow is simple and allows for picking and choosing what to use.

### helpful links: 

* [stow documentation](https://www.gnu.org/software/stow/manual/stow.html): how to use stow
* [awesome dotfiles](https://github.com/webpro/awesome-dotfiles): a list of awesome for dotfiles

## environment shims

Having the ability to run **different versions of a programming language or framework** can be very useful in development.  

Enter environment [shim](https://en.wikipedia.org/wiki/Shim_(computing))s that sit at the front of your path, intercepting tools and forwarding to the right version.  

Maybe not uniquely a unix solution (all you need is a CLI path), nonetheless, they **fit well in the ecosystem**.

* [pyenv](https://github.com/pyenv/pyenv) for python
* [rbenv](https://github.com/rbenv/rbenv) for ruby
* [exenv](https://github.com/exenv/exenv) for elixir
* [goenv](https://github.com/syndbg/goenv) for golang
* [nodenv](https://github.com/nodenv/nodenv) for node

[Web polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) solve browser compatibility standards in a similar way.

The main benefits of using these shims are:
* ability to read and change versions from a local dotfile in a folder
* package manager installs are limited to the local or global version and don't pollute the system

## docker / linux namespaces

[Namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) were a cool addition to the linux kernel that enable **partitioning of kernel resources**.   While `chroot` isolates at a file system level, namespaces isolate everything - processes, network, users.  They could be considered like a virtual machine without the virtual hardware, thus more efficient (minus the security of a hypervisor).

There are currently **7 namespaces in linux**, each enabling a different resource functionality.  Namespaces can be implemented with code with corresponding [system commands and C api](http://man7.org/linux/man-pages/man7/namespaces.7.html).

Using the first namespace, mount, allows a process to create new mount points that don't affect the rest of the system.

The final namespace, user, allows isolation of privledges and user isolation.  Container systems like [docker](https://www.docker.com/) and [lxcd](https://linuxcontainers.org/lxd/) were able to form with the user namespace.

There were some neat LXCD sessions at the recent [Open Source Summit 2018](https://events.linuxfoundation.org/events/open-source-summit-north-america-2018/) in Vancouver.

[Rancher OS](https://rancher.com/rancher-os/) is an operating system that runs the entire host system in docker containers.

For me containers have been very helpful in cross-compiler and cross-platform testing.  It also has opened a lot of doors in Platform as a Server such as [Dokku](http://dokku.viewdocs.io/dokku/) which is a few lines of bash and docker containers.  

## vim

Oh vim.... your like a complicated lover, hard to get, but with a few accessories - so worth it.  

[neovim](https://neovim.io/) is my fork of choice.

My favourite plugins are included in my [dotfiles](https://github.com/ryjen/dotfiles/blob/master/vim/.vim/config/plug.vim).  The ones I used the most are:

* [command-t](https://github.com/wincent/command-t): fuzzy search for files and tags (ctags)
* [multi cursors](https://github.com/terryma/vim-multiple-cursors): edit text at the same time in multiple places
* [buffergator](https://github.com/jeetsukumaran/vim-buffergator): quickly switch open buffers in a list
* [YouCompleteMe](https://github.com/Valloric/YouCompleteMe): intellisense and auto completion
* [lightline](https://github.com/itchyny/lightline.vim): editing status bar

The **editing modes** and **navigation** using keystrokes in Vim are useful for **never having to use a mouse again**. Once you get the hang of it, your wrists are happier.

For giggles check out [vim-clutch](https://github.com/alevchuk/vim-clutch)

## shells / piping / redirection / multiplexing

Who doesn't love piping for a solution to your problems?

[CommandLine Fu](https://www.commandlinefu.com/commands/browse/sort-by-votes) is a great resource for cool tricks on the command line. 

The trick I use most often is multitasking:

1. suspending the current foreground process using **CTRL-Z** (like vim)
2. doing some other stuff, like restarting services or checking mail
3. returning to the suspended process with the **fg** command

A popular shell is ZSH with [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) for plugins and themes (oh-my-gawd a shell with themes).  [Writing your own shell](https://github.com/ryjen/os/tree/master/shell) is a fun task.

Another common thing to do with shells is multiplex them (usually with [tmux](https://en.wikipedia.org/wiki/Tmux)).  It can be handy to quickly split screen with another shell, switch between virtual windows running different forground processes, or detach/retach SSH sessions with a persistent state regardless of connectivity.

### helpful links

* [job control](http://linuxreviews.org/beginner/jobs/)
* [tmux tutorial](https://danielmiessler.com/study/tmux/)

## everything is a file

Your entire system is available to you as a file, meaning the same C api and kernel call that opens files is also used for sockets, processes, and io.

The [proc filesystem](https://en.wikipedia.org/wiki/Procfs) exposes kernel information as files, such as cpuinfo

[Fifo files](http://man7.org/linux/man-pages/man7/fifo.7.html) are special files like pipes that can be used as a communication channel.
[Shared memory / mmap](http://man7.org/linux/man-pages/man7/shm_overview.7.html) is a faster communication channel than fifo or pipes

TODO: cool tricks and examples

## security

TODO: fill out

## open source / c

I would not exist without these, life would have taken a different path.

## Downsides

- Can be a messy filesystem, but its not too bad.  [Gobo Linux](https://gobolinux.org/) has redefined the filesystem heirarchy to something that makes more sense to me)

- Nix is mostly only friends with technical people.


