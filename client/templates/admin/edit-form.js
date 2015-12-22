Template.editEuroRackFormAdmin.events({
  'submit #edit-euro-rack': function(event) {
    event.preventDefault();
    var euroRackId = this._id
    var title = event.target.title.value;
    var slug = createURLSlug(title);
    var doc = {
      title: title,
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
  }
});