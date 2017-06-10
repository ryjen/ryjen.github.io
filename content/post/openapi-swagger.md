---
banner: "/images/blog/swagger.png"
categories:
  - web
date: "2017-06-10T01:33:30-07:00"
description: "swagger is neat"
tags:
  - api
  - web
  - directory
  - openapi
  - swagger
title: "OpenAPI Directory & Swagger"
---

Was browsing github and I came across the [OpenAPI Directory](https://apis.guru/openapi-directory/).  A good directory of API's will help in thinking of a mobile app idea.


Couldn't help but notice that all the API's implement something called OpenAPI (&quot;Swagger&quot;) 2.0.  Ok, great, consistency in API specs, that will help if you had to write one.  


In fact, most web apps have been moving towards an architecture of an API backend and Javascript frontend that calls the API, so chances are if you had to write a web app it will have an API.


Looks like I'm behind the ball again (eh), as there are already some cool tools that take advantage of this API consistency.


- [commandcar](https://github.com/tikalk/commandcar#installing-from-api-models) is a CLI tool that can install OpenAPI specs, then run queries against them.


- [paw](https://paw.cloud) is a very nice looking macOS app that can install API templates for doing the same.


Long story short, defining an API in SwaggerHub or with Swagger is quite nice. 


There are many choices for implementing it, but these days I'd probably go with a bare bones lightweight [golang](http://golang.org).  Throw in a [backbone](http://backbonejs.org) frontend, but thats another story.


Till next time, ciao

