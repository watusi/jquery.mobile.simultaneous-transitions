/*
 * jquery.mobile.transition-handler-simple.js
 * Version 1.1.1
 * Add a simple simultaneous handler that assumes pages don't need to be scrolled.
 * Suitable for use with pages designed for viewport height, possibly using iScroll, etc.
 *
 * This only adds the simple handler to the list of available handlers. If you want to assign
 * this handler to a specific transition, you will need to add an entry to the handler table
 * for that transition.
 * Copyright (c), 2012 Watusiware Corporation
 * Distributed under the MIT License
 */

$(document).bind("mobileinit", function createSimpleHandler() {

    var simpleHandler = function( name, reverse, $to, $from ) {

      var deferred = new $.Deferred(),
        reverseClass = reverse ? " reverse" : "",
        screenHeight = $.mobile.getScreenHeight(),

        toggleViewportClass = function() {
          $.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
        },

        start = function() {
          $to.addClass( $.mobile.activePageClass );
          $.mobile.focusPage( $to );  // Send focus to page as it is now display: block
          $to.animationComplete( done );
          $to
              .height( screenHeight ) // Note: setting an explicit height helps eliminate tiling in the transitions
              .addClass( name + " in" + reverseClass );

          $from
            .height( screenHeight )
            .addClass( name + " out" + reverseClass );
        },

        done = function() {
            if ( $from ) {
                $from
                    .height( "" )
                    .removeClass( $.mobile.activePageClass + " out in reverse " + name );
            }
            $to
                 .height( "" )
                .removeClass( "out in reverse " + name );
            toggleViewportClass();
            deferred.resolve( name, reverse, $to, $from, true );
         };

      toggleViewportClass();
      start();
      return deferred.promise();
    };

  $.mobile.transitionHandlers.simple = simpleHandler;
  });
