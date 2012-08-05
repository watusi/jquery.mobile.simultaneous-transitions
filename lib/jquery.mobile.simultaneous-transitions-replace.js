/*
jquery.mobile.simultaneous-transitions-replace.js
Replace default transitions in JQuery Mobile 1.1.1. with simultaneous transitions from 1.0.1
Version 1.2
Simultaneous transitions adapted from jQuery Mobile 1.0.1 for use with jQuery Mobile 1.1.1
Copyright (c), 2012 Watusiware Corporation
Distributed under the MIT License
*/

$(document).bind("mobileinit", function installSimultaneousTransitions() {

  var simultaneousHandler = $.mobile.transitionHandlers.simultaneous,

  classicTransitionKeys = [
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
