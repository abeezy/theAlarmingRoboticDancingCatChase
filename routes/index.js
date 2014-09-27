module.exports = function (router) {

	router
		.all('*', function (request, response, next) {
			logger.info('incoming request: ', request.method, request.url);
			next();
		})
		.get('/', function (request, response) {
			response.render("index", {});
		})
	;

	return router;
};
