var Alarm = require('../lib/alarm');

module.exports = function (router) {

	router
		.all('*', function (request, response, next) {
			console.log('incoming request: ', request.method, request.url);
			next();
		})
		.get('/', function (request, response) {
			var wakeupTime = {
				hour: 5,
				minute: 5
			};
			//console.log(wakeupTime)
			//Alarm.AlarmClock(wakeupTime);
			response.render("index", {});
		})
	;

	return router;
};
