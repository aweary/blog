---
title: JavaScript is Essential to Accessibility
---

The idea that JavaScript is inherently _bad_ for accessibility has gotten more popular as client-side frameworks and SPAs continue gaining more market share with web appliations.

## No ~~ARIA~~ JavaScript is Better Than Bad ~~ARIA~~ JavaScript
As a prelude I recommend reading through [No ARIA is better than Bad ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/#no_aria_better_bad_aria) section of the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/) document. Part of the idea is that ARIA HTML attributes can easily be misused and cause even more problems and the **same is true for JavaScript**. Just like HTML, JavaScript is a tool that can be misused but that doesn't mean it's inherently a _bad_ tool for the job.

## JavaScript is Critical for Accessibile Widgets

Take some time to work your way through [some of the widgets in the ARIA Authoring Practices document](https://www.w3.org/TR/wai-aria-practices-1.1/) and you will quickly notice a common thread: **almost every single widget uses JavaScript**. It's not the exception, it's the rule.

* Want to build an [autocomplete or "combobox"](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html)? You need JavaScript to manage focus and update attributes like `aria-expanded` and `aria-activedescendant` and manage focus
* Need a [radio group](https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html)? You'll need to manage focus and dynamically update the `aria-checked` attribute with some JavaScript
* Interested in making a [collapsable section or "accordion"](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html)? Yet again you'll need to use JavaScript to handle keyboard navigation and update the suite of `aria-*` attributes you should be using.

This is just a small sample. 


### Use the Platform?


## The Myth of an Inaccessible React
This is somewhat tangential to the main point here, but a common sentiment that comes along with the _"JavaScript is bad for accessibility"_ sentiment is that _"JavaScript frameworks make you write inaccessible markup"_. Specifically I've seen this criticism lobbed at React most frequently.

I think this idea gained traction because frameworks like React became very popular and accessibility just _isn't_ a popular idea. It's not that React somehow encourages writing bad markup or prevents you from using semantic HTML; it's just that there are a whole lot of people using it nowadays. **If people were still writing HTML by hand we'd still have widespread accessibility issues**. 

React, and almost all other popular frameworks, let you write whatever HTML markup you want. 