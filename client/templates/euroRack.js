Template.euroRack.onCreated(function() {
  let self = this;
  self.autorun(function() {
    let slug = FlowRouter.getParam('slug');
    self.subscribe('euroRack', slug);
  });
});

Template.euroRack.onRendered(function() {
	//set background
	$('.app, .stripe1, .stripe2, body, html, .modules-nav, .main-nav').addClass('gray');
	const logo = document.getElementById('logo');
	logo.style.backgroundImage = "url(/images/logo_beige.svg)";

	const transitionPanel = document.getElementsByClassName('transition-panel')[0];
	const modulePage = document.getElementsByClassName('app')[0];

	const secondTransionPanel = document.createElement('div');
	secondTransionPanel.className = 'transition-panel second';

	const logoE = document.createElement('img');
	logoE.src = '/images/e.svg';

	secondTransionPanel.appendChild(logoE);
	
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
				$('.sub-title').hyphenate('en-us');

				const euroRack = document.getElementsByClassName('euro-rack')[0];
				// euroRack.onload = function() {
				// 	showModule(this);
				// }
				const hello = 'hello';

				if (panelOut) {
					modulePage.appendChild(secondTransionPanel);
					$(transitionPanel).addClass('leave');
					$(secondTransionPanel).velocity({translateX: '200%'}, {
						duration: 800,
						// easing: 'easeInOut',
						complete: function() {
							$(transitionPanel).remove();
							$(secondTransionPanel).remove();
							panelOut = false;
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

Template.euroRack.onDestroyed(function() {
	const logo = document.getElementById('logo');
	logo.style.backgroundImage = "url(/images/logo.svg)";
})