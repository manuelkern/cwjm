Template.home.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('euroRacks');
  });
});

Template.home.onRendered(function() {

  //set background
  if ($('.app').hasClass('gray')) {
    $('.app, .stripe1, .stripe2, body, html, .modules-nav, .main-nav').removeClass('gray');
  }

  let size = 2.5;

  this.autorun(function() {

    if(Template.instance().subscriptionsReady()) {
      Tracker.afterFlush(function() {
        //modules
        const imgModules = document.querySelectorAll('.image');
        //set grid
        setTimeout(Animations.setSizeOfModules(imgModules, Animations.calcSize(size)), 200);
        //set grid on resize
        const updateModulesSize = _.debounce(function() {
          setTimeout(Animations.setSizeOfModulesOnResize(imgModules, Animations.calcSize(size)), 200);
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
    //
    event.preventDefault();
    //
    //variables
    const slug = this.slug;
    const title = this.title;

    const xPosition = event.clientX;
    const yPosition = event.clientY;

    const $module = $(event.target);

    const container = document.getElementsByClassName('euro-racks')[0];
    const page = document.getElementsByClassName('app')[0];

    const centerW = (Screen.width() / 4) * 3;
    const centerH = Screen.height() / 2;

    const $eventLeft = $(event.target).offset().left;
    const $eventCenterHeight = $(event.target).height() / 2;
    const $eventTop = $(event.target).offset().top;

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
    //
    // create elements
    const circle = document.createElement('div');
          circle.className = 'circle';
    const transitionPanel = document.createElement('div');
          transitionPanel.className = 'transition-panel';
    const moduleTitle = document.createElement('p');
          moduleTitle.className = 'transition-title';
          moduleTitle.innerHTML = title;

    $(event.target).parent().css({
      'z-index': '999'
    });
    //
    // append the transition panel
    page.appendChild(transitionPanel);
    transitionPanel.appendChild(moduleTitle);
    
    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // FUNCTIONS
    // -------------------------------------------------------------
    // -------------------------------------------------------------

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
      //
      // append circle to page
      container.appendChild(circle);
      //
      // and set his position to mouse coordinates
      circle.style.left = ((xPosition - (Screen.width() - container.offsetWidth)) - circle.offsetWidth / 2) + 'px';
      circle.style.top  = ((yPosition - $(container).offset().top) - circle.offsetHeight / 2) + 'px';
      //
      // calculates how big it should scale to fit the screen
      const scaleX = (Screen.width() / circle.offsetWidth) * 2;
      //
      // animate scale
      $(circle).velocity({ scaleX: scaleX, scaleY: scaleX }, { duration: 500 });
      //
      // animate module to desired position
      $module.parent().velocity({ translateX: getCenterX(), translateY: getCenterY() }, { easing: [ 200, 15 ], duration: 700 });
      //
      // animate transition panels
      $('.transition-panel, .transition-title').addClass('open');
      //
      //go to route
      setTimeout(goRoute, 1000);
    }

    setTimeout(animTransition, 200);

  }
});