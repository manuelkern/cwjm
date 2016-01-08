Meteor.publish('euroRacks', function() {
  // Meteor._sleepForMs(2000);
  return EuroRacks.find({});
});

Meteor.publish('euroRack', function(slug) {
  return EuroRacks.find({slug: slug});
});