var bodyParser = require('body-parser'),
	express = require('express'),
	path = require('path'),
	servStatic = require('serve-static');

var app = express();

app.use(function (req, res, next) {
	res.setHeader('x-powered-by', 'alarming robotic dancing cat');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// load up the main router!
var Router = express.Router();
var router = require('./routes/index')(Router);

app.use('/', servStatic(path.join(__dirname, 'views/static')));
app.use('/', router);

app.listen(3000, function () {
	console.log("the cat is ready to dance");
});
