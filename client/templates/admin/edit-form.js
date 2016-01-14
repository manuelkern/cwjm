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
  }
});