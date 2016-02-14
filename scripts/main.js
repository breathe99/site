(function ($) {
  $(document).ready(function() {
    
//    function expand_card(target, to_expand) {
//      if (!$(target).hasClass('scale')) {
//        $(to_expand).addClass('scale');
//        $(to_expand).siblings('.col').addClass('shrink');
//        $(to_expand).siblings('.col').find('p').hide();
//        $(to_expand).find('p.main-text').addClass('main-left');
//      }
//      else {
//        $(to_expand).removeClass('scale');
//        $(to_expand).siblings('.col').removeClass('shrink');
//        $(to_expand).siblings('.col').find('p').show();
//        $(to_expand).find('p.main-text').removeClass('main-left');
//      }
//      // Show hidden content
//      if($(to_expand).find('.text-reveal').hasClass('hidden')) {
//        $(to_expand).find('.text-reveal').removeClass('hidden');
//      }
//      else {
//        $(to_expand).find('.text-reveal').addClass('hidden');
//      }
//    }; 
        
    $('.click').click(function() {
      if (!$(this).hasClass('scale')) {
        $(this).addClass('scale');
        $(this).siblings('.col').addClass('shrink');
        $(this).siblings('.col').find('p').hide();
        $(this).find('p.main-text').addClass('main-left');
      }
      else {
        $(this).removeClass('scale');
        $(this).siblings('.col').removeClass('shrink');
        $(this).siblings('.col').find('p').show();
        $(this).find('p.main-text').removeClass('main-left');
      }
      // Show hidden content
      if($(this).find('.text-reveal').hasClass('hidden')) {
        $(this).find('.text-reveal').removeClass('hidden');
      }
      else {
        $(this).find('.text-reveal').addClass('hidden');
      }
    });
    
    // Change map card color
    var green = $('.green');
    var lime = $('.lime')[0];
    var navy = $('.navy')[0];
    var orange = $('.orange')[0];
    var map_box = $('.map-stat');
    var country = $('.map-country');
    var map_card = $('.map');
    var current = orange;
    
    $('.colors>div').click(function() {
//      console.log("you clicked");
//      console.log(this.className);
//      console.log(map_box);
//      console.log("removing class: ");
//      console.log(current.className);
      map_box.removeClass(current.className);
      map_box.addClass(this.className);
      current = this;
    })
    
    // Expand map card
    country.click(function() {
      if (!map_card.hasClass('scale')) {
        map_card.addClass('scale');
        map_card.siblings('.col').addClass('shrink');
        map_card.siblings('.col').find('p').hide();
        map_card.find('p.main-text').addClass('main-left');
      }
      else {
        map_card.removeClass('scale');
        map_card.siblings('.col').removeClass('shrink');
        map_card.siblings('.col').find('p').show();
        map_card.find('p.main-text').removeClass('main-left');
      }
      // Show hidden content
      if(map_card.find('.text-reveal').hasClass('hidden')) {
        map_card.find('.text-reveal').removeClass('hidden');
      }
      else {
        map_card.find('.text-reveal').addClass('hidden');
      }
    });

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
}( jQuery ));
