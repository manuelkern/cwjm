Template.home.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('euroRacks');
  });
});

Template.home.onRendered(function() {

  Animations = {};

  Animations.setHeightAndWidth = function(image, size) {
    if (image.parentNode !== null) {
      image.parentNode.style.width = image.naturalWidth / size + 'px';
      image.parentNode.style.height = image.naturalHeight / size + 'px'; 
    }
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

  //set background
  const $app = $('.app');
  if ($app.hasClass('gray')) {
    $app.removeClass('gray');
    $('.stripe1, .stripe2, body, html, .modules-nav, .main-nav').removeClass('gray');
  }

  let size = 2.5;

  this.autorun(function() {

    if(Template.instance().subscriptionsReady()) {

      Tracker.afterFlush(function() {
        //vars
        const imgModules = document.querySelectorAll('.image');
        //set grid
        setTimeout(Animations.setSizeOfModules(imgModules, calcSizeOfModule(size)), 200);
        //set grid on resize
        const updateModulesSize = _.debounce(function() {
          setTimeout(Animations.setSizeOfModulesOnResize(imgModules, calcSizeOfModule(size)), 200);
        }, 200);
        //window resize
        window.addEventListener('resize', updateModulesSize, false);
      });

    } else {
      //subs not ready
    }
  })

});

Template.home.helpers({
  euroRacks: function () {
    return EuroRacks.find({}, {sort: {title: 1}});
  },
});

Template.home.events({
  'mouseenter .image':function(event) {
    const slug = this.slug;
    $('.' + slug).find('a').addClass('active');
  },
  'mouseleave .image':function(event) {
    const slug = this.slug;
    $('.' + slug).find('a').removeClass('active');
  },
  'click .image': function(event) {
    event.preventDefault();
    //variables
    const slug = this.slug;
    const title = this.title;
    const container = document.getElementsByClassName('euro-racks')[0];
    const centerW = (window.innerWidth / 4) * 3;
    const centerH = window.innerHeight / 2;
    const $eventLeft = $(event.target).offset().left;
    const $eventCenterHeight = $(event.target).height() / 2;
    const $eventTop = $(event.target).offset().top;

    let ready = false;
    let operatorX = true;
    let operatorY = true;
    let centerX;
    let centerY;

    if ($eventLeft < centerW) {
      operatorX = false
    }

    if ((centerH - $eventCenterHeight) < $eventTop) {
      operatorY = false
    }

    //euro rack to front
    $(event.target).parent().css({
      'z-index': '999'
    });

    //mouse position on click
    const xPosition = event.clientX;
    const yPosition = event.clientY;

    //elements
    const circle = document.createElement('div');
          circle.className = 'circle';
    const transitionPanel = document.createElement('div');
          transitionPanel.className = 'transition-panel';
    const moduleTitle = document.createElement('p');
          moduleTitle.className = 'transition-title';
          moduleTitle.innerHTML = title;
    const page = document.getElementsByClassName('app')[0];

    page.appendChild(transitionPanel);
    transitionPanel.appendChild(moduleTitle);

    //functions
    const goRoute = function() {
      $('.app').css({'overflow-y': 'scroll'});
      $('.app').scrollTop('0');
      FlowRouter.go('/' + slug)
    }

    const getCenterX = function() {
      if (operatorX) {
        centerX = -(($eventLeft - centerW) + (event.target.offsetWidth / 2));
      } else {
        centerX = (centerW - $eventLeft) - (event.target.offsetWidth / 2);
      }
      return centerX;
    }

    const getCenterY = function() {
      if (operatorY) {
        centerY = (centerH - $eventCenterHeight) - $eventTop;
      } else {
        centerY = -($eventTop - (centerH - $eventCenterHeight));
      }
      return centerY;
    }

    $('.app').css({'overflow-y': 'hidden'});

    const animTransition = function() {
      //append ripple effect
      container.appendChild(circle);
      //apply position to circle
      circle.style.left = ((xPosition - (window.innerWidth - container.offsetWidth)) - circle.offsetWidth / 2) + 'px';
      circle.style.top  = ((yPosition - $(container).offset().top) - circle.offsetHeight / 2) + 'px';
      //calculates how big it should scale
      const scaleX = (window.innerWidth / circle.offsetWidth) * 2;
      //animate circle's scale
      $(circle).velocity({ scaleX: scaleX, scaleY: scaleX }, { duration: 500 });
      //animate circle to position
      $(event.target).parent().velocity({ translateX: getCenterX(), translateY: getCenterY() }, { easing: [ 200, 15 ], duration: 700 });
      //animate transition panels
      $('.transition-panel, .transition-title').addClass('open');
      //go to route
      setTimeout(goRoute, 1000);
    }

    setTimeout(animTransition, 200);

  }
});