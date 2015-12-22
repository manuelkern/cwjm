Template.editEuroRackAdmin.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('euroRack', slug);
    Uploader.finished = function(index, file) {
      var thumbnailPath = file.baseUrl + file.subDirectory + '/thumbnail/' + file.name;
      file.thumbnail = thumbnailPath;
      Meteor.call('insertImage', slug, file, function (error, result) {});
    }; 
  });
});

Template.editEuroRackAdmin.helpers({
  euroRack: function() {
    var slug = FlowRouter.getParam('slug');
    return EuroRacks.findOne({slug: slug});
  },
  uploaderCallbacks: function() {
    return {
      formData: function() { 
        return { 
          directoryName: 'images', 
          collection: 'EuroRacks', 
          id: this._id 
        };
      }
    };
  },
});