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
- My niece and her safety/future

## Time for action

The [awsome self hosted](https://github.com/Kickball/awesome-selfhosted) page opened my eyes to the fact that just about every cloud service I use can be replaced in a near-quality solution, if your willing to sacrifice a bit for it.

The other appealing factor is that most of the solutions can be containerized and reproducible across servers - meaning more security and availability.  

Tools like Chef, Ansible or straight up custom scripting can create server-in-a-box.

In terms of servers, I can only choose to host on Canadian soil through infrastructure services. Can I haz my email Google?

Also abstained from all social media for the last few years, prefering journaling in a non-judgmental way. This also has a benefit of avoiding social engineering attacks. 

On the rare occasions something is actually worth sharing, [Mastodon](https://mastodon.social/) an open source Twitter clone, is a fine alternative that allows hosting your own server instance.  (#Tweets2Toots)

## Security

It is difficult to let go of enterprise invisible hand for security.  But its not uncommon for big company silos to be unaware of holes in thier black box because it is not open source.

Common Internet standards are more mature than they used to be and self-hosting seems feasible for a small time person like myself... (ie - no spearphishing).

Having run security audit tools on my setup gives me further confidence.  

## Other concerns

Email spam is a large problem that google solves very well.  The open source solutions, while advanced and up to date, probably won't benefit from AI.  I can balance this with the fact I'm pretty good at identifying spam and it won't be long before some open source AI anti-spam will emerge.

Another concern is financial.  I will be dependent on an income but most of life is anyway.  Hosting costs are cheaper these days but might want some sort of archival compression task anyway.

## Conclusion

My setup so far includes a few things but there is much to do.  I won't bore you listing out the specifics and leave it as an exercise for yourself.

I prefer to host containers through Dokku, so it makes a typical setup more complicated anyway, and I still have to finalize my mail hosting as there is so much involved.

But, in general, I find a certain satisfaction from it. If it doest work out, no big deal, I learned something.



