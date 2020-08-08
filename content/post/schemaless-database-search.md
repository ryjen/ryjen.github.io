---
title: Hybrid Schemaless Databases
description: a look into the trend
tags: [database, schema, data, pwa, json]
categories: [software engineering]
date: 2020-08-04
---

TL;DR - Hydrid relational schemaless databases are quite awesome, with a little bit flowers in the garden.

True schemaless databases came into my radar with [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/) and such.  I have often admired the ability to alter schema on fly and enjoyed experimenting with the possibilities.

Enterprise solutions like [Couchbase](https://www.couchbase.com/) and [Firebase](https://firebase.google.com/) have been big successes (even the now defunct [Cparse](https://github.com/cparse/cparse)).

### Why?

The success of schemaless databases makes a lot of sense in part because of API consumption of JSON and mobile devices if you can get the synchronization part right.

At [a startup I worked at](https://www.epactnetwork.com/), I experimented with a **hybrid relational database and schemaless** using [JSON extensions for SQLite](https://www.sqlite.org/json1.html) - the industry de facto mobile database.  

This was quite exciting to enable serving queryable and dynamic data without changing to much of the architecture.

Using JSON as a single column for data has some interesting features for hashing to detect changes easier.  

The [JSON merge patch RFC](https://tools.ietf.org/html/rfc7396) makes it simple to keep the data integrity.

### Recently

Not too long ago an article from [Uber engineering](https://eng.uber.com/schemaless-part-one-mysql-datastore/) described how they transitioned from postgres to a hybrid schemaless using [MySQL and JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html). 

[Postgres also has JSON extensions](https://www.postgresql.org/docs/9.3/functions-json.html) for querying and storage, but I believe Uber went with MySQL for some replication or scalability features needed.

The JSON data types where introduced a while back and have been around for quite a few years.  They could definitely be considered a stable feature.  
  
### Micrantha

This is very inline with what I am attempting at [micrantha labs](https://micrantha.com/labratory).  

**Garden** as is is called, is currently a extension that makes it easier to perform basic CRUD using schemaless JSON on postgres (or any JSON extended database).

The **Pathway** is a mobile synchronization piece leveraging industry standard protocols in [IoT](https://en.wikipedia.org/wiki/Internet_of_things) and focusing on data.

The **Nursery** is the web frontend for users.

### Onward and Upwards

I love the flexibility of schemaless with the tried and tested features of a relational database in one package.

Using IoT network protocols saves a lot of time with good features and experience.  They do make sense from a mobile phone device (a thing with internet).

Even potentially moving towards [progressive web apps](https://en.wikipedia.org/wiki/Progressive_web_application) for mobile, the [storage api](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api) or [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) should be able to grow nicely the garden.

### Disclaimer

The reasoning is frankly, is my day jobs typically do not allow me to flex technically. And because I am a hugely egoic when it comes to technology.

Have always preferred programming, data, protocols and algorithms to user interface.  Which is so ironic to a UI focused career.

A complex and daunting project with little reward and a fun endeavour.  Micrantha is just a facade to justify my pandemic time.

As they say in the music industry: "do not quit your day job!"
