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
    var green = $('.greenbg');
    var lime = $('.limebg')[0];
    var navy = $('.navybg')[0];
    var orange = $('.orangebg')[0];
    var title_card = $('.title-card');
    var country = $('.map-country');
    var map_card = $('.map');
    var current = green;
    
    $('.colors>div').click(function() {
      console.log("you clicked");
      console.log(this.className);
      console.log("removing class: ");
      console.log(current.className);
      title_card.removeClass(current.className);
      title_card.addClass(this.className);
      current = this;
    })

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
