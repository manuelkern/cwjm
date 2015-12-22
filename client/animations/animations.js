Animations = {};

Animations.setSizeOfModules = function(images, size) {
  $(images).parent().hide();
  for (let img of images) {
    img.onload = function(){
      this.parentNode.style.width  = (this.naturalWidth / size) + 'px';
      this.parentNode.style.height = (this.naturalHeight / size) + 'px';
      $(this.parentNode).velocity('fadeIn', { display: 'inline-block' });
    }
  }
}

Animations.setSizeOfModulesOnResize = function(images, size) {
  let module = {}
  for (let img of images) {
    img.parentNode.style.width = img.naturalWidth / size + 'px';
    img.parentNode.style.height = img.naturalHeight / size + 'px';
  }
}