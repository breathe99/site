(function ($) {
  $(document).ready(function () {

    // Change map card color
    var forest = $('.forest');
    var green = $('.green')[0];
    var white = $('.white')[0];
    var blue = $('.blue')[0];
    var navy = $('.navy')[0];
    var title_card = $('.title-card');
    var country = $('.map-country');
    var map_card = $('.map');
    var current = green;

    $('.colors>div').click(function () {
      event.stopPropagation();
      title_card.removeClass(current.className);
      title_card.addClass(this.className);
      current = this;
    });
    
    // GSAP expand
    var cards = document.getElementsByClassName('card-div'), //homepage cards to expand on hover
      partner_card = [cards[1], cards[0], cards[3], cards[2]],
      numCards = cards.length,
      timelines = [],
      card_inners = document.getElementsByClassName('card-inner'),
      card_expands = document.getElementsByClassName('card-expand');

    // Filling tl array with tl for each card
    for (var i = 0; i < numCards; i += 1) {
      createTimeline(i);
      assignListeners(i);
    }

    //function for each card to tween size
    function createTimeline(i) {
      var timeline = new TimelineMax({
        paused: true
      });
      timeline.to(cards[i], 0.6, {
        width: "100%",
        ease: Expo.easeInOut
      }, 0);

      timeline.to(partner_card[i], 0.6, {
        width: "0%",
        opacity: 0,
        display: "none",
        ease: Expo.easeInOut
      }, -0.1);
      timelines[i] = timeline;
    }

    //card event listeners
    function assignListeners(i) {
      (function (i) {
        cards[i].addEventListener('click', function (e) {
          toggle(e, i);
        }, false);
      }(i));
    }

    var is_expanded = [false, false, false, false];

    function toggle(e, i) {
      if (is_expanded[i]) {
        is_expanded[i] = false;
        contract(e, i);
      } else {
        is_expanded[i] = true;
        expand(e, i);
      }
    }

    //play card timeline on hover
    function expand(e, i) {
      cards[i].classList.remove('hover');
      card_inners[i].classList.add('hidden');
      card_expands[i].classList.remove('hidden');
      timelines[i].play();
      console.log("expand");
    }

    //reverse circle timeline on leave
    function contract(e, i) {
      cards[i].classList.add('hover');
      card_inners[i].classList.remove('hidden');
      card_expands[i].classList.add('hidden');
      timelines[i].reverse();
      console.log("contract");
    }

    // Get the latest map data on page load
    $.ajax({
      url: 'http://dexpi.ddns.net/aqi',
      dataType: 'JSON',
      type: 'GET',
      async: true,
      success: function (data) {
        console.log(JSON.stringify(data));
        console.log("something");
      },
      error: function (response) {
        var r = jQuery.parseJSON(response.responseText);
        console.log("Message: " + r.Message);
        console.log("StackTrace: " + r.StackTrace);
        console.log("ExceptionType: " + r.ExceptionType);
      }
    });
  });
}(jQuery));