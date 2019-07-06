---
title: Mirroring git with jenkins
description: A short look at automating git repository mirroring.
date: 2019-07-05
tags: [git, mirror, jenkins]
categories: [version control, continuous integration]
---

## Introduction

For some software development projects, there may be a need to backup or mirror the repository to a different location.

Jenkins or other continuous integration (CI) can automate this. This log is a brief summary of how in case I need to reproduce.

## Workflow

The requirement is to have a single jenkins job that synchronizes various other projects and repositories.

To do this, the job calls another job to mirror any source repository to any set of destination repositories.

## Git Mirroring

Git has mirroring capability built into [cloning](https://www.git-scm.com/docs/git-clone#Documentation/git-clone.txt---mirror) and [pushing](https://www.git-scm.com/docs/git-push#Documentation/git-push.txt---mirror).

To make the Jenkins script easier you can also pass the remote URL to push, instead of adding a remote configuration.

`git push git@host.org:user/repo`

## Jenkins

You should have a list of the possible repositories you would use.

To allow for multiple destination repositories, add the [Extended Choice Parameter](https://wiki.jenkins.io/display/JENKINS/Extended+Choice+Parameter+plugin).

To keep things simple, all repositories should have the same `user/project` path.

### Job: Git Mirror

A new pipeline job configured with the parameters:

- the source repository as a single selection from a list of repositories
- the destination repository as a multi selection from the list of repositories.
- the project path in the repositories

The pipeline script looks like this:

```
node {
  stage ("Prepare") {
    deleteDir()
    dest = sh(returnStdout: true, script: 'echo "${destination}"').trim().tokenize(',')

    // skip adding new host key to jenkins
    sh 'git config --global core.sshCommand "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"'
  }

  stage ("Build") {
    // create ssh key credentials for jenkins
    sshagent(credentials: ['jenkins']) {

    sh 'git clone --mirror ${source}/${project_path} .'

    for (int i = 0; i < dest.size(); i++) {
      sh "git push --mirror ${dest[i]}/${project_path}"
    }
  }
}
```

### Job: Mirror Repositories

Another pipeline job, this one configured to run on a schedule (example: every day at 12:00AM).

The pipeline script defines the repositories and a few functions to simplify:

```
def dest(String... repos) {
  return string(name: "destination", value: repos.join(','))
}

def src(repo) {
  return string(name: "source", value: repo)
}

def path(val) {
  return string(name: "project_path", value: val)
}

node {
  def github = 'ssh://git@github.com'
  def bitbucket = 'ssh://git@bitbucket.org'
  def micrantha = 'ssh://git@git.micrantha.com:2222'

  build job: 'git_mirror', parameters: [
    src(github),
    dest(bitbucket, micrantha),
    path("ryjen/blog")
  ]

  build job: 'git_mirror', parameters: [
    src(github), dest(bitbucket, micrantha),
    path("ryjen/dotfiles")
  ]

  // etc...
}
```

## Conclusion

Not bad for a few jenkins jobs. I will enjoy the

- data loss redundancy
- organization (housekeeping)
- scheduling

Maybe you will too. 😎