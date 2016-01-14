Template.euroRacksAdmin.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('euroRacks');
  });
});

Template.euroRacksAdmin.helpers({
  euroRacks: function() {
    return EuroRacks.find({}, {sort: {title: 1}});
  }
});

Template.euroRackAdmin.events({
  'mouseenter .link-to-edit': function(event) {
    let span = event.target.previousSibling;
    $(span).addClass('go');
  },
  'mouseleave .link-to-edit': function(event) {
    let span = event.target.previousSibling;
    $(span).removeClass('go');
  },
  'click .delete-euro': function(event) {
    event.preventDefault();
    var euroRackId = this._id;
    //remove doc
    EuroRacks.remove(euroRackId);
  },
  'click .toggle-discontinued': function(event) {
    var euroRackId = this._id;
    var checked = event.target.checked;
    Meteor.call('setDiscontinued', euroRackId, checked, function(err) {
      if(err) {
        console.log(err.reason);
      } else {
        console.log('module updated');
      }
    });
  },
  'click .toggle-active': function(event) {
    var euroRackId = this._id;
    var checked = event.target.checked;
    Meteor.call('setActive', euroRackId, checked, function(err) {
      if(err) {
        console.log(err.reason);
      } else {
        console.log('module updated');
      }
    });
  },
  'click .toggle-inProduction': function(event) {
    var euroRackId = this._id;
    var checked = event.target.checked;
    Meteor.call('setInProduction', euroRackId, checked, function(err) {
      if(err) {
        console.log(err.reason);
      } else {
        console.log('module updated');
      }
    });
  }
});