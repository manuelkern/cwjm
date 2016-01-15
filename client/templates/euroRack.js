Template.euroRack.onCreated(function() {
  let self = this;
  self.autorun(function() {
    let slug = FlowRouter.getParam('slug');
    self.subscribe('euroRack', slug);
  });
});

Template.euroRack.onRendered(function() {
	//
	// change colors
	$('.app, .stripe1, .stripe2, body, html, .euro-racks-nav, .main-nav').addClass('gray');
	//
	// change logo's color
	const	logo = document.getElementById('logo');
				logo.style.backgroundImage = "url(/images/logo_beige.svg)";
	//
	// variables
	const transitionPanel = document.getElementsByClassName('transition-panel')[0];
	const modulePage = document.getElementsByClassName('app')[0];
	//
	// create second transition panel
	const secondTransionPanel = document.createElement('div');
				secondTransionPanel.className = 'transition-panel second';
	const logoE = document.createElement('img');
				logoE.src = '/images/e.svg';
	secondTransionPanel.appendChild(logoE);
	//
	//
	let panelOut;
	//
	// chack if you're coming from home
	if (typeof transitionPanel === 'undefined') {
		panelOut = false;
	} else {
		panelOut = true;
	}

	this.autorun(function() {
		if(Template.instance().subscriptionsReady()) {

			Tracker.afterFlush(function() {
				//
				// reset reactiveVar fromGrid
				if (fromGrid) {
					const navH = document.getElementsByClassName('main-nav gray')[0].offsetHeight - 1;
					const nHero = document.getElementsByClassName('hero-transition')[0];
					const n = nHero.getBoundingClientRect();
					const oHero = document.getElementsByClassName('hero-transition-leaving')[0];
					const o = oHero.getBoundingClientRect();

					const x = (o.left - n.left) - ( (n.width - o.width) / 2 );
					const y = (oHero.offsetTop + navH) - n.top;
					const w = n.width;
					const h = n.height;

					$(oHero).velocity({
						translateX: -x + 'px',
						translateY: -y + 'px',
						width: w + 'px',
						height: h + 'px'
					}, {
						easing: [ 150, 35 ]
					})

					// $('.circle').velocity('fadeOut');

					fromGrid = false;
				}
				
				// put hyphens on subtitle
				$('.sub-title').hyphenate('en-us');

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

		} else {
			//
			// sub not ready
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