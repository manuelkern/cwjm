Template.euroRack.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var slug = FlowRouter.getParam('slug');
    self.subscribe('euroRack', slug);
  });
});

Template.euroRack.onRendered(function() {
	//set background
	$('.app').addClass('gray');

	const transitionPanel = document.getElementsByClassName('transition-panel')[0];

	const secondTransionPanel = document.createElement('div');
				secondTransionPanel.className = 'transition-panel second';

	const modulePage = document.getElementsByClassName('app')[0];

	let panelOut;

	if (typeof transitionPanel === 'undefined') {
		panelOut = false;
	} else {
		panelOut = true;
	}

	const showModule = function(module) {
		$(module).velocity({
			opacity: 1
		}, {duration: 300});
	}

	this.autorun(function() {

		if(Template.instance().subscriptionsReady()) {

			Tracker.afterFlush(function() {

				const euroRack = document.getElementsByClassName('euro-rack')[0];

				euroRack.onload = function() {
					showModule(this);
				}

				if (panelOut) {

					modulePage.appendChild(secondTransionPanel);
					$(transitionPanel).velocity({left: '100%'}, {duration: 700, delay: 300, easing: [ 50, 10 ]});
					$(secondTransionPanel).velocity({left: '100%'}, {
						duration: 1000,
						// easing: [ 50, 10 ],
						complete: function() {
							$(transitionPanel).remove();
							$(secondTransionPanel).remove();
						}
					});

				}

			});

		}

	});
});

Template.euroRack.helpers({
  euroRack: function () {
    var slug = FlowRouter.getParam('slug');
    return EuroRacks.findOne({slug: slug});
  }
});