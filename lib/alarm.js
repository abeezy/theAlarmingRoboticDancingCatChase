var Datastore = require('nedb'),
	db = new Datastore({filename: 'data.db', autoload: true});

function AlarmClock(currentTime) {
	db.find(currentTime, function (err, doc) {
		console.log(doc);
		if (doc.length > 0) {
			if (doc[0].hour == currentTime.hour && doc[0].minute == currentTime.minute && doc[0].active === true) {
				_triggerAlarm();
			} else {
				console.log('no active alarm');
			}
		}
	});
}

function _triggerAlarm() {
	console.log('alarm! alarm!');
}

module.exports = AlarmClock;
