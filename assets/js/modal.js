function openImageModal(event) {
  uglipop({
    source:'html',
    class:'guidepost-modal',
    content:'<img src="' + event.target.src + '"></img><h3>' + event.target.alt + '</h3>'
  });
}


document.addEventListener("DOMContentLoaded", function() {
  var images = document.getElementsByClassName('modal-image');
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', openImageModal);
  }
});