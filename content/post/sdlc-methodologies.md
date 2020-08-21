---
title: Software Methodologies
description: explaining software engineering methodologies for the layman
date: 2020-08-20
tags: [software, process, methodology, development]
categories: [engineering]
---

At the end of the day, software methodologies are all some form of [Development Lifecycle](https://en.wikipedia.org/wiki/Systems_development_life_cycle).

That is to say, the *individuals* unit of work, the *team's* unit of work and the *business*, are in one of several stages.

{{< rawhtml >}}
<img class="blog" align="left" src="/image/blog/sdlc.png" alt="sdlc">
{{< /rawhtml >}}

1. Requirements and Planning
2. Analysis and Design
3. Implementation
4. Testing and Verification
5. Deployment and Maintenance

That is it.  We all know it. The steps may vary but the core ones remain the same.

The **methodology** describes how you use the SDLC with some common properties:

1. The **length and frequency** you iterate the SDLC
2. How other disciplines and teams claim a stake
3. What frameworks or practises are used

There are 3 main methodologies to use as an example: waterfall, iterative and agile.

## [Waterfall](https://en.wikipedia.org/wiki/Waterfall_model)

The waterfall method probably has roots in military and hardware. Where hierarchy is the dominant organizing factor and the final result is not expected to be mutable.

### Iterations

The waterfall SDLC is completed in 1 iteration.  Each stage in the cycle can take months.  When the last stage is complete there is a finished system. 

### Stakeholders

Department members who are not actively participating in outputs are providing input.  Usually during meetings aimed at making the stage successful but having the opposite effect.

### Stick to the Streams and Rivers You Know

Participants may require a lot of experience to foresee a successful stage. 

Turned out to be a very naive approach due to the difficulty of making changes.

I have worked in waterfall where the complete manual was handed to our team before implementation.

## [Iterative](https://en.wikipedia.org/wiki/Iterative_and_incremental_development)

The idea with this approach is to *improve the cost of changes*.

To develop a complete system, the stages of the SDLC are *repeated in increments*.

### Iterations

An iteration length varies with the project or team.  NASA used ~8 week iterations.  I have worked in ~4 week iterations.

The frequency of iterations also fluctuates.  Most jobs keep iterating anyway to maximize human resources.


### It strives for excellence (erates)

{{< rawhtml >}}
<img class="blog imgbox" height="380" align="right" src="/image/blog/methodology.jpg" alt="methodology">
{{< /rawhtml >}}

With incremental processes, unknown complexities are learnt quicker and re-incorporated back into the process in the next iteration.

Resources spent on each iteration are focused, modular, and done with less.

In the end it is a more natural approach to developing mutable software.

## [Unified Process](https://en.wikipedia.org/wiki/Unified_Process)

The unified process **framework** expands on the iterative methodology by defining four **phases**.

The phased approach is aimed at addressing risk for project management and providing an operational view for the business.

### Iterations

The phases themselves define the frequency of iterations and **goals** with related SDLC stages for input. 

The length of iterations still depends on the team or project.

### Inception phase

Lasts ~1 iteration involving requirements and analysis stages.
Goal is do determines feasibility and estimates of cost and schedule.

### Elaboration phase

Lasts ~2 iterations involving requirements, analysis, implementation, and testing stages.
Produces a milestone of captured requirements, validated architecture, and addressed risk.

### Construction phase

Lasts ~4 iterations involving analysis, implementation, and testing stages.
Produces a release each iteration. 

### Transition phase

Lasts ~2 iterations involving testing and deployment stages.
Produces a final production release and maintenance. 


## [Agile](https://en.wikipedia.org/wiki/Agile_software_development)

Software engineering evolved in the late 20th and 21st century, with more people, better internet, memory, speed and tools.  Mitigating risk so aggressively became less of a need.

A **simplified unified process** was desired to improve productivity of stagnant workers.  

### Manifest the Method

{{< rawhtml >}}
<img class="blog imgbox" align="right" height="400" src="/image/blog/agile.jpg" alt="agile">
{{< /rawhtml >}}

The [manifesto for agile development](https://en.wikipedia.org/wiki/Agile_software_development#The_Agile_Manifesto) was popularized as a way forward.

The agile manifesto declares values like:

* people and communication over processes and tools
* working software over manuals
* customer collaboration over contracts
* adaptability over a plan

### Iterations

Agile has typically shorter iterations of the SDLC around 1 or 2 weeks.

Shorter iterations in agile allow risk management as either **adaptive ephemeral milestones**, or **predictive analysis**.

### Frame the Work

Agile has many frameworks and practises like:

* [Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development)): defines team roles, work flows and project artifacts
* [Kanban](https://en.wikipedia.org/wiki/Kanban_(development)): visualized capacity tasks instead of requested tasks
* [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration): automated unit test verification
* [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development): writing tests before implementation
* [Retrospectives](https://en.wikipedia.org/wiki/Retrospective) and [Daily Standups](https://en.wikipedia.org/wiki/Stand-up_meeting): humanized meetings

I have worked in ~1.5 week agile and in my honest opinion, it is a **very construction phase oriented methodology lacking emphasis on design and verification on complex solutions as a whole**.

## Next?

At best we have about 3-5 generations in the industry since the 1950s.
Every generation seems to be the same.  Youth are hard wired to rebel against the absent older role models who claim to know more.

The evolution of software engineering methodologies sees another increase of people, the transition of experience to managerial type roles and increased need for quality and security.

How do new people with high hopes of fame, riches and meaning find it?  How do businesses manage expectations?  How do managerial type roles satisfy the needs of technical people?

What could possibly come next after Agile if anything?

### Methodology Manuals

One answer has been, satirically, with an *increase of methodology complexity*.

The benefits are a *shift* or pendulum swing back away from *construction oriented* agile:

1. Satisfy the complexity equals knowledge work cash syndrome for the non-technical
2. Transform engineering into a point based statistical game
3. Turn fatigued people relationships into competition
4. Delay ambitious promotions for longevity with complexity
5. Use a revolving door of humans to keep actual work tasks simple

### Social Security

A topic worth considering is *increased socialization of teams* and the industry into the real world.

Open source social development has shown how successful bazaar projects can be in comparison with cathedral like enterprises.

Socialized networks for business feel like brothels for reliable work.

Communication tools are more advanced and useful but do not solve basic human dynamics.

For example, teams with a *wisdom vs ambition* gap will be less cohesive, fearing of degradation back to the dreaded waterfall.

### The Whole Rotten Pear

Other interesting possibilities for the profession as a whole:

1. Mature as a profession like accounting with oversight and regulatory associations
2. Teach Artificial Intelligence how to develop software

## The Robot's Shadow

{{< rawhtml >}}
<img class="blog imgbox" align="right" width="400" src="/image/blog/gamification.jpg" alt="gamification">
{{< /rawhtml >}}

If you have experience developing software in the industry you will know that even the most passionate engineer will turn to a bitter vegetable. 

When all your interactions involve being reduced to a means to an end, with your competition more valued, and your challenges only problems you did not create... Then no amount of methodology or team spirit will save you.

You will revert back to some cowboy coding hybrid newbie and burnout.

### Psych Cop Empathy

The incomplete-child culture of youthful unconscious ego is built into the business, as becoming sort of a metro nerd clone used to extract momentum. 

The value a clone adds in social comparison with competition, is arguably more than actual output.

Using likes, stars, karma, word-of-mouth, trends or meaningless positivity as a way to determine a correct technical direction is lost to me.  As is the fun in team play dealt with political agendas.

Perhaps someone out there in the outer mess (so called internet) would have a better perspective on social software engineering.

## Over and Out

> Reduced, Rejected and Ejected. - Henry Rollins

My primal wounding has not allowed me to figured out how behave properly with work conflict.  In an environment promoted as social or not.  Suffering needlessly to great annoyance.  The father-like role of a lead or senior person is typically younger and less experienced than me.  The few people with real wisdom are nothing at all like my father.

For me, its pure.  It is simple.  It is about quality, it is about cost and it is about time.  You cannot have your cake and eat it too.

The easiest way to achieve all three is still by iterating the same damn gobbledy gook (SDLC) every damn day.

To find meaning in it is to accept it as it is, and do as efficiently as one would assemble in a factory.

