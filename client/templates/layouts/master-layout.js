BlazeLayout.setRoot('body');

Template.masterLayout.onRendered(function() {
  if($('.app').hasClass('open')) {
    $('#open-admin-panel').hide();
  }
  this.find('.app')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  }
});

Template.masterLayout.events({
  'click #open-admin-panel': function(event) {
    $('.admin, .app').addClass('open');
    $(event.target).velocity('fadeOut');
  },
  'click #close-admin-panel': function(event) {
    $('.admin, .app').removeClass('open');
    $('#open-admin-panel, .admin-icon').velocity('fadeIn')
  }
});

Template.modulesNav.onCreated(function() {
  const self = this;
  self.autorun(function() {
    self.subscribe('euroRacksTitles');
  });
});

Template.modulesNav.helpers({
  titles: function() {
    return EuroRacks.find({}, {sort: {title: 1}});
  },
  isActive: function() {
    if (this.slug === FlowRouter.getParam('slug')) {
      return true
    }
  }
});