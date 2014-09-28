var Datastore = require('nedb'),
	db = new Datastore({filename: 'data.db', autoload: true}),
	status = false;

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
			var minute;
			if (docs.length == 1) {
				minute = docs[0].minute.toString();
				if (minute.length == 1) {
					docs[0].minute = "0" + minute;
				}
			} else if (docs.length > 1) {
				for (var i = 0; i < docs.length; i++) {
					minute = docs[i].minute.toString();
					if (minute.length == 1) {
						docs[i].minute = "0" + minute;
					}
				}
			}
			callback(err, docs);
		});
	}

	function alarmStatus(callback) {
		callback(status);
	}

	publicAPI = {
		alarmClock: alarmClock,
		setAlarm: setAlarm,
		getAlarms: getAlarms,
		alarmStatus: alarmStatus
	};

	return publicAPI;
}

function _triggerAlarm() {
	status = true;
	// request({url: 'https://agent.electricimp.com/tSnjG3QLg-Hq?led=1&song=255'}, function (err, res, body) {
	// 	console.log(body);
	// });
}

function _stopAlarm() {
	status = false;
}

module.exports = Alarm();
