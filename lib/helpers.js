createURLSlug = function (url){
  var slugRegex = /[^\w\-\.\~]/g;
  while(slugRegex.test(url)) {
    url = url.replace(slugRegex, '-');
  }
  return url.toLowerCase();
};

calcSizeOfModule = function(dimension) {
  if ($(window).width() <= 990 ) {
    return dimension * 1.8;
  } else {
    return dimension;
  }
}