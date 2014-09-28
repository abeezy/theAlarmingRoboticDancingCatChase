(function doPoll() {
	setTimeout(function () {
		 $.ajax({
	    	url: '/alarmstatus',
	    	complete: doPoll,
	    	success: function(data) {
	        	if (data == true) {
	        		document.getElementById('alarmAudio').play()
	        	} else {
	        		document.getElementById('alarmAudio').pause()
	        	}
	    	},
	    	error: function(err) {
	    		console.log(err.statusText);
	    	},
	    	timeout: 2000
		})
	}, 2000);
})();

$('#stop').click(function(e) {
	e.preventDefault();
	document.getElementById('alarmAudio').pause()
	$.get('/turnOffAlarm')
})
