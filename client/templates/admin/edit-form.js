Template.editEuroRackFormAdmin.events({
  'submit #edit-euro-rack': function(event) {
    event.preventDefault();
    const euroRackId = this._id
    const title = event.target.title.value;
    const subTitle = event.target.subTitle.value;
    const slug = createURLSlug(title);
    const doc = {
      title: title,
      subTitle: subTitle,
      slug: slug,
    }
    Meteor.call('editEuroRack', euroRackId, doc, function(err) {
      if(err) {
        console.log(err.reason);
      } else {
        console.log('module updated');
        FlowRouter.go('/edit/' + slug);
      }
    });
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
  },
  'click .toggle-new': function(event) {
    var euroRackId = this._id;
    var checked = event.target.checked;
    Meteor.call('setNew', euroRackId, checked, function(err) {
      if(err) {
        console.log(err.reason);
      } else {
        console.log('module updated');
      }
    });
  }
});