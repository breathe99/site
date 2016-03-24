(function ($) {
  $(document).ready(function () {

    // ------------ Change mask card color -----------
    var forest = $('.forest');
    var green = $('.green')[0];
    var white = $('.white')[0];
    var blue = $('.blue')[0];
    var navy = $('.navy')[0];
    var title_card = $('.title-card');
    var city = $('.map-city');
    var map_card = $('.map');
    var current = green;

    $('.colors>div').click(function () {
      event.stopPropagation();
      title_card.removeClass(current.className);
      title_card.addClass(this.className);
      current = this;
    });

    // ------------ GSAP expand ------------
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

    // toggle expanded state
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
      // play pulsing animation if map
      if (i === 0) {
        cityPointTimelines[selectedPointInd].play();
      }
      
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

    // ---------------- map card ----------------
    // -- on hover for points and cities
    var points = $('.pol-point');
    var numPoints = points.length;
    var cities = ['Karachi', 'New Dehli', 'Mumbai', 'Pune'];
    var selectedLi = $('.map-city-list > .map-city')[0];
    var selectedPointInd = 0;
    var cityPointTimelines = [];

    // return city list item element
    function getCityLI(i) {
      return $('li[value="' + cities[i] + '"]')[0];
    }

    // switch 'selected' city
    function handleClicked(i) {
      // switch city list item that's bolded
      selectedLi.classList.remove('map-city');
      selectedLi = getCityLI(i);
      selectedLi.classList.add('map-city');

      // switch city point that's 'pulsing'
      points[selectedPointInd].classList.remove('pulsing');
      points[selectedPointInd].style.r = 2.5;
      cityPointTimelines[selectedPointInd].pause();
      selectedPointInd = i;
      points[selectedPointInd].classList.add('pulsing');
      cityPointTimelines[selectedPointInd].play();
      
      // switch aqi data
      
    }
    
    //function for each city point's 'pulse' animation
    function createPulsingTimeline(i) {
      var timeline = new TimelineMax({
        paused: true,
        repeat: -1
      });
      
      timeline.from(points[i], 1, {
        css: {r: 2.5},
        ease: Expo.easeOut
      }, 0);
      
      timeline.to(points[i], 1.5, {
        css: {r: '+=8'},
        ease: Expo.easeOut
      }, 0);
      
      cityPointTimelines[i] = timeline;
    }

    // add event listeners for hover/click events of city
    function assignPointCityListeners(i) {
      (function (i) {
        // hover(point) => highlight(li)
        points[i].addEventListener('mouseover', function (e) {
          getCityLI(i).classList.add('li-city-hover');
        }, false);

        points[i].addEventListener('mouseout', function (e) {
          getCityLI(i).classList.remove('li-city-hover');
        }, false);

        // hover(li) => highlight(point)
        getCityLI(i).addEventListener('mouseover', function (e) {
          points[i].classList.add('hover');
        }, false);

        getCityLI(i).addEventListener('mouseout', function (e) {
          points[i].classList.remove('hover');
        }, false);

        // click(point) => clicked(li, point)
        points[i].addEventListener('click', function (e) {
          e.stopPropagation();
          handleClicked(i);
        }, false);

        // click(li) => clicked(li, point)
        getCityLI(i).addEventListener('click', function (e) {
          console.log('handling clicked');
          e.stopPropagation();
          handleClicked(i);
        }, false);

      }(i));
    }
    
    // create pulsing timelines, assign all listeners
    for (var j = 0; j < numPoints; j += 1) {
      createPulsingTimeline(j);
      assignPointCityListeners(j);
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