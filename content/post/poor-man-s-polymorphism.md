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


Like c++ without a virtual table, C structs can be casted between each other if the **field types and ordering are the same**.  This is entirely not portable across systems.


#### A Quick Example

```c
struct Animal {
  int eyes;
}

struct Dog {
  int eyes;
  /* dog specific */
  int tail;
}

struct Human{
  int key;
  /* human specific */
  int brain;
}
```

We can pass human's or dog's to any function that takes an animal.

int look(Animal this, int object) {
  this.eyes = object;
}
```


