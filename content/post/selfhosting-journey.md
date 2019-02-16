---
title: A selfhosting journey
description: Setting up your own cloud services
date: 2019-02-07
draft: false
tags: [self-hosting, hosting, docker, cloud, services, server]
categories: [self-hosting]
---

## Introduction

In terms of privacy, I used to believe that I have nothing to hide and it doesn't concern me. Or at least if I did have something to hide it was generally not my fault.

A few things have changed my thinking.  Mostly:

- Learning about Canadian and bc regulations for public data
- Learning about Internet law and jurisdiction
- Increasing reliance on cloud data and the possibility of AI using it
- Talks from privacy concerned projects like [Tor](https://torproject.org)
- The swarm of Internet educated black hatters in modern era and security breaches
- The political climate in the US, China, Russia, etc.
- My niece and her well being

## Time for action

The [awsome self hosted](https://github.com/Kickball/awesome-selfhosted) page opened my eyes to the fact that just about every cloud service I use can be replaced in a near-quality solution, if your willing to sacrifice a bit for it.

The other appealing factor is that most of the solutions can be containerized and reproducible across servers - meaning more security and availability.  

Tools like Chef, Ansible or straight up custom scripting can create server-in-a-box.

In terms of servers, I can only choose to host on Canadian soil through infrastructure services. Can I haz my email Google?

Also abstained from all social media for the last few years, preferring journaling in a non-judgmental way. This also has a benefit of avoiding social engineering attacks. 

On the rare occasions something is actually worth sharing, [Mastodon](https://mastodon.social/) an open source Twitter clone, is a fine alternative that allows hosting your own server instance.  (#Tweets2Toots)

## Notable mentions

* [Matomo Analytics](https://matomo.org/) and related mobile app
* [ZNC](https://wiki.znc.in/ZNC) irc server and weechat
* [Portainer](https://www.portainer.io/) for container management
* [Gitea](https://gitea.io/) for version control
* [Nextcloud](https://nextcloud.com/) for cloud storage and related mobile app
* [Bitwarden](https://bitwarden.com/) password management and related mobile app
* [Emby](https://emby.media/) media server and related mobile app
* [Syncthing](https://syncthing.net/) and related mobile app
* [Jenkins](https://jenkins.io/) for continuous integration

Super nice that a lot of these solutions include mobile.

## Security

It is difficult to let go of enterprise invisible hand for security.  But its not uncommon for big company silos to be unaware of holes in their black box because it is not open source.

Common Internet standards are more mature than they used to be and self-hosting seems feasible for a small time person like myself... (ie - no spearphishing).

Having run security audit tools on my setup gives me further confidence.  

## Other concerns

Email spam is a large problem - that google solves very well.  The open source solutions, while advanced and up to date, probably won't benefit from AI.  I can balance this with the fact I'm pretty good at identifying spam myself and it won't be long before some open source AI anti-spam will emerge.

Another concern is financial compared to free solutions like gmail and google drive.  My data will be dependent on an income but most of life is anyway.  
Hosting costs are relatively cheaper these days but I'm also using an external drive connected to my router for media.


## Conclusion

In general, I find a certain satisfaction from it. If it doesn't work out, no big deal, I learned something.

My setup so far includes a few things but there is much to do, especially around mail hosting and keeping the system reproducible. I prefer to keep my Dokku setup with containers so scripting involves creating the related Dokku metadata.

I won't bore you listing out the specifics and leave it as an exercise for yourself.  


