
var guidepostClock = document.getElementById('footer-guidepost-clock');
var guestClock = document.getElementById('footer-guest-clock');

var guidepostLocationEle = guidepostClock.querySelectorAll('.location')[0];
var guidepostTimeEle = guidepostClock.querySelectorAll('.time')[0];
var guidepostDateEle = guidepostClock.querySelectorAll('.date')[0];

var guestTimeEle = guestClock.querySelectorAll('.time')[0];
var guestLocationEle = guestClock.querySelectorAll('.location')[0];
var guestDateEle = guestClock.querySelectorAll('.date')[0];


var guestLocation = null;
var guestTimeZone = null;

function initClocks() {
  // Set GuidePost location
  guidepostLocationEle.innerHTML = 'Our time [' + guidepostLocation + ']';

  // Get guest's location & timezone
  var xhr;
  if(window.AtiveXObject){
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }else{
    xhr = new XMLHttpRequest();
  }
  xhr.open("GET", 'https://ipapi.co/json');
  xhr.setRequestHeader('Accept', '*/*')
  xhr.send();
  xhr.onreadystatechange= function(){
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhr.responseText);
      guestLocation = 'Your time [' + response.city + ', ' + response.country + ']';
      guestTimeZone = response.timezone;

      // Set Guest location
      guestLocationEle.innerHTML = guestLocation;
    }
  }
}

var tick = true;
function tickClocks() {
  var middle;
  if (tick == true) {
    divider = '<span class="time-divider on">:</span>'
  } else {
    divider = '<span class="time-divider off">:</span>'
  }

  // Set GuidePost time
  guidepostTime = moment().tz(guidepostTimeZone).format('HH-mm').split('-');
  guidepostTimeEle.innerHTML = guidepostTime[0] + divider + guidepostTime[1];
  guidepostDateEle.innerHTML = moment().tz(guidepostTimeZone).format('ddd DD MMM');

  if(guestTimeZone !== null) {
    // Set Guest time
    guestTime = moment().tz(guestTimeZone).format('HH-mm').split('-');
    guestTimeEle.innerHTML = guestTime[0] + divider + guestTime[1];
    guestDateEle.innerHTML = moment().tz(guestTimeZone).format('ddd DD MMM');
  }
  tick = !tick;
}

window.addEventListener('load', function() {
  initClocks();
  this.window.setInterval(tickClocks, 500);
});