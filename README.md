jquery.mobile.simultaneous-transitions, version 1.0
===================================================

Easy drop-in retrofit of simultaneous (1.0/jqTouch-like) transitions for jQuery Mobile 1.1.1 or
later.

Purpose
-------
Starting with jQuery Mobile version 1.1, default page transitions were changed. In previous
versions, jQuery Mobile used page transitions originally derived from jqTouch. These transitions
all work simultaneously - that is, the "in" and "out" transitions occur at the same time.

These transitions have a very smooth appearance, and have been well-liked by users and developers,
but have a drawback: they don't hide the necessary scrolling of outgoing pages to the top and
incoming pages to a remembered scroll position. However, this does not occur if (as if often the
case for webApps or native apps) the page does not need to be scrolled. Pages do not need to be
scrolled during transitions if their height does not exceed the viewport height. This is true if
pages are designed to viewport height.

As part of a design that does not exceed viewport height, a site or app might use a scroller,
such as `jquery.mobile.iscrollview`, or `jquery.mobile.scrollview`. However, this is not a necessary
requirement for using simultaneous transitions - all that is necessary is that either:

- the page height does not exceed the viewport height, or
- the developer must be willing to accept visible scrolling of pages during transitions

The default transitions (starting with jQuery Mobile 1.1) now use a sequential transition handler.
This means that the "out" transition is first performed, followed by the "in" transition. Additional
transition steps have been added to attempt to hide scrolling.

Unfortunately, these transitions do not have the smooth appearance of the previous, simultaneous
transitions. Many find them distracting, unattractive, and just plain "goofy". They have been
widely un-liked by much of the jQuery Mobile developer community, particularly by those using
jQuery Mobile as part of an environment for building native apps for mobile devices. *Apple has
shown an unwillingness to accept applications using these transitions in the App Store, because
their appearance does not meet with their appearance standards.*

(As a small concession, the `slide` transition in jQuery Mobile does still use a simultaneous
transition.)

jQuery Mobile does still include a simultaneous transition handler. However, the simultaneous
transitions have been removed, so it is up to developers to add them if wanted.

This repo provides an easy way to either replace the corresponding default transitions with
those from jQuery Mobile 1.0.1, or else add new simultaneous transitions, which have the same name
as the previous transitions, but with a suffix of `-sim`.

How to Use
----------
First, decide whether you want to replace the default transitions, or add new ones. There is
one each of a CSS and JS file that need to be included in your `<head>` in either case. If you
want to replace existing transitions with the old ones, choose the pair of files that end with
a suffix of `-replace.css`. Otherwise, use the un-suffixed files.

Simply include these files in the proper order.

The `.css` file must be loaded *after* either `jquery.mobile.css` or `jquery.mobile.structure.css`
and *before* jquery.mobile.js is loaded.

the `.js` file must be loaded *after* `jquery.js` is loaded, and *before* `jquery.mobile.js` is
loaded.

If you loaded the `-replace` set of files, you don't have to make any other changes to your
site. The simultaneous transitions will replace the default sequential transitions.

If you loaded the non-suffixed files, you can use the simultaneous transitions by adding a
suffix of `-sim` to any of the transition names whereever you might use a transition name.

Transitions Provided
--------------------
The repo provides the original 1.0 transitions:

- slide
- slideup
- slidedown
- fade
- flip
- pop

It does not provide replacement transitions for additional transitions that were added in
jQuery Mobile 1.1 or later.

It currently only provides transitions for Webkit browsers. (Only webkit transitions were
provided with jQuery Mobile 1.0 and 1.0.1.) I do plan on adding transitions for other browsers
in a future version.

Optional Transition Handler Fix
-------------------------------
An additional set of CSS and JS files are provided that fix jQuery Mobile bug #4340. This fix
replaces both the simultaneous and sequential transition handlers with new ones extracted from
unreleased jQuery Mobile code (git master), which is expected to be included in a future release
of jQuery Mobile. (> 1.1.1).

This should be considered a temporary fix, untill these modified transition handlers are
incorporated in an official release of jQuery Mobile. These fixes are needed on some browsers
(notably iOS) for smooth, artifact-free transitions.

Load `transition_handler_fix_4340.js` after loading `jquery.js` and before loading
`jquery.mobile.simultaneous-transitions[-replace].js`.

Load `transition)handler_fix_4340.css` after loading `jquery.mobile.css` or
`jquery.mobile.structure.css`, and before loading
`jquery.mobile.simultaneous-transitions[-replace].css`.

TranslateZ(0) Hardware Acceleration Hack
----------------------------------------
You may need a CSS hack to "hint" Webkit to use hardware acceleration on page transitions.
Symptoms of the need for this hack include elements on the page that don't seem to "follow"
the transition completely, or that appear to "break up" during transitions.

A null 3-D transform will "hint" Webkit that hardware acceleration is needed. (Note that other
browsers, and some Webkit implementations do not require this hint.)

The following appears to be an optimal CSS rule that has been shown to improve appearance
without unduly affecting performance at page instantiation. Note that using a selector of `*`
on `.ui-page` will almost certainly cause extreme delays when a page is first loaded, and seems
unnecessary:

```css

    .ui-page > div {
      -webkit-transform: translateZ(0);
    }

```

If you are developing for a browser that requires hinting, you should add this to your application
CSS, which should be loaded after jQuery Mobile CSS.

Example HTML structure
----------------------

Please be careful to observe the correct load order:

```html

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no"/>
      <title>My Site</title>

      <link rel="stylesheet" href="/css/my-theme.css"/>
      <link rel="stylesheet" href="/jqmobile/jquery.mobile.structure-1.1.1.min.css"/>
      <link rel="stylesheet" href="/css/transition_handler_fix_4340.css"/>
      <link rel="stylesheet" href="/css/jquery.mobile.simultaneous-transitions.css"/>
      <~-- Optional, if you are using jquery.mobile.iscrollview plugin -->
      <link rel="stylesheet" href="/css/jquery.mobile.iscrollview.css"/>
      <link rel="stylesheet" href="/css/jquery.mobile.iscrollview-pull.css"/>
      <link rel="stylesheet" href="/css/my-application.css"/>

      <script src="/jquery/jquery-1.7.1.min.js" type="text/javascript"></script>
      <script src="/js/transition_handler_fix_4340.js"></script>
      <script src="/js/jquery.mobile.simultaneous-transitions.js"></script>
      <script src="/jqmobile/jquery.mobile-1.1.1.min.js"></script>
      <script src="/js/jquery.mobile.iscrollview.js"></script> <!-- Optional -->
    </head>

  <body>
  </body>

</html>

```

Prereqisites
------------
- jQuery Mobile, version 1.1.1
- jQuery, version 1.6.4 or 1.7.1

Bugs and Enhancements
---------------------
Please submit bug and enhancement requests via [jquery.mobile.simultaneous-transitions gitHub Issues](https://github.com/watusi/jquery.mobile.simultaneous-transitions/issues)
If you have developed code that you would like to have incorporated in a future release
of this repo, please submit it for consideration via a gitHub pull request.

---

License
-------
Copyright (c), 2012 Watusiware Corporation
Distributed under the MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the following
conditions: NO ADDITIONAl CONDITIONS.

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

    Derived in part from jquery.mobile:
      Copyright 2012 jQuery Foundation and other contributors
      Dual licensed under the MIT or GPL Version 2 licenses.








