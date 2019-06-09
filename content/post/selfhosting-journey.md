---
title: A self hosting journey
description: Setting up your own cloud services
date: 2019-02-07
draft: false
tags: [self-hosting, hosting, docker, cloud, services, server]
categories: [self-hosting]
---

## Introduction


Would like to say that I have valid privacy or security concerns. Or because it can be done better.
But the reality is, I just want to self host because I can.

## Where to start?

The [awesome self hosted](https://github.com/Kickball/awesome-selfhosted) page lists just about every cloud service I use with a replaceable near-quality solution, if your willing to sacrifice a bit for it.

The other appealing factor is that most of the solutions can be containerized and reproducible across servers - meaning more availability. 

Tools like Chef, Ansible or straight up custom scripting can create server-in-a-box, ready to deploy.  Backups and a data migration plan is another story.

In terms of servers, choosing hosting located in your country of origin is a safe bet for taking advantage of privacy laws for your data.

As side note I have already abstained from all social media for the last few years, preferring journaling in a non-judgmental way. This also has a benefit of avoiding social engineering attacks. 

On the rare occasions something is actually worth sharing, [Mastodon](https://mastodon.social/) an open source Twitter clone, is a fine alternative that allows hosting your own server instance.  (#Tweets2Toots)


## Notable mentions for services

* [Matomo Analytics](https://matomo.org/) and related mobile app for replacing google analytics
* [ZNC](https://wiki.znc.in/ZNC) always connected irc server/bouncer for chatting
* [Portainer](https://www.portainer.io/) for docker container management 
* [Gitea](https://gitea.io/) for version control replacing github/bitbucket
* [Nextcloud](https://nextcloud.com/) for cloud storage and related mobile app
* [Bitwarden](https://bitwarden.com/) password management and related mobile app
* [Emby](https://emby.media/) media server and related mobile app
* [Syncthing](https://syncthing.net/) device synchronization and related mobile app
* [Jenkins](https://jenkins.io/) for continuous integration

Super nice that a lot of these solutions include mobile.

## Disadvantages

* The invisible hand of enterprise is hard to let go of for security<sup>[1](#foot1)</sup>, availability<sup>[2](#foot2)</sup> and capability<sup>[3](#foot3)</sup>.  

* Have to pay for server costs compared to ad-based services<sup>[4](#foot4)</sup>.


## Advantages

* Reduced dependency on foreign parties.

* Knowledge and experience acquired setting up and maintaining.

* Increased privacy.


## Conclusion

I find a certain sense of satisfaction from being in control of all my services.

Deploying and maintaining servers is a pretty good DevOps/Software Release Engineer skill and could be useful in the future when machines do all the software development.

There is much to do in my setup, especially around mail hosting and keeping the system reproducible.  Using [dokku](http://dokku.viewdocs.io/dokku/) for a PaaS still enables easy deployment of git projects.

I won't bore you listing out the specifics and leave it as an exercise for yourself!

<hr>

<small>
<a href="#foot1">1</a>: But it is also not uncommon for big company silos to be unaware of holes in their black box.  Security standards have been increasing steadily.

<a href="#foot2">2</a>: To serve the most amount of customers, you need the high availability.  If your serving yourself, family, team or friends, might not need to go beyond a recovery plan.

<a href="#foot3">3</a>: Specifically ground breaking research like machine learning, or just the sheer depth of experience and time put in.

<a href="#foot4">4</a>: Doing this anyway and it makes my data dependent on my income.... But there is not much in this world that isn't. 
</small>

