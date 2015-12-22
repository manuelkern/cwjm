Template.uploaderAdmin.onCreated(function(){
  Uploader.init(this);
});

Template.uploaderAdmin.onRendered(function(){
  Uploader.render.call(this);
  function readURL(input) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('.preview').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
  $('.upload-input').change(function(){
    console.log('changed')
    readURL(this);
  });
});

Template.uploaderAdmin.events({
  'click .start': function (event){
    Uploader.startUpload.call(Template.instance(), event);
  }
});

Template.uploaderAdmin.helpers({
  'infoLabel': function() {
    var instance = Template.instance();
    // we may have not yet selected a file
    var info = instance.info.get();
    if (!info) {
      return;
    }

    var progress = instance.globalInfo.get();
    // we display different result when running or not
    return progress.running ?
      info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
      info.name + ' - ' + info.size + 'B';
  },
  'progress': function() {
    return Template.instance().globalInfo.get().progress + '%';
  }
});