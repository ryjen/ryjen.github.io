---
title: "Fortunes on Slack"
date: 2018-01-22
description: "witty antidotes in a service"
tags: [golang, slack, api, microservice, docker, dokku, http, rest, go, fortunes, micrantha, amazon, aws, ecs, postgres, git, css]
---

[view the service homepage](https://fortunes.micrantha.com)

#### Introduction

Have always enjoyed the UNIX fortunes program, ever since I was a wee newbie.  If you aren't familiar with it (sad), yes, its like a fortune cookie.  

Except that it can be more technical in nature but not always.  It also has poems, quotations, and if enabled - offensive content.  

Often I will find a fortune, I'd like to share, and would simply make a snippet of my terminal.  There has to and must be a better way!

This time a Slack app has appeared on my radar as a target.

### Man the Sonar

Cannot engage the target without some information.  

The existing fortunes database will provide plenty of content.  Fortunately (no pun intended), I've already extracted the legacy flat file storage system into sql. 

`TODO: add conversion to SQL details`

Had to make a few changes, a link table here, few fields there, but the gist is I have a postgres initilization script of fortunes.

### Cut me some Slack

Got the data (got the life), how does Slack care?

The user enters a slash command and Slack will send a torpedo to my server by means of posting HTTP json. 

My server will then typically counter measure with what they call an "Ephemeral Message".  

The counter measure will have an attachment to give an option to make the message visible to the current channel (by means of another torpedo and counter measure).

`TODO: detail more the json key parts`

### Alright Captain, Tell me About Your Ship

First, say "I was born on a pirate ship" 5 times fast. OK, nevermind.

This is a story about a gopher and a whale in a secure proxy.

In other words, I'm just running golang, in a docker container, behind nginx with letsencrypt.

![fortunes architecture](/image/blog/architecture.png)

##### OK, What if a Torpedo Hits?

Yah, I don't think the world will be falling over itself to use the fortunes service, but if they do, I will start charging to spin up more droplets and load balancer.

As I'm using docker, switching to AWS Fargate is possible too.

##### For the Code or Gopher Geeks

As most gophers already know, the beauty of go for HTTP is you really don't need anything.  The standard library is so simple yet so effective.  Your endpoints become functions, your functions become routed to paths, and you serve.

Not only that, the html/template standard package allows for templating HTML inside your endpoint functions.

The server has two API's:  the standard API and the Slack API. Both use the same models that are serialized from the database to JSON.

`TODO: add some code architecture details`


##### Conclusion

Random fortune cookies are fun.  Slack is fun.  Golang is awesome.  Docker is pleasing.

Check out [the final product](https://fortunes.micrantha.com) page.
