(function ($) {
  $(document).ready(function() {

    $('.click').click(function() {
      if (!$(this).hasClass('scale')) {
        $(this).addClass('scale');
        $(this).siblings('.col').hide();
      }
      else {
        $(this).removeClass('scale');
        $(this).siblings('.col').show();
      }
    });

  });
}( jQuery ));
