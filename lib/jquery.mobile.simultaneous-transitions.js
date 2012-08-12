/* jquery.mobile.simultaneous-transitions.js
 *
 * Add transitions in JQuery Mobile 1.1.1 or later using simultaneous transitions from 1.0.1
 * (with -sim suffix), plus additional transitions.
 * Version 1.2
 * Simultaneous transitions adapted from jQuery Mobile 1.0.1
 * Copyright (c), 2012 Watusiware Corporation
 * Distributed under the MIT License
 */
$(document).bind("mobileinit", function installSimultaneousTransitions() {

  var simultaneousHandler = $.mobile.transitionHandlers.simultaneous,

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
  });
