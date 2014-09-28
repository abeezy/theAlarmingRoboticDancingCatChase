(function doPoll() {
	setTimeout(function () {
		 $.ajax({
	    	url: '/alarmstatus',
	    	complete: doPoll,
	    	success: function(data) {
	        	console.log(data);
	        	if (data == true) {
	        		console.log('play nyancat');
	        	} else {
	        		console.log('no nyancat');
	        	}
	    	},
	    	error: function(err) {
	    		console.log(err.statusText);
	    	},
	    	timeout: 2000
		})
	}, 2000);
})();
