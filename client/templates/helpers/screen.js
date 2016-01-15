Screen = {};

Screen.width = function() {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return width;
}

Screen.height = function() {
	const width = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return width;
}

Screen.breakPoint = function() {
	const screen = {
		whatBreak: function() {
			if(Screen.width() > 1920) {
				// 1920 -> infinity
				return 'ultra';
			} else if(Screen.width() > 1366) {
				// 1366 -> 1920
				return 'wide';
			} else if(Screen.width() > 1280) {
				// 1280 -> 1366
				return 'large';
			} else if(Screen.width() > 990) {
				// 990 -> 1280
				return 'medium';
			} else if(Screen.width() > 768) {
				// 768 -> 990
				return 'small';
			} else if(Screen.width() > 480) {
				// 480 -> 768
				return 'tablet';
			} else {
				// 0 -> 480
				return 'mobile';
			}
		},
	};
	return screen.whatBreak();
}