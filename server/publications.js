Meteor.publish('euroRacks', function() {
  // Meteor._sleepForMs(2000);
  return EuroRacks.find({});
});

Meteor.publish('euroRack', function(slug) {
  return EuroRacks.find({slug: slug});
});

Meteor.publish('euroRacksTitles', function() {
	return EuroRacks.find({}, {fields: {title:1, slug:1, inProduction: 1}});
})