createURLSlug = function (url){
  var slugRegex = /[^\w\-\.\~]/g;
  while(slugRegex.test(url)) {
    url = url.replace(slugRegex, '-');
  }
  return url.toLowerCase();
};

calcSizeOfModule = function(dimension) {
  if ($(window).width() <= 990) {
    return dimension * 1.8;
  } else if ($(window).width() <= 1200) {
    return dimension * 1.4;
  } else if ($(window).width() <= 1920) {
    return dimension * 1.2;
  } else {
    return dimension;
  }
}