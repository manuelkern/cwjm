Animations = {};

Animations.setHeightAndWidth = function(image, size) {
  image.parentNode.style.width = image.naturalWidth / size + 'px';
  image.parentNode.style.height = image.naturalHeight / size + 'px'; 
}

Animations.setSizeOfModules = function(images, size) {
  for (let img of images) {
    img.onload = function() {
      Animations.setHeightAndWidth(img, size);
      if (img.complete) {
        $(this.parentNode).css({'opacity': '1'});
      }
    }
  }
}

Animations.setSizeOfModulesOnResize = function(images, size) {
  let module = {}
  for (let img of images) {
    Animations.setHeightAndWidth(img, size);
  }
}