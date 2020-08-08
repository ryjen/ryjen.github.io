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

At [a startup I worked at for a few years](https://www.epactnetwork.com/), I experimented with a **hybrid relational database and schemaless** using [JSON extensions for SQLite](https://www.sqlite.org/json1.html) - the industry de facto mobile database.  

This was quite fascinating and enabled serving queryable and dynamic data very easily from an engineering perspective without changing to much of the underlying core architecture.

### Recently

Not too long ago I read an article from [Uber engineering](https://eng.uber.com/schemaless-part-one-mysql-datastore/) describing how they transitioned from postgres to a hybrid schemaless using [MySQL and JSON](https://dev.mysql.com/doc/refman/8.0/en/json.html).  
Databases have introduced JSON a while back and have been around for quite a few years.  They could definitely be considered a stable feature.  

[Postgres also has JSON extensions](https://www.postgresql.org/docs/9.3/functions-json.html) for querying and storage, but I believe Uber went with MySQL for some replication features needed for scalability.

Using JSON as a single column for data has some interesting features for hashing to detect changes easier.  The [JSON merge patch RFC](https://tools.ietf.org/html/rfc7396) is critical for keep a json data column up to date.
  
### Micrantha

This is very inline with what I am doing at [micrantha labs](https://micrantha.com/labratory).  

**Garden** as is is called, is currently an experimental extension that makes it easier to perform basic CRUD using schemaless JSON on postgres (in theory any JSON extended database).
  e
The **Pathway** is a mobile synchronization piece leveraging industry standard protocols in [IoT](https://en.wikipedia.org/wiki/Internet_of_things).  

Using IoT network protocols saves a lot of time and have good features.  They do make sense from a mobile phone device (a thing wih internet). 

The **Nursery** is the web frontend for users.

### Onward and Upwards

Having the flexibility of schemaless, while keeping the tried and tested features of a relational database is quite powerful and exciting. 

I would like to see a hybrid schemaless DIY offering with paid services for customized relational database and mobile work (scaling, referential integrity, backups), but who knows.

Even as I move towards [progressive web apps](https://en.wikipedia.org/wiki/Progressive_web_application) for mobile, the [storage api](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api) or [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) should still grow nicely the garden.

### Disclaimer

The reasoning is frankly, because I am a hugely egoic when it comes to technology. My day jobs typically do not allow me to flex said ego safely. 

Creating something lightweight and without too much scope by leveraging more open source seems very doable to a solo proprietary.

If any of this sounds interesting to you, feel free to [ping me](mailto:ryan78j@gmail.com?subject=RE:%20Hybrid%20Schemaless%20Databases) to discuss.

But as they say in the music industry: "do not quit your day job!"
