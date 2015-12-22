FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('masterLayout', {
      admin: 'admin',
      app: 'home'
    });
  }
});

FlowRouter.route('/edit/:slug', {
  name: 'editEuroRackAdmin',
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      admin: 'editEuroRackAdmin',
      app: 'euroRack'
    });
  }
});

FlowRouter.route('/:slug', {
  name: 'eurorack',
  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      admin: 'editEuroRackAdmin',
      app: 'euroRack'
    });
  }
});