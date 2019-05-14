---
path: "/scheduling-is-the-future"
date: "2019-05-05"
title: "Scheduling is the Future of the Web"
description: ""
---


## Northstar Talking Points

* Scheduling is important for the web
* Focusing just on performance doesn't give us everything we need
* React is pushing the web forward 
* __Living in a Scheduled World__

________

## Introduction

Today I want to talk about scheduling, and how important I think it is to the future of React. But actually, there's a little more to it. More broadly, I think scheduling is just as important for the future of the web in general, and that the benefits of scheduling are not exclusive to React or any specific library.

Embracing a scheduling-first approach is going to enable us to do much more than we've historically been able to do, I think that it's going to help solve long-term scalability problems for web apps.

I also want to cover how the work the React team has been doing is helping make this future a reality, and that React is helping drive the web forward.

## Defining Scheduling

Formally, scheduling is defined as:

> The method by which work is assigned to resources that complete the work. 

It's a critical concept for many areas of software engineering. From distributed networks to operating systems, having an efficient scheduler is critical.

Scheduling becomes important whenever there is a shared resource that things are fighting over. In the context of the web, that shared resource is the main thread: where all of our JavaScript gets executed. At any given point there can only be one piece of code running at a time, so it's important that it's the _right piece of code_. For example, we don't want some expensive, unimportant work preventing us from responding to user input. 

So if we model or code in a way that lets stop, check whats happening in the app, and then either resume or move on, we can use a scheduler to break up potentially expensive work prevent it from blocking more important things.

For React, this is what Fiber was. It was a rewrite of React that essentially made it _schedulable_.  

## Is Scheduling a Symptom?

But if you're skeptical of this approach, one of the first questions that might come to mind: do we really need a scheduler? Is scheduling a symptom of a bigger performance problem? If React itself was just _faster_ than it wouldn't need a scheduler. You don't need to break up work if you can manage to do it really fast so you never block any other code from running. So instead of introducing a lot of complexity and overhead to make React _schedulable_ why not just __make React faster__?

This is a fair point, and it's true that there is some inherent overhead to scheduling. But I think the approach of focusing on raw speed doesn't capture the entire picture of what makes a good user experience. I also think that focusing on raw speed by itself is short-sighted, and doesn't solve our problems in the long term. 

To dive a bit deeper into that I want to step outside the programming world and talk about this thing called Parkinson's Law.
> Is scheduling a symptom of a bigger performance problem? Why not just make React faster or use another library that is faster?

## Parkinson's Law

Parkinson's Law is an old adage that you typically hear in the context of bureaucracy or organizational growth. Stated formally, it's defined as:

> work expands so as to fill the time available for its completion

In really simple terms this just means that: if someone is given a task, and a deadline for that task, they'll probably take up all of the available time to complete it. I'm sure all of my fellow speakers here know this is undoubtedly true.

### A Financial Perspective

This is a decent definition, but I think the way it's defined in the context of finance is more helpful for us. In the finance world you'll often hear Parkinson's Law stated as:

> The more money you make, the more money you spend.

This is probably pretty relatable, I'm sure many of us here have experienced this at some point in our life. It's sort of human nature. As a person's income rises, we also tend to see that their costs also rise at a similar rate. This makes sense. You make more money, so you want to improve your quality of life, which costs more money. 

The consequence of this is that no matter how much you end up making, you're always left with the same amount at the end of the pay period, which is risky. This makes it really difficult to address long-term financial goals like saving for a house or paying off a substantial debt.

And in a lot of ways, I think this is the same problem with focusing on just raw speed.

### The Web has a Spending Problem

The web has a spending problem, and a pretty big one.

Over the years the performance of almost everything we use to build web apps has gotten magnitudes faster. The devices themselves, browsers, frameworks and libraries: they've all gotten much faster. But what we end up seeing is that as performance improves, the expectations for what a web application can do rise at a similar rate. As we continue to make everything faster, we're also going to take advantage of all the CPU time we free up.

This is why focusing just on speed itself as a solution doesn't scale. Going back to the finance analogy, imagine if you were experiencing these budgeting issues and you ask a financial advisor for their advice, and their go "just go make more money". It's not a terrible idea, and if you can do it you should, but it only solves the the issue in the short-term. Eventually Parkinson's Law will prevail.

<!-- That's exactly what focusing only on raw speed gets you. -->

<!-- And just like making more money, it's not a bad idea at all: if someone is offering you more money, you're most likely going to accept it. Similarly, if there are ways to make your code faster, you're likely going to do it. The key issue is that this approach doesn't solve the problem in the long-term. You need a way to address the underlying issue. -->


A good financial advisor is going to tell you: you need a budget. You need a way to understand when and where you should spend your money and what your priorities should be. A budget helps solve the underlying spending issues, which helps address the problem in the long-term.

This is what a scheduler gives us. It's just a budget for our code. It's able to intelligently prioritize and organize the execution of our program. As the complexity of our applications continue to grow, a scheduler will let us manage that complexity in a more scalable way.

Ignoring this, I think there's another big problem with just focusing on speed. To explain this, I like to think about it in terms of buying a car.

## There's More Too It: Buying a Car

When you go to buy a car, the first question you ask probably isn't "how fast does it go?". Speed is definitely important, but we expect that almost all modern vehicles are going to be "fast enough". What we tend to value are the _other_ aspects of the car that also contribute to the total user experience of driving.

Things like safety, comfort, and handling. We want features like cushioned seats, power steering, radios, and airbags. This is because speed alone doesn't define the driving experience. It's important, but it's only part of the picture.

The features we value tend to even work against the speed of the vehicle. I guarantee you, if you remove the chairs and airbags from your car it will probably go a bit faster. But we don't do that because we don't prioritize speed above all else--we're willing to make concessions when we think it'll benefit the driving experience as a whole.

I think this holds true for web apps as well. Speed alone doesn't define the user experience. We have this expectation that they should be "fast enough", with no dropped frames or lagging inputs. But once we've met those expectations, other things become more important. Focusing just on speed gives us diminishing returns, relative to other aspects of the user experience.

One major factor that affects the user experience, is that web applications don't typically just run code in a silo. They need to send and receive data over a network. In many cases we end up doing these network requests in response to user input, and no matter how fast we execute our code, we can't make the user's connection any faster. These updates are often _bound by network speed, not CPU speed_.

This has become even more important as we rely on techniques like code splitting and data fetching strategies like GraphQL where we end up fetching the code and data asynchronously in response to interactions. As we split up more and more of our code and data we now have the responsibility of coordinating those network-bound updates. If we don't, we run the risk of multiplying the network effect and significantly hurting the user experience by introducing jumpy updates and cascading spinners. This is inherently a scheduling problem.

It doesn't matter how fast we make our code, we need to be able to account for variable network speeds and the non-determinism that comes with that. This is exactly the kind of problem a scheduler is meant to solve. By modeling your application in a way where the scheduler can coordinate these updates you can optimize them, depending on the timing and order of these network-bound updates.


### Perceived Performance
What a scheduler does well is optimize for perceived performance--which we have to remember is the end goal here. It doesn't matter how fast our code is if our application _feels_ slow or janky.

### Fastest Isn't Always Best

An interesting thing about perceived performance is that _fastest isn't always best_. This might seem counter-intuitive at first, but if you think about what happens if you prioritize speed above all else, you can see that it actually hurts the user experience.

When we're dealing with a bunch of network-bound updates, we don't know when they will resolve or in what order. It's very possible there will be noticeable gaps between the responses. If we just prioritize showing the updates as fast as possible, then we're most likely going to be updating the UI one piece at a time. In a lot of cases this means the UI will jump around load in an unexpected and inconsistent order. Even if this happens really quickly, it can _feel_ slower because users notice all of the loading states. 

It can actually make sense to _delay_ updating the UI if you can commit all of those updates at once. A scheduler's primary purpose is coordination, and that's exactly what it lets us do here. It can enable us to coordinate all these updates and commit them at once to avoid that stream of jumpy loading states. Assuming we don't delay for too long this can actually feel much faster--which again is a little counter-intuitive. The reason this works is because of something called just noticeable difference.

Just Noticeable Difference, or JND, is this idea in psychology that we can't really perceive small differences between two things. This has been shown to be true for almost every kind of perception we have, including our ability to tell time. So as an example, you probably couldn't really tell the difference between 50 or 60ms. That 10ms gap is below the just noticeable difference threshold. An interesting thing about this is that the percievable difference between two times scales up as the time scale gets larger. So at the scale of 50ms, 10ms is hard to percieve. But at the scale of 500ms 100ms is probably just as difficult to identify, and at a scale of 5 seconds 1 or so seconds is probably also harder to notice unless you were specfically tring to.

A scheduler lets you take advantage of this and improve percived performance. If we have a bunch of pending network requests, for example, when our users switch to a new tab in our application, the users probably expect it to take a second or two to load. That means that we probably have a few hundred milliseconds of wiggle room to wait for everything to resolve before we have to start showing loading states. If everything comes in as expected we can render all of the new UI and data at once and provide a really smooth and stable experience. If not, we can fallback to that loading state.

Now as we said, the allowable delta between two times depends on the scale of the times we're dealing with. So for fetching a new page, that scale is probably a couple seconds, so we can wait for 100ms or so without worrying. But for things that need to happen faster we have to scale down that allowable delta. For example, if a user is typing into a text input, we can't wait 100ms everytime they hit a key. That would be above the treshold for the noticeable difference. Users expect that the UI should respond to their actions immediately--or at least, what they percieve to be immediate.

So schedulers need a way to differentiate these different kinds of interactions or updates, and they way they can do that is typically by defining different priorites. 

If we think about almost all UI interactions there is an implicit herirachy of prorities. There are things we expect to happen immedaiately and things we're OK  

<!-- An interesting consequence of this is that _fastest is always the best strategy_. If you have multiple pending updates at once, it often can make sense to delay committing those updates if you can commit them all at the same time a little bit later. This lets you avoid the problem of jumping layouts and multiple re-paints as these network-bound updates stream in. Part of the reason this strategy can work so well is that our visual perception has limits.

k
TODO: explain JND briefly, but explain how it's *enabled* by scheduling.

This is all possible because a scheduling lets you express *priorities*. This comes back to being able to run the "right code"
 -->
<!-- ### Just Noticeable Difference

There's this idea in psychology called Just Noticeable Difference, that claims small differences between two very similar things are difficult or impossible for us to perceive. It also claims that the perceivable difference--that threshold where we can differentiate the two things--scales with the "intensity" or "scale" of the things being compared.

Put simply, what this means is that we have trouble identifying small differences between things, and as those things get bigger the "gap" in our ability to distinguish between those two things also gets bigger.

Imagine I have two cars and one is, say, 5 feet longer than the other. If I ask you tell me which car is bigger, it's not even a challenge. You can immediately tell that the monster sedan on the right is much bigger. That's because at the scale of a car, 5 feet is a lot. It's far above our just noticeable difference threshold for that scale.

Now imagine I have two mega yachts, hundreds of feet long, and one of them is 5 feet longer than the other. At that scale it would probably be pretty difficult to tell the difference. At the scale of hundreds of feet, 5 feet is pretty small. It's potentially below our just noticeable difference threshold.

OK so ignoring cars and yachts, this is important to scheduling because the same thing is true for our perception of time. We have trouble identifying small differences in times, and as the scale gets larger that difference also gets larger. 

So at the scale of, say, 500ms, we probably can't tell between 500 or 550ms. A difference of 50ms at that scale is difficult for us to perceive. Now at the scale of a couple seconds that difference is much higher. We definitely can't tell the difference between 2 seconds and 2 seconds and 50ms, but we'd probably also struggle to tell the difference between 2 and 2.5 seconds. A difference of 500ms is probably under that threshold. -->

<!-- So this equation here is the formal definition for how you define or calculate Just Noticeable Difference. We don't really hav -->


<!-- This equation here is the formal definition for how you can calculate a JND value. First you have this _I_ value, which represents the intensity of the two things your comparing. Intensity is kind of a confusing way to put it, I like to think of it as scale. Imagine if someone was asking you to look at two things and tell you if their length is within two feet of each other. For something like two coffee tables you could probably do it, but if they were two houses you'd probably struggle. So the _scale_ matters.

And then there's this "Delta _I_" which is the difference between the two values. In the coffee table/house example, that different was two feet. Lastly there's this `k` value, which is called Weber's Constant. We can use this value to determine if some delta is under the Just Noticeable Difference threshold for some scenario, but figuring out what that target number is requires experimentation and research. We mostly ignore it for our purposes. -->

<!-- So how does this come into play with user perception, perceived performance, and scheduling? Well, let's look at some examples of calculating the JND for a few different time scales.

So first, lets think about time at the scale of about 15ms. This is pretty close to the ideal timing for things like animations. Now if we consider a delta of 5ms, which just means we're comparing two times that are 5ms apart, we get this 0.33 value. We don't know if that's good or bad, and we'd have to do a lot of experiments to determine that. But it's important to note.

Next lets consider some events at the 150ms scale. This is roughly the scale at which users perceive interactive updates as a immediate. So with a delta of about 50ms, which means we're looking at two events that are 50ms apart, we get the same 0.33 value.

Lastly, if we scale the magnitude up once more to 1.5 seconds, which is close to the ideal timing for data fetching, we can see that a delta of 500ms gives us that same 0.33 value.

The thing to note here is that _as the time scale gets larger, the perceivable difference between two times at that scale grows at the same rate_. So if we assume 0.33 _is_ a good value, and that's below that JND threshold, then we can say that a difference of 5ms at the scale of 15ms is not perceivable, that a difference of 50ms at the scale of 150ms isn't perceivable, and that a difference of 500ms at the scale of 1.5 seconds isn't perceivable. -->

I think this is actually a pretty intuitive conclusion, and it's something we probably all have been aware of at one point or another. If you're loading a new page on a website, you probably can't tell if it takes two or three seconds. But if you're typing into a text input you can definitely tell if it takes a whole extra second to update. The scale matters.

This is something a scheduler can take advantage of. We can fudge the numbers a bit because our perception has limits. 

<!-- This is something a scheduler can take advantage of. Because our perception has limits, we can fudge the numbers a bit without noticeably hurting the user experience. So for example, if we have two async updates pending and the first one resolves, we can probably wait a little bit longer for the next one without affect perceived performance. -->


### Priorities

If we assign a priority to everything we're scheduling, then we can use this to take advantage of the Just Noticeable Difference threshold and batch together events with a similar priority.

Lets run through what these priorities might look like. First off, what we can call Immediate priority. These are things that need to run immediately. These kind of events have no real wiggle room, because we want them to happen synchronously.

Then there's what we might call User Blocking. These are things that should run as a result of a user interaction, like clicking a button or typing into some text input.


<!-- This is something a scheduler can take advantage of. For things like animations, it knows that it has very little wiggle room to make things happen--maybe 5 or so milliseconds. For user input, it might have an extra 50 or 100ms so before the user notices the difference. And for things like data fetching where potentially have 500 or more ms the scheduler can delay committing updates to give all those network-bound updates time to resolve. That way everything gets committed at once, and if we kept that delay under the that threshold, then the user probably won't even notice the difference. Now again, these specific numbers are but through research we _can_ define them. -->

### The Joy of Scheduling

So, I hope it's clear that we get a lot of value out of scheduling.

It provides a scalable solution to the problem of performance by giving us a way to budget and prioritize the code we run.

It lets us coordinate both CPU-bound and network-bound updates.

By doing so it gives us a way to improve perceived performance as we can potentially reduce the number of loading states, providing a smooth and stable user experience.

Scheduling also gives us a way do low priority work without having to worry about blocking other, more important things. 


### Back to React

React has really embraced scheduling in the last few years, and as an observer one of the main takeaways I have is that it's been a _hard_ problem to solve on the web. It's taken years of hard work, trial and error, and collaboration to implement React's internal scheduler--and it's still a work in progress. Once Concurrent Mode is released and stable I think the benefits will be immediately obvious for React users.

But all that hard work isn't going to just benefit the React community.

### Scheduler Package

The React team has recognized that scheduling on the web is an unsolved problem, and they've worked hard to implement their scheduler in a framework-agnostic way. The current intent is to publish the scheduler that React uses as a standalone package that React itself depends on, and that other libraries or applications can also use directly--either with or without React.

This will be a potentially huge win for the web.
<!-- And I think the most interesting and important revelation here is that none of this is specific to React. -->

### Solves UI Problems

That's because scheduling doesn't solve React problems, it solves UI problems. Every problem we've outline here is equally relevant to all web applications, no matter what their source is written in. We all have to deal with increasing complexity and demands, handling network-bound updates, and improving perceived performance.

Furthermore, these problems aren't even isolated to just web applications. These are things that all UIs have to deal with, regardless of the platform they're built on.


 ### Behind the Curve

 If we look at other platforms like iOS and Android we see that scheduling is something they're already implementing as a platform feature. On almost every Apple platform, including iOS, macOS, and watchOS, Apple provides an API called Grand Central Dispatch, or GCD, which provides rich set of APIs for scheduling work.

 On Android there are APIs like `AsnycTask` and `BackgroundTask` that provide similar scheduling capabilities.

 
 ### Web Scheduling

On the web we don't really have many scheduling APIs as part of the platform. We have `requestAnimationFrame` for animations, and more recently we've gotten `requestIdleCallback` for scheduling work during idle times. Other than that we have to rely on a combination of these APIs and others like `setTimeout`, `MessageChannel` or `postMessage` to hack together a scheduler that accounts for all of complexity in browsers around frame timing, painting, and layout.































**Raw speed doesn't wholly define the quality of a user experience.**

We don't just want our applications to feel fast, we want them to feel stable and smooth. Making updates as fast as possible can actually hurt the user experience.

### You Can't Make the Internet Faster

### CPU/IO

Coordinating CPU and IO work is important to make updates feel smooth and reduce the likelihood of cascading spinners.

In React, this is where Suspense comes in. It allows us to define our asynchronous dependencies in a way that updates can be coordinates across the application to ensure smooth and interactive transitions.

The speed at which we can update the view with new data isn't bound by the speed at which we can execute code, it's bound by the speed of the network. Just like how we have to consider that the speed of a user's device can range from very fast with modern desktop computers, to super slow with low-end mobile devices, we have to handle the fact that network speeds are also variable.

















## Priorities

**Not all work is created equal**. This is true across all kinds of UI, there is almost always a hierarchy for different kinds of events or work.

### Breakdown Priorities

## Scheduling doesn't solve React problems, it solves UI problems.

Prioritizing different updates and coordinating network resources aren't unique to React applications, these are things that all web applications deal with. In a lot of cases they deal with it by just not dealing with it and ignoring it.

These are emergent problems that arise naturally as your application's complexity grows. By thinking in terms of a scheduler these problems become explicit early on and they easier to solve.

Not only are these problems common to all web applications, they're common to all UIs. The web, iOS, Android, desktop: almost all UIs have some hierarchy of priorities and potentially need to coordinate updates with network resources (I/O).

Some of these platforms are already solving this at the platform-level.

For macOS, iOS, and other Apple platforms there is [Grand Central Dispatch (GCD)](https://developer.apple.com/documentation/dispatch) which provides platform primitives for scheduling different kinds of work for concurrent code execution. 

Android has [`JobScheduler`](https://developer.android.com/reference/android/app/job/JobScheduler.html) for scheduling different kinds of jobs in your application's process.

## Scheduling: Part of the Platform

If these problems are as common as they seem to be, then it makes sense to have a common solution.

### It's already part of the platform

`requestAnimationFrame`, `setImmediate`, `setTimeout`: at their core all of these primitives are about scheduling work to happen at a specific time. More recently we even got `requestIdleCallback` to enable idle work.

### The Future is Already Here

`isInputPending` is a new web API. 
