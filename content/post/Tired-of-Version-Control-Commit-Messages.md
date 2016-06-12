---
title: Tired of Version Control Commit Messages?
tags:
  - funny
  - plugins
  - sublime
  - version control
date: 2012-04-28
description: "sillyness"
---

Ran across this absurd version control [commit message generator](http://whatthecommit.com) message generator.  Even has
a [plugin](https://github.com/kutu/RandomMessage) for the best code editor around [Sublime Text 2](http://www.sublimetext.com/2). The api is a simple [index.txt](http://whatthecommit.com/index.txt) for scripting:
``python
    req = urllib2.Request('http://whatthecommit.com/index.txt')
    res = urllib2.urlopen(req, timeout=5)
    message = res.read().strip()
```
I've put the following into an executable file on my path named 'wtc'
``ruby
    #!/usr/bin/ruby

    require 'open-uri'
    open('http://whatthecommit.com/index.txt') {|f|  #url must specify the protocol
            puts f.read()
    }
```
Then in my shell config I have:
```bash
    alias wtcommit='git commit -m "`wtc`"'
```
**EDIT:**

I only recommend using this if you are the sole developer on a project, or are truly commiting something meaningless
