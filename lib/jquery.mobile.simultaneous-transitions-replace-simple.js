/* jquery.mobile.simultaneous-transitions-replace-simple.js
 * Replace default transitions in JQuery Mobile 1.1.1 or later with simultaneous transitions from
 * 1.0.1 plus additional transitions, using simple transition handler.
 * Version 1.3.2
 * Classic simultaneous transitions adapted from jQuery Mobile 1.0.1
 * Copyright (c), 2012 Watusiware Corporation
 * Distributed under the MIT License
 */

$(document).bind("mobileinit", function installSimultaneousTransitions() {

  var simultaneousHandler = $.mobile.transitionHandlers.simple,

  classicTransitionKeys = [
    "none",
    "slide",
    "slideup",
    "slidedown",
    "fade",
    "flip",
    "pop"
    ];

  plusTransitionKeys = [
    "slideoverleft",
    "slideoverright",
    "slidepushup",
    "slidepushdown"
    ];

  $.each(classicTransitionKeys, function(i) {
    $.mobile.transitionHandlers[classicTransitionKeys[i]] = simultaneousHandler;
    });

  $.each(plusTransitionKeys, function(i) {
    var key = plusTransitionKeys[i];
    $.mobile.transitionHandlers[key] = simultaneousHandler;
    $.mobile.transitionFallbacks[key] = "fade";
    });

});
