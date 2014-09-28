var Datastore = require('nedb'),
	db = new Datastore({filename: 'data.db', autoload: true});

function Alarm() {
	'use strict';
	var publicAPI;

	function alarmClock(currentTime) {
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

	function setAlarm(wakeupTime, callback) {
		var time = wakeupTime.time.split(":"),
				alarmInfo = {
				hour: parseInt(time[0], 0),
				minute: parseInt(time[1], 0),
				song: wakeupTime.song,
				active: true
			};

		db.insert(alarmInfo, function (err, newDoc) {
			callback(null, newDoc);
		});
	}

	function getAlarms(callback) {
		db.find({active:true}, function (err, docs) {
			callback(err, docs);
		});
	}

	publicAPI = {
		alarmClock: alarmClock,
		setAlarm: setAlarm,
		getAlarms: getAlarms
	};

	return publicAPI;
}

function _triggerAlarm() {
	console.log('alarm! alarm!');
}

module.exports = Alarm();
