(function () {
	var threshold = 10; // This number should a divisor of 100 (1, 2, 4, 5, 10, 20, 25, 50, 100) so that it will go evenly into the page's height in percents
	var curReach = 0; // used to track the current max reach of the user
	var $window = $(window); // select the window once, not every time we use it.
	var $document = $(document); // select the document once, not every time we use it.

	// This will detemine the user's reach based on the page's current height and the user's current window size.
	// It will then round down to the nearest threshold, which is set above.
	var getReach = function () {
		return Math.floor((($window.height() + $window.scrollTop()) / $document.height()) * (100 / threshold)) * threshold;
	};

	// Sends the data of the current reach to GA for tracking/storage.
	// Also, updates curReach to the user's current reach
	var trackReach = function (reach) {
		curReach = reach;
		_gaq.push(['_trackEvent', document.title, 'scroll reach', curReach + '%', curReach, true]);
	};

	var newReach = function(){
		while(getReach() > curReach)
			trackReach(curReach + threshold);
	};
			
	//When the page first loads, this will track each threshold the user reaches.
	newReach();
	
	//When the user scrolls, this will track each threshold the user reaches.
	$window.scroll(newReach);
})();
