Animations = {};

Animations.setDimensionsOfModule = function(image, size) {
  if (image.parentNode !== null) {
    image.parentNode.style.width = image.naturalWidth / size + 'px';
    image.parentNode.style.height = image.naturalHeight / size + 'px'; 
  }
}

Animations.setSizeOfModules = function(images, size) {
  for (let img of images) {
    img.onload = function() {
      Animations.setDimensionsOfModule(img, size);
    }
  }
}

Animations.setSizeOfModulesOnResize = function(images, size) {
  let module = {}
  for (let img of images) {
    Animations.setDimensionsOfModule(img, size);
  }
}

Animations.calcSize = function(integer) {
  if (Screen.breakPoint() === 'mobile') {
    return integer * 2;
  } else if(Screen.breakPoint() === 'tablet') {
    return integer * 1.8;
  } else if(Screen.breakPoint() === 'small') {
    return integer * 1.6;
  } else if(Screen.breakPoint() === 'medium') {
    return integer * 1.4;
  } else if(Screen.breakPoint() === 'large') {
    return integer * 1.2;
  } else {
    return integer;
  }
}