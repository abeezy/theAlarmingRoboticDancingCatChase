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
		.get('/alarms', function(request, response) {
			Alarm.getAlarms(function (err, docs) {
				response.render("alarms", {
					alarms: docs
				});
			});
		})
		.post('/', function (request, response) {
			console.log(request.body)
			Alarm.setAlarm(request.body, function (err, newDoc) {
				response.redirect('/alarms');
			});
		})
		.get('/alarmstatus', function (request, response) {
			Alarm.alarmStatus(function (data) {
				response.send(data);
			});
		})
	;

	return router;
};
