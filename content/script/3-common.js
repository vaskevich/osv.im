var SHOW_OFFSET = 200;

$(function() {
  $('#main').jScrollPane({
    autoReinitialise : false,
    animateScroll : true,
    showArrows : false,
    contentWidth: '0px'
  });
  var api = $("#main").data('jsp');
  var throttleTimeout;
  $(window).bind('resize', function() {
      // IE fires multiple resize events while you are dragging the browser window which
      // causes it to crash if you try to update the scrollpane on every one. So we need
      // to throttle it to fire a maximum of once every 50 milliseconds...
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(function() {
            api.reinitialise();
            throttleTimeout = null;
          }, 50
        );
      }
    }
  );

  // only show these animations the first time
  if (Modernizr.cssanimations && !$.cookie("hasFaded")) {
    $.cookie("hasFaded", true, {path: '/'});
    var lastIndex = 0;
    $("a.nav, span.active").each(function(index) {
      lastIndex = index;
      var item = $(this);
      setTimeout(function() {
        item.addClass("animated bounceInLeft");
        item.css("visibility", "visible");
        item.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function() {
            item.removeClass("animated bounceInLeft");
        });
      }, index * SHOW_OFFSET);
    })
    $("#social a").each(function(index) {
      var item = $(this);
      setTimeout(function() {
        item.addClass("animated rollIn");
        item.css("visibility", "visible");
        item.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
          function() {
            item.removeClass();
          });
      }, (lastIndex + index) * SHOW_OFFSET)
    });
  }
});

$("#profile").hover(
  function() {
    $("#name").addClass("animated tada");
    $("#picture").addClass("animated pulse");
  },
  function() {
    $("#name").removeClass("animated tada");
    $("#picture").removeClass("animated pulse");
  }
);

var bubble = $("#email-container");
var bubbleParent = $("#email-link");
$("#email").click(
  function() {
    if (Modernizr.cssanimations) {
      var bubbleLink = $("#email-link");
      bubbleLink.attr("href", "mailto:me@olegvaskevich.com?subject=Hi%20Oleg");
      bubble.html("me@<span>olegvaskevich.com</span>");
      bubble.addClass("bubbleUp");
      bubbleParent.css("display", "inline-block");
    } else {
      // compatibility: just show our diff
      $("#email-link-compat").fadeIn();
    }
  }
);
$("#email-container").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
  function() {
    bubbleParent.css("display", "none");
    bubble.removeClass("bubbleUp");
  });
