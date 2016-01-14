Meteor.methods({
  insertEuroRack: function(doc) {
    EuroRacks.insert(doc);
  },
  editEuroRack: function(euroRackId, doc) {
    EuroRacks.update(euroRackId, {$set: doc});
  },
  setDiscontinued: function(euroRack, value) {
    EuroRacks.update(euroRack, {$set: {discontinued: value}});
  },
  setActive: function(euroRack, value) {
    EuroRacks.update(euroRack, {$set: {active: value}});
  },
  setInProduction: function(euroRack, value) {
    EuroRacks.update(euroRack, {$set: {inProduction: value}});
  },
  insertImage: function(slug, file) {
    EuroRacks.update({slug: slug}, {$set: {image: file}});
  }
});