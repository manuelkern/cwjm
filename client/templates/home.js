Template.home.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('euroRacks');
  });
});

Template.home.onRendered(function() {
  //autorun
  this.autorun(function() {
    if(Template.instance().subscriptionsReady()) {

      Tracker.afterFlush(function() {
        //subs ready
        const imgModules = document.querySelectorAll('.image');
        //calculate size of modules
        const calcSize = function(){
          let size = 2.5;
          if ($(window).width() <= 990 ) {
            return size * 1.8;
          } else {
            return size;
          }
        }
        //set grid
        Animations.setSizeOfModules(imgModules, calcSize());
        //set grid on resize
        const updateModulesSize = _.debounce(function() {
          Animations.setSizeOfModulesOnResize(imgModules, calcSize())
        }, 200);
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
    route = this.slug;
    FlowRouter.go('/' + route);
  }
});

Template.euroRack.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('euroRack', slug);
  });
});

Template.euroRack.helpers({
  euroRack: function () {
    var slug = FlowRouter.getParam('slug');
    return EuroRacks.findOne({slug: slug});
  }
});