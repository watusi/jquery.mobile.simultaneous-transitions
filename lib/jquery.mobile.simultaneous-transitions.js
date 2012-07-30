/*
jquery.mobile.simultaneous-transitions.js
Add transitions in JQuery Mobile 1.1.1. with simultaneous transitions from 1.0.1 (with -sim suffix)
Version 1.1.1
Simultaneous transitions adapted from jQuery Mobile 1.0.1 for use with jQuery Mobile 1.1.1
Copyright (c), 2012 Watusiware Corporation
Distributed under the MIT License
*/

$(document).bind("mobileinit", function installSimultaneousTransitions() {
  var simultaneousHandler = $.mobile.transitionHandlers.simultaneous,
  transitionKeys = [
                    "slide-sim",
                    "slideover-sim",
                    "slideup-sim,
                    "slidedown-sim",
                    "slidepushup-sim",
                    "slidepushdown-sim",
                    "fade-sim",
                    "flip-sim",
                    "pop-sim" ];
  $.each(transitionKeys, function(i) {
    $.mobile.transitionHandlers[transitionKeys[i] + "-sim"] = simultaneousHandler;
    });
  $.noop();  /* A convenient place to set a debugger breakpoint */
  });
