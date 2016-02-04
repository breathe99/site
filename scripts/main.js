(function ($) {
  $(document).ready(function() {

    $('.col').click(function() {
      if (!$(this).hasClass('open')) {
        $(this).css('width', '100%');
        $(this).siblings('.col').hide();
        $(this).addClass('open');
      }
      else {
        $(this).css('width', '50%');
        $(this).siblings('.col').show();
        $(this).removeClass('open');
      }
    });

  });
}( jQuery ));
