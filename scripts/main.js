(function ($) {
  $(document).ready(function() {

    $('.click').click(function() {
      if (!$(this).hasClass('scale')) {
        $(this).addClass('scale');
        $(this).siblings('.col').addClass('shrink');
        $(this).siblings('.col').find('p').hide();
      }
      else {
        $(this).removeClass('scale');
        $(this).siblings('.col').removeClass('shrink');
        $(this).siblings('.col').find('p').show();
      }
    });

  });
}( jQuery ));
