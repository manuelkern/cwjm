Template.submitEuroRack.events({
  'submit #submit-euro-rack': function(event, template) {
    event.preventDefault();
    //doc
    var title = event.target.title.value
    var slug = createURLSlug(title);
    var doc = {
      title: title,
      slug: slug,
      discontinued: false,
      active: true
    }
    //insert doc
    Meteor.call('insertEuroRack', doc, function(err) {
      if(err) {
        console.log(err.reason);
      } else {
        event.target.title.value = '';
        FlowRouter.go('/' + slug);
      }
    });
  }
});