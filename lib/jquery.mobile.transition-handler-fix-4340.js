/* Replace the transition handlers in JQM 1.1.1 with fixed handler that addresses issue #4340
 * This is from JQM commit 4b958838, and will be included in some future release of JQM
 * Load this file after jQuery.js and (if used) before jquery.mobile.simultaneous-transitions.js
 * and jquery.mobile.js
 *
 * Requires transition_handler_fix_4340.css as well
 */

$(document).bind("mobileinit", function replaceTransitionHandlers() {

  var createHandler = function( sequential ) {

    // Default to sequential
    if ( sequential === undefined ) {
      sequential = true;
    }

    return function( name, reverse, $to, $from ) {

      var deferred = new $.Deferred(),
        reverseClass = reverse ? " reverse" : "",
        active  = $.mobile.urlHistory.getActive(),
        toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
        screenHeight = $.mobile.getScreenHeight(),
        maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
        none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none" || Math.max( $( window ).scrollTop(), toScroll ) > $.mobile.getMaxScrollForTransition(),
        toPreClass = " ui-page-pre-in",
        toggleViewportClass = function() {
          $.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
        },
        scrollPage = function() {
          // By using scrollTo instead of silentScroll, we can keep things better in order
          // Just to be precautios, disable scrollstart listening like silentScroll would
          $.event.special.scrollstart.enabled = false;

          window.scrollTo( 0, toScroll );

          // reenable scrollstart listening like silentScroll would
          setTimeout( function() {
            $.event.special.scrollstart.enabled = true;
          }, 150 );
        },
        cleanFrom = function() {
          $from
            .removeClass( $.mobile.activePageClass + " out in reverse " + name )
            .height( "" );
        },
        startOut = function() {
          // if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
          if ( !sequential ) {
            doneOut();
          }
          else {
            $from.animationComplete( doneOut );
          }

          // Set the from page's height and start it transitioning out
          // Note: setting an explicit height helps eliminate tiling in the transitions
          $from
            .height( screenHeight + $( window ).scrollTop() )
            .addClass( name + " out" + reverseClass );
        },

        doneOut = function() {

          if ( $from && sequential ) {
            cleanFrom();
          }

          startIn();
        },

        startIn = function() {

          // Prevent flickering in phonegap container: see comments at #4024 regarding iOS
          $to.css( "z-index", -10 );

          $to.addClass( $.mobile.activePageClass + toPreClass );

          // Send focus to page as it is now display: block
          $.mobile.focusPage( $to );

          // Set to page height
          $to.height( screenHeight + toScroll );

          scrollPage();

          // Restores visibility of the new page: added together with $to.css( "z-index", -10 );
          $to.css( "z-index", "" );

          if ( !none ) {
            $to.animationComplete( doneIn );
          }

          $to
            .removeClass( toPreClass )
            .addClass( name + " in" + reverseClass );

          if ( none ) {
            doneIn();
          }

        },

        doneIn = function() {

          if ( !sequential ) {

            if ( $from ) {
              cleanFrom();
            }
          }

          $to
            .removeClass( "out in reverse " + name )
            .height( "" );

          toggleViewportClass();

          // In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
          // This ensures we jump to that spot after the fact, if we aren't there already.
          if ( $( window ).scrollTop() !== toScroll ) {
            scrollPage();
          }

          deferred.resolve( name, reverse, $to, $from, true );
        };

      toggleViewportClass();

      if ( $from && !none ) {
        startOut();
      }
      else {
        doneOut();
      }

      return deferred.promise();
    };
  };

  var sequentialHandler = createHandler(),
      simultaneousHandler = createHandler( false );

  $.mobile.transitionHandlers["default"] = sequentialHandler;
  $.mobile.transitionHandlers["simultaneous"] = simultaneousHandler;
  $.mobile.transitionHandlers["sequential"] = sequentialHandler;
  //Use the simultaneous transitions handler for slide transitions
  $.mobile.transitionHandlers.slide = simultaneousHandler;
  });
