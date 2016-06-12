---
title: "Found Bug in Apple Tool 'HeaderDoc'"
tags:
  - apple
  - bugs
  - development
  - gatherheaderdoc
  - headerdoc
date: 2012-09-16
description: "development issue"
---

HeaderDoc is a tool to generate source code documentation for many languages. Recently, I noticed that one of the command line tools 'gatherheaderdoc' was producing a blank output file.  Wasn't sure why at first, but since its just a perl script I delved a little deeper to find the bug.

**EDIT:** bug fixed and gatherheaderdoc is now binary and uneditable

The cause comes from **line 496** (line 18 below) in the _gatherheaderdoc_ perl script:

```perl
    my @filelist = split(/\s/, $TOCTemplateFile);
    foreach my $file (@filelist) {
            my %used = ();

            my $TOCTemplate = "";
            my $found = 0;
            my $foundpath = "";

            if ($file eq "HEADERDOC_DEFAULT_INTERNAL_TEMPLATE") {
                    $found = 1;
                    $foundpath = "n/a";
                    $TOCTemplate = default_template();
            } else {
                    print STDERR "Searching for $file\n";
                    # this line has a directory instead of file in it
                    # my @templateFiles = ($devtoolsPreferencesPath.$pathSeparator.$file, $usrPreferencesPath, $systemPreferencesPath.$pathSeparator.$file, $users$
                    # modified Sep 16, 2012 by Ryan Jennings <c0der78@gmail.com>
                    my @templateFiles = ($devtoolsPreferencesPath.$pathSeparator.$file, $ usrPreferencesPath.$pathSeparator.$file, $systemPreferencesPath.$pathSeparator.$file, $users$
                    foreach my $filename (@templateFiles) {
                            if (open(TOCFILE, "<$filename")) {
                                    $TOCTemplate = <TOCFILE>;
                                    close(TOCFILE);
                                    $found = 1;
                                    $foundpath = $filename;
                            }
                    }
                    if (!$found) {
                            die("Template file $file not found.\n");
                    } else {
                            print STDERR "Found at $foundpath\n";
                    }
            }
            push(@TOCTemplateList, $TOCTemplate);
            push(@TOCNames, basename($file));

            if ($TOCTemplate =~ /\$\$\s*typelist/) {
```
