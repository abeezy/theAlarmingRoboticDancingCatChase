var Datastore = require('nedb'),
	db = new Datastore({filename: 'data.db', autoload: true});

var docs = [
	{
		hour: 7,
		minute: 25,
		active: true
	},
	{
		hour: 7,
		minute: 30,
		active: true
	},
	{
		hour: 7,
		minute: 35,
		active: false
	},
	{
		hour: 7,
		minute: 40,
		active: true
	}
];

// db.insert(docs, function (err, newDoc) {
// 	console.log(newDoc);
// 	process.exit();
// });

// db.remove({}, {multi:true}, function (err, numRemoved) {
// 	console.log(numRemoved);
// 	process.exit();
// })
//
db.find({}, function(err, docs) {
	console.log(docs);
	process.exit();
})
