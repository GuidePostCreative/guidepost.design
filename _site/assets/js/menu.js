var lastKnownScrollY = 0;
var currentScrollY = 0;
var ticking = false;
var idOfHeader = 'navbar';
var eleHeader = null;
var threashold = 200;
var classes = {
  pinned: 'pin',
  unpinned: 'unpin',
};

function onScroll() {
  currentScrollY = window.pageYOffset;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}

function update() {

    if (currentScrollY > threashold) {
      pin();
    } else {
      unpin();
    }
    ticking = false;

}

function pin() {
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned);
    eleHeader.classList.add(classes.pinned);
  }
}

function unpin() {
  if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.pinned);
    eleHeader.classList.add(classes.unpinned);
  }
}

if(document.getElementById(idOfHeader).classList.contains('hiddable')) {
  window.addEventListener('load', function() {
    eleHeader = document.getElementById(idOfHeader);
    document.addEventListener('scroll', onScroll);
    // update();
  });
};

