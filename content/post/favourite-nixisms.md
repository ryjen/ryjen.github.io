---
title: Favourite 'nixisms
description: A log of what I ❤️  about Unix type systems.
date: 2018-11-05
tags: [linux, unix, favourite, log]
categories: [linux]
---

## introduction

A log to myself of things I like about Unix type systems.  In case I forget why someday.

## dotfiles

<code class="header">files in braille? are they for the blind?</code>

Dotfiles in Linux are hidden files preceded with a period. Depending on the program, they are used for configuration in your home directory.  

It is common to have a set of dotfiles that you use regularly on different computer systems.

There are many ways and tools to manage your dotfiles. A good one to use is [GNU stow](https://www.gnu.org/s/stow/manual/stow.html).

One can create a modular and secure repository with a set of conventions and rules enforced with ignore files and rc files.

Dotfile repositories are usually personalized, however I forked [mine](https://github.com/ryjen/dotfiles) from a repository that implemented the above.

#### helpful links: 

* [stow documentation](https://www.gnu.org/software/stow/manual/stow.html): how to use stow
* [awesome dotfiles](https://github.com/webpro/awesome-dotfiles): a list of awesome for dotfiles
* [F-dotfiles](https://github.com/Kraymer/F-dotfiles): a dotfile repo with conventions 

## environment shims


<code class="header">a thin layer above your path to keep a level surface across versions</code>


Have you ever had to solve an issue using a different version than your environment?  You might have wanted a way to keep the stability of your system.

Enter environment [shim](https://en.wikipedia.org/wiki/Shim_(computing))s that sit at the front of your path, intercepting tools and forwarding 
to the right version.  Another nice benefit of using shims is that package manager installs are limited to the project or a global version and don't pollute the system version. 

Maybe not uniquely a Unix solution (all you need is a CLI path), nonetheless, they fit well in the ecosystem.

* [pyenv](https://github.com/pyenv/pyenv) for python
* [rbenv](https://github.com/rbenv/rbenv) for ruby
* [exenv](https://github.com/exenv/exenv) for elixir
* [goenv](https://github.com/syndbg/goenv) for golang
* [nodenv](https://github.com/nodenv/nodenv) for node


## linux namespaces / containers

<code class="header">container of system resources isolated from the pirates</code>

[Namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) were an addition to the Linux kernel that enable **partitioning of kernel resources**.  Namespaces isolate everything at a system level (processes, network, users, etc).  This is different from *chroot* which isolates at a file hierarchy level.   They could be considered like a virtual machine without the virtual hardware.  More efficient without the extra security of a hypervisor.

Namespaces can be used in C code via corresponding [system commands and C api](http://man7.org/linux/man-pages/man7/namespaces.7.html).

Using the first namespace for example, mount, allows a process to create new mount points that don't affect the rest of the system.

An important namespace was user, which allowed isolation of user privileges.  Its because of this namespaces container software like [docker](https://www.docker.com/) and [lxc](https://linuxcontainers.org/lxd/) were able to form.

There were some neat LXC sessions at the recent [Open Source Summit 2018](https://events.linuxfoundation.org/events/open-source-summit-north-america-2018/) in Vancouver, I recommend the conference if you get a chance.

For me containers have been helpful in cross-compiler and cross-platform testing.  Has also opened a lot of doors in Platform as a Service such as [Dokku](http://dokku.viewdocs.io/dokku/) which is a few lines of bash and docker containers (good for homebrew types that want to keep usage down).

The Linux tech has even spawned a new OS, [Rancher OS](https://rancher.com/rancher-os/) where the entire host system is in docker containers.  For example systemd is a container.  Having tried it, it makes me wonder what more can be done with it.

#### helpful links

* [awesome containers](https://github.com/Friz-zy/awesome-linux-containers): a list of awesome for containers

## vim

<code class="header">Oh vim.... you're like a complicated lover, hard to get, and with a few accessories - so worth it.</code>

[neovim](https://neovim.io/) is my fork of choice.

The **editing modes** and **navigation** using keystrokes in Vim are useful for **never having to use a mouse again**. Once you get the hang of it, your wrists are happier.  Especially if you combine with an ergonomic keyboard layout like [Dvorak](https://www.dvorak-keyboard.com/) or [Colemak](https://en.wikipedia.org/wiki/Colemak).

**Plugins and/or syntax highlighting** are usually needed for anything serious.  Some included in my [dotfiles](https://github.com/ryjen/dotfiles/blob/master/vim/.vim/config/plug.vim) are:

* [command-t](https://github.com/wincent/command-t): fuzzy search for files and tags (ctags)
* [multi cursors](https://github.com/terryma/vim-multiple-cursors): edit text at the same time in multiple places
* [buffergator](https://github.com/jeetsukumaran/vim-buffergator): quickly switch open buffers in a list
* [YouCompleteMe](https://github.com/Valloric/YouCompleteMe): intellisense and auto completion
* [lightline](https://github.com/itchyny/lightline.vim): editing status bar


#### helpful links
* [awesome vim](https://github.com/akrawchyk/awesome-vim): a list of awesome for vim
* [vim-clutch](https://github.com/alevchuk/vim-clutch): a hardware clutch for vim escape key

## shells / unix philosphy / multiplexing

<code class="header">Who doesn't love piping a solution to your problems?</code>

Being productive on the command line comes down to a few things: **multitasking, piping/redirect, multiplexing**

The technique I use most often is **multitasking**:

1. suspending the current foreground process using **CTRL-Z** (in something like vim)
2. do some other stuff, like restarting services or checking mail
3. returning to the suspended process with the **fg** command

Shell piping/redirection is the glue that makes the **[Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)** of concise modular programs work.  You can solve a wide variety of problems from the command line.  I rate software as more sophisticated if it includes a CLI toolset.

To get a better idea of Unix philosophy in action, check out [CommandLine Fu](https://www.commandlinefu.com/commands/browse/sort-by-votes).  Top programs include **curl, jq, cut, cat, more, uniq, sed, parallel, xargs, wc, find, sort, rev, tr, echo**. 

Another common thing to do with shells is **multiplex** them (usually with [tmux](https://en.wikipedia.org/wiki/Tmux)).  This is sort of like piping the entire shell into different views.

It can be handy to quickly split screen with another shell, zoom a split pane to full, switch between virtual windows, or detach/retach sessions with a persistent state (SSH).  And remember, like vim, this is all done with key strokes, saving the mouse effort.

Some people prefer [byobu](http://www.byobu.co/) as a layer over tmux or screen. Either way, if your new to multiplexing it will take some getting used to.

#### helpful links

* [job control](http://linuxreviews.org/beginner/jobs/)
* [tmux tutorial](https://danielmiessler.com/study/tmux/)
* [awesome shell](https://github.com/alebcay/awesome-shell)

## everything is a file and interprocess communication

<code class="header">hippie: "how does the system communicate to us?"  nerd: "with files"</code>

Your entire system is available to you as a file, meaning the same C API and kernel calls that opens, reads and writes files can also be used for sockets, processes, devices, etc.

The [proc filesystem](https://en.wikipedia.org/wiki/Procfs) exposes kernel information to user land as files. For example, cpuinfo, memory, modules, uptime, etc.

[Fifo files](http://man7.org/linux/man-pages/man7/fifo.7.html) are basically pipes as a file and are used as a communication channel (IPC).   For example, testing  client/server applications communicating over a socket, you would pass your programs a FIFO instead and simulate the server output and the client input.

[Shared memory / mmap](http://man7.org/linux/man-pages/man7/shm_overview.7.html) also returns a file descriptor that can be mapped to a block of memory instead of a file and also used for IPC.


## open source / c / security

<code class="header">The source of life must be open as nothing is separate from it</code>

Basically, my life as I know it, would not exist without open source, C and Linux.  As a young high-school grad with nothing to live for, hacking code and having people use it was immensely more exciting than real world life.  Too much for my poor parents, who did not understand, and it turns out neither did I.

The past aside, people nowadays will complain about C as dangerous. Especially since the [heartbleed](http://heartbleed.com/) bug and recent [open source bugs](https://en.wikipedia.org/wiki/Fuzzing) found with [fuzz testing](https://en.wikipedia.org/wiki/Fuzzing) tools.  But the reality is, if you deeply understand buffer overflows and pointers and you are a proactive tester, C is quite manageable.

But humans are what they are, imperfect as the software they create.  I believe C is like the matrix in that it has just enough flaws for humans to accept it as a challenge and not too many that we'll reject it.

#### helpful links

* [awesome security](https://github.com/sbilly/awesome-security)
* [awesome c](https://github.com/aleksandar-todorovic/awesome-c)

## Downsides?

- Distribution fragmentation, but I think this can be broken down into packaging differences which [flatpak](https://www.flatpak.org/) and [snap](https://snapcraft.io/) packages seemed to have solved.

- User experience fragmentation because the users system and workflow can be so heavily customized.  Which is a good segue to the next one.

- Complex configuration can be annoying, there are times when you need to do something pronto and some time consuming configuration thing will be blocking you.  Thankfully using containers solves most of this for enterprise needs.

- Can be a messy or unorganized file system, but its not too bad.  [Gobo Linux](https://gobolinux.org/) has redefined the standard file system hierarchy to something that makes more sense to me)

- Nix is mostly only friends with technical people.  This is a feature though, not a downside.

