(function ($) {
    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onEnter'
        }
    });

    // find lung elements
    var problem_section = $('#problem');
    var product_section = $('#product');

    var healthy_count = $('#count1');
    var midhealthy_count = $('#count2');
    var unhealthy_count = $('#count3');

    var healthy_lung = $('#healthy_lung');
    var midhealthy_lung = $('#midhealthy_lung');
    var unhealthy_lung = $('#unhealthy_lung');

    var inner_lung = $('.inner');

    var healthy_counter = { var: 0 };
    var midhealthy_counter = { var: 0 };
    var unhealthy_counter = { var: 0 };

    function changeSpanValue(spanElement, counter) {
        var value = Math.ceil(counter.var*10)/10;
        spanElement.text(value);
    }
  
    // create timeLineMax for counting
    var how_happy_section = new TimelineMax();

    how_happy_section.insertMultiple([
      // healthy
      new TweenMax.to(healthy_counter, 2, {var: 3.3, onUpdateParams:[healthy_count, healthy_counter],onUpdate:changeSpanValue, ease:Linear.easeNone}),

      // mid-healthy
      new TweenMax.to(midhealthy_counter, 2, {var: 3.8, onUpdateParams:[midhealthy_count, midhealthy_counter],onUpdate:changeSpanValue}),

      // unhealthy
      new TweenMax.to(unhealthy_counter, 2, {var: 6.2, onUpdateParams:[unhealthy_count, unhealthy_counter],onUpdate:changeSpanValue}),

      //color fade
      new TweenMax.set(".inner", { attr: {"fill-opacity": 1}} ),
      new TweenMax.from(".inner", 5, {'fillOpacity': 0})
    ]);

// // map animation
// var singpore = $('#singapore');
// var malayasia = $('#malaysia_copy');
//
// var north = $('#north_copy');
// var northRadius = $('#northRadius');
// var east = $('#east');
// var eastRadius = $('#eastRadius');
// var south = $('#south');
// var southRadius = $('#southRadius');
//
// var allPoll = $('#pollution > g');
//
// var pollutionAnim = new TimelineMax();
// pollutionAnim.from(singpore, .5, {opacity: 0});
// pollutionAnim.from(malayasia, .5, {opacity: 0});
//
// // elastic in
// pollutionAnim.staggerFrom(allPoll, .5, {opacity: 0, ease:Elastic.easeOut}, 0.25);
// pollutionAnim.staggerFrom([northRadius, eastRadius, southRadius], .5, {attr:{r: 0}, ease:Elastic.easeOut}, 0.25);
//
// // pinging circles
// //    pollutionAnim.staggerTo([northRadius, eastRadius, southRadius], 1, {attr:{r: '+=5'},  repeat: -1}, 0.001);
//
// // showing color/position potential
// pollutionAnim.staggerTo([northRadius, eastRadius, southRadius], 3, {attr:{r: '+=15'}, opacity: .8, x: 30, y: 30, fill: 'red', repeat: -1}, 0.001);

// create scene countAllStats
new ScrollMagic.Scene({
        triggerElement: '#count1',
        triggerHook: 'onEnter',
        reverse: false,
        // duration: '100%',
        // offset: 50
    })
    .setTween(how_happy_section)
    // .triggerElement()
    .addTo(ctrl);

// new ScrollMagic.Scene({
//         triggerElement: '#mapSVG',
//         offset: 200
//     })
//     .setTween(pollutionAnim)
//     .addTo(ctrl);

})(jQuery);
