/*
jquery.mobile.simultaneous-transitions-replace.js
Replace default transitions in JQuery Mobile 1.1.1. with simultaneous transitions from 1.0.1
Version 1.1
Simultaneous transitions adapted from jQuery Mobile 1.0.1 for use with jQuery Mobile 1.1.1
Copyright (c), 2012 Watusiware Corporation
Distributed under the MIT License
*/

$(document).bind("mobileinit", function installSimultaneousTransitions() {
  var simultaneousHandler = $.mobile.transitionHandlers.simultaneous,
  transitionKeys = [
                    "slide",
                    "slideover",
                    "slideup",
                    "slidedown",
                    "slidepushup",
                    "slidepushdown",
                    "fade",
                    "flip",
                    "pop" ];
  $.each(transitionKeys, function(i) {
    $.mobile.transitionHandlers[transitionKeys[i]] = simultaneousHandler;
    });
  $.noop();  /* A convenient place to set a debugger breakpoint */
  });
