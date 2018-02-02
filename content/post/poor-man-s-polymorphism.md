---
title: "Poor Man's Polymorphism"
tags:
  - c
  - polymorphism
  - programming
date: 2012-11-30
description: "hacking in c"
aliases:
  - blog/2012/11/30/poor-mans-polymorphism/
---

Just when you think you know everything about C... a way to polymorph C data structures.

How?  Structs with the same field types and ordering can be casted.


<div class="card bg-default">
<span class="larger"><b>Note:</b></span> Don't do anything like this.  Not portable or guaranteed that I know of.
</div>

{{< gist 4180753 >}}
