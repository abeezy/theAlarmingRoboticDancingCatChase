var Alarm = require('../lib/alarm');

module.exports = function (router) {

	router
		.all('*', function (request, response, next) {
			console.log('incoming request: ', request.method, request.url);
			next();
		})
		.get('/', function (request, response) {
			Alarm.getAlarms(function (err, docs) {
				response.render("index", {
					alarms: docs
				});
			});
		})
		.post('/', function (request, response) {
			console.log(request.body)
			Alarm.setAlarm(request.body, function (err, newDoc) {
				response.json(newDoc)
			});
		})
	;

	return router;
};
