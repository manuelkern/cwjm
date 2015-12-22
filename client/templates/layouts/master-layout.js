BlazeLayout.setRoot('body');

Template.masterLayout.onRendered(function() {
  if($('.app').hasClass('open')) {
    $('#open-admin-panel').hide();
  }
});

Template.masterLayout.events({
  'click #open-admin-panel': function(event) {
    $('.admin, .app').addClass('open');
    
    $(event.target).hide();
  },
  'click #close-admin-panel': function(event) {
    $('.admin, .app').removeClass('open');
    $('#open-admin-panel').show();
  }
});