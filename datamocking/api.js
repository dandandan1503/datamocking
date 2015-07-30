var generator = require('./generator');

module.exports = api();

function api() {
    var _endpoints = {};

    return {
        addEndpoint: addEndpoint,
        allEndpoints: allEndpoints,
        fetch: fetch,
        hasEndpoint: hasEndpoint
    };
    // Adds an endpoint to the api.  If one already exists with the requested name, adds endpoint_[n]
    function addEndpoint(endpoint, count, config, dependencies) {
        var $endpoint = endpoint,
            i = 0,
            data,
            deps = [];
        count = +count || 15;
        while (hasEndpoint($endpoint)) {
            $endpoint = endpoint + '_' + ++i;
        }
        dependencies.forEach(function(dependency) {
            if(!_endpoints[dependency]) {
                return;
            }
            deps.push(_endpoints[dependency]);
        });
        if (typeof(config) === 'string') {
            data = generator.fromKey(config, count, deps);
        } else {
            data = generator.fromConfig(config, count, deps);
        }
        _endpoints[$endpoint] = {
            data: data,
            config: config
        };

        return $endpoint;
    }

    // Returns a list of all currently available endpoints
    function allEndpoints() {
        var endpoints = [];
        for (var endpoint in _endpoints) {
            if (!_endpoints.hasOwnProperty(endpoint)) {
                continue;
            }
            endpoints.push(endpoint);
        }
        return endpoints;
    }

    // Retrieves content of an endpoint.  Supports paging and basic filtering by field.
    // Good for prototyping before a dataservice is available
    ////{
    ////    page: 1,
    ////    rowsPerPage: 15,
    ////    state: 'GA'
    ////}
    function fetch(endpoint, params) {
        var data = _endpoints[endpoint].data;
        var _params = {
            page: +params.page || 1,
            rowsPerPage: +params.rowsPerPage || 15
        };
        for (var key in params) {
            if (!params.hasOwnProperty(key) || ['page', 'rowsPerPage'].indexOf(key) !== -1) {
                continue;
            }
            var keyParts = key.split('.');
            data = data.filter(function (row) {
                var $model = row,
                    $compareParams;
                for (var i = 0; i < keyParts.length; i++) {
                    if (!$model) {
                        return false;
                    }
                    $compareParams = keyParts[i].split('|');
                    $model = $model[$compareParams[0]];
                }
                if(!$model) {
                    return;
                }
                if($compareParams[1] === 'strict') {
                    return $model.toString() == params[key];
                }
                return $model.toString().toLowerCase().indexOf(params[key].toLowerCase()) > -1;
            });
        }
        return {
            data: data.slice((_params.page - 1) * _params.rowsPerPage, _params.rowsPerPage + (_params.page - 1) * _params.rowsPerPage),
            page: _params.page,
            rowsPerPage: _params.rowsPerPage,
            numRows: data.length,
            numPages: Math.ceil(data.length / _params.rowsPerPage)
        };
    }

    function hasEndpoint(endpoint) {
        return !!_endpoints[endpoint];
    }
}