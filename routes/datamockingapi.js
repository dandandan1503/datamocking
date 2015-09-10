var express = require('express');
var api = require('../datamocking/api');
var generator = require('../datamocking/generator');
var initializer = require('../datamocking/initializer');
var router = express.Router();

// Create empty routeParams object on req
router.use(function routeParamsInit(req, res, next) {
    req.routeParams = {};
    next();
});

// Add :endpoint to routeParams object
router.param('endpoint', function (req, res, next, endpoint) {
    req.routeParams.endpoint = endpoint;
    next();
});

// Return list of all api endpoints
router.get('/api', function (req, res, next) {
    res.json(api.allEndpoints());
});

// Initialize endpoint with config payload
router.post(['/api/init/:endpoint', '/api/init/:endpoint/:count'], function (req, res, next) {
    res.json(api.addEndpoint(req.params.endpoint, req.params.count, req.body.config, []));
});

router.get(['/api/init/:endpoint/:model', '/api/init/:endpoint/:model/:count'], function (req, res, next) {
    var dependencies = req.query.dependencies ? req.query.dependencies.split(',') : [];
    res.json(api.addEndpoint(req.params.endpoint, req.params.count, req.params.model, dependencies));
});

// Match endpoint to loaded endpoints and process
router.get('/api/:endpoint', function (req, res, next) {
    if (api.hasEndpoint(req.params.endpoint)) {
        res.json(api.fetch(req.params.endpoint, req.query));
    } else {
        res.json('endpoint: ' + req.params.endpoint + ' NOT found.');
    }
});
// Generates a dataset and returns it immediately.  Does not create an endpoint
// Uses a user-provided model
router.post('/api/generate/:count', function (req, res, next) {
    res.json(generator.fromConfig(req.body.config, req.params.count));
});
// Generates a dataset and returns it immediately.  Does not create an endpoint.
// Uses a predefined model on the server
router.get('/api/generate/:model/:count', function (req, res, next) {
    res.json(generator.fromKey(req.params.model, +req.params.count));
});

module.exports = router;