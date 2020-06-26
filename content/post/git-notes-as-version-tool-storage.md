---
title: git notes as a storage mechanism
description: a small blurb on using git notes for versioning
draft: true
date: 2020-06-25
tags: [git, version, notes]
categories: [programming, software]
---


Am working on a project build tool to make repeatable tasks for [Micrantha](https://micrantha.com) projects easier.

A module of this tool is automatic versioning using [semantic version](https://semver.org/).

## The versioning

The way I wanted the versioning to work is to have **thresholds** for when a version component auto-increments.

For example:

- A **patch** version will increment after **300** builds
- A **minor** version will increment after **100** patch builds

This is a potential feature that projects can use as a reminder to bump a version if there are breaking changes.

For every build, the build number is incremented, and thus potentially the rest of the version.

A question that arose, is where does one store a build number that:

1. Changes often
2. Differentiates between users?

## Storing a build number

My initial attempt was to store the build number as a hidden file in the project.

Which is fine and worked, but the sheer amount of foreseeable conflicts is enough to make anyone rethink that approach.

And really, why should build information exist in a source repository.  A build is the action with the object, not the object.

### Tags Attempt

Storing release versions in **git-tags** is accepted practice.

It was conceivable that tags could also be used for a build number.  

Experimenting a bit I tried tagging from a release tag with a build number under a prefix (like **build/20**).

But to retrieve the build number, one would have to rely on **git-describe** or a sorted tag list to pop from.

1.  I could not get git-describe to use the latest build tag
2.  why do I need a list of tags for every build?

In any case, it was not fruitful and I looked for alternatives.

### Git Notes

Using [git-notes](https://git-scm.com/docs/git-notes) as a secondary storage method could better separate the building from the source.

There are some obvious advantages:

1.  Git notes can be created on a file in the repository (the project configuration file)
2.  They are not pushed by default
3.  They have separate merge strategies when conflicts occur

This seems ideal. Might as well put notes with the current version on commits too with a hook.

To push the notes is a little ugly, put doable with an alias/subcommand or by configuration (part of the project init step).

## The Proto

A quick proto in my build tool now has different storage methods.

1. The **library** or file system in users home path **~/.local**
2. The **repository** or **git-notes**

The note is a JSON of a semantic version for the project configuration file that gets updated every build.

And I can sync between storage methods if necessary.

## The Reality and TODO

I have not tested merge conflicts with git notes.  

If they prove to be just as problematic as a file in the repository there is a backup plan:

1. Have a note just for the build numbers in a line based record
2. Change the merge strategy to **cat_sort_uniq** to take the diff and sort removing duplicates
3. The build number is the last/first record
4. Reset/clear when the patch version increments

Eventually will write some unit tests 🤦 or hit a conflict between my machines and see.

