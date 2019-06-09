---
title: A selfhosting journey
description: Setting up your own cloud services
date: 2019-02-07
draft: false
tags: [self-hosting, hosting, docker, cloud, services, server]
categories: [self-hosting]
---

## Introduction


Would like to say that I have valid privacy concerns, or because it can be done better,
but the reality is, I just want to self host because I can.

## Where to start?

The [awsome self hosted](https://github.com/Kickball/awesome-selfhosted) page lists just about every cloud service I use with a replaceable near-quality solution, if your willing to sacrifice a bit for it.

The other appealing factor is that most of the solutions can be containerized and reproducible across servers - meaning more availability. 

Tools like Chef, Ansible or straight up custom scripting can create server-in-a-box, ready to deploy.  A possible good idea would be to have backups and a data migration plan... but lets just get setup first, ok?

In terms of servers, choosing hosting located in your country of origin is a safe bet against an privacy laws for yourself.

As side note I have already abstained from all social media for the last few years, preferring journaling in a non-judgmental way. This also has a benefit of avoiding social engineering attacks. 

On the rare occasions something is actually worth sharing, [Mastodon](https://mastodon.social/) an open source Twitter clone, is a fine alternative that allows hosting your own server instance.  (#Tweets2Toots)


## Notable mentions for services

* [Matomo Analytics](https://matomo.org/) and related mobile app
* [ZNC](https://wiki.znc.in/ZNC) always connected irc server/bouncer
* [Portainer](https://www.portainer.io/) for container management
* [Gitea](https://gitea.io/) for version control
* [Nextcloud](https://nextcloud.com/) for cloud storage and related mobile app
* [Bitwarden](https://bitwarden.com/) password management and related mobile app
* [Emby](https://emby.media/) media server and related mobile app
* [Syncthing](https://syncthing.net/) and related mobile app
* [Jenkins](https://jenkins.io/) for continuous integration

Super nice that a lot of these solutions include mobile.

## Disadvantages

It is difficult to let go of enterprise invisible hand for security.  But its not uncommon for big company silos to be unaware of holes in their black box because it is not open source.

Common Internet standards are more mature than they used to be and self-hosting seems feasible for a small time person like myself... (ie - no spearphishing).
Having the ablilty to run security audit tools, and passing my setup gives further confidence. 

Another disadvantage is that enterprise services are ahead of the game and can afford latest tech like machine learning to enhance thier capabilities.  

But like I said, I'm just doing this for fun and I'm sure that the open source world will catchup if their not already ahead (in things like machine learning).

Email spam is a large problem - that google solves very well.  The open source solutions, while advanced and up to date, probably won't benefit from AI.  I can balance this with the fact I'm pretty good at identifying spam myself and it won't be long before some open source AI anti-spam will emerge.

Another concern is financial compared to free solutions like gmail and google drive.  My data will be dependent on an income but most of life is anyway.  
Hosting costs are relatively cheaper these days but I'm also using an external drive connected to my router for media.


## Conclusion

In general, I find a certain satisfaction from it. If it doesn't work out, no big deal, I learned something.  

Deploying and maintaining servers is a pretty good DevOps/Software Release Engineer skill and could be useful in the future when machines do all the development.

My setup so far includes a few things but there is much to do, especially around mail hosting and keeping the system reproducible.  Using [dokku](http://dokku.viewdocs.io/dokku/) for a PaaS still enables easy deployment of git projects.

I won't bore you listing out the specifics and leave it as an exercise for yourself.  


