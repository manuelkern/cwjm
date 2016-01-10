Template.home.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('euroRacks');
  });
});

Template.home.onRendered(function() {
  //set background
  const $app = $('.app');
  if ($app.hasClass('gray')) {
    $app.removeClass('gray');
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
  'click .image': function(event) {
    event.preventDefault();
    //variables
    const slug = this.slug;
    const title = this.title;
    const container = document.getElementsByClassName('euro-racks')[0];
    const centerW = window.innerWidth / 2;
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

    //transition panel
    const transitionPanel = document.createElement('div');
    transitionPanel.className = 'transition-panel';
    const page = document.getElementsByClassName('app')[0];
    page.appendChild(transitionPanel);
    $(transitionPanel).append("<p>" + title + "</p>");

    //functions
    const goRoute = function(route) {
      FlowRouter.go('/' + route)
    }

    const animeCircle = function() {

      //circle
      const circle = document.createElement('div');
      circle.className = 'circle';

      //append ripple effect
      container.appendChild(circle);

      //mouse position on click
      const xPosition = event.clientX;
      const yPosition = event.clientY;

      //apply position to circle
      circle.style.left = ((xPosition - (window.innerWidth - container.offsetWidth)) - circle.offsetWidth / 2) + 'px';
      circle.style.top  = ((yPosition - $(container).offset().top) - circle.offsetHeight / 2) + 'px';

      //calculates how big it should scale
      const scaleX = (window.innerWidth / circle.offsetWidth) * 2;

      //animate circle's scale
      $(circle).velocity({
        scaleX: [scaleX, 0],
        scaleY: [scaleX, 0],
      });

      //get the right amount of pixels to translateX
      if (operatorX) {
        centerX = -(($eventLeft - centerW) + (event.target.offsetWidth / 2));
      } else {
        centerX = (centerW - $eventLeft) - (event.target.offsetWidth / 2);
      }

      if (operatorY) {
        centerY = (centerH - $eventCenterHeight) - $eventTop;
      } else {
        centerY = -($eventTop - (centerH - $eventCenterHeight));
      }

      $('.transition-panel p').addClass('open');
      //animation transition panel
      $(transitionPanel).velocity({
        left: 0
      }, {
        delay: 400,
        easing: [ 100, 30 ],
        duration: 450,
        complete: function() {
          ready = true;
          if(ready == true) {
            $('.app').css({'overflow-y': 'auto'});
            goRoute(slug);
          }
        }
      })

      //animate circle to position
      $(event.target).parent().velocity({
        translateX: centerX,
        translateY: centerY
      }, {
        // delay: 200,
        easing: [ 200, 15 ],
        duration: 700,
      });
    }

    setTimeout(animeCircle, 200);

  }
});