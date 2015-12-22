Meteor.publish('euroRacks', function() {
  return EuroRacks.find({});
});

Meteor.publish('euroRack', function(slug) {
  return EuroRacks.find({slug: slug});
});