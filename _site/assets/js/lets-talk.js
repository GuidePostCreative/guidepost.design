var fixedTick = true;
function tickFixedClocks() {
  if (fixedTick == true) {
    divider = '<span class="time-divider on">:</span>'
  } else {
    divider = '<span class="time-divider off">:</span>'
  }
  $('.fixed-clock').each(function(){
    console.log($(this).data('timezone'));
    var time = moment().tz($(this).data('timezone')).format('HH-mm').split('-');
    console.log(time)
    $(this).find('.time').html(time[0] + divider + guestTime[1])
    $(this).find('.date').html(moment().tz(guestTimeZone).format('ddd DD MMM'))
  });
  fixedTick = !fixedTick;
}

$(document).ready(function() {

  mapboxgl.accessToken = 'pk.eyJ1IjoiZmNlcnV0aS1ncCIsImEiOiJjanA4MmFmMmQxNGRjM3BtbmlsdmZkbWhqIn0.Rk0eQehhU4wqvvY-qfjueQ';
  if(document.getElementById('lets-talk-map')) {
    var map = new mapboxgl.Map({
      container: 'lets-talk-map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [guidepostLng, guidepostLat],
      zoom: 8
    });
    window.setInterval(tickFixedClocks, 500);
  }

});
