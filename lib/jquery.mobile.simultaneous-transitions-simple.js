/*
jquery.mobile.simultaneous-transitions-simple.js
Add transitions in JQuery Mobile 1.1.1. with simultaneous transitions from 1.0.1 (with -sim suffix),
using simple transition handler.
Version 1.3
Simultaneous transitions adapted from jQuery Mobile 1.0.1 for use with jQuery Mobile 1.1.1
Copyright (c), 2012 Watusiware Corporation
Distributed under the MIT License
*/

$(document).bind("mobileinit", function installSimultaneousTransitions() {

  var simultaneousHandler = $.mobile.transitionHandlers.simple,

  transitionKeys = [
    "slide",
    "slideoverleft",
    "slideoverright",
    "slideup",
    "slidedown",
    "slidepushup",
    "slidepushdown",
    "fade",
    "flip",
    "pop"
    ];

  $.each(transitionKeys, function(i) {
    var key = transitionKeys[i] + "-sim";
    $.mobile.transitionHandlers[key] = simultaneousHandler;
    $.mobile.transitionFallbacks[key] = "fade";
    });

  $.mobile.transitionHandlers["none-sim"] = simultaneousHandler;  // Doesn't get a fallback transition duh

  });
