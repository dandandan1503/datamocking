var fs = require('fs'),
    path = require('path'),
    _modulesPath = path.join(__dirname, 'generators'),
    _modelsPath = path.join(__dirname, 'models'),
    _modules = [],
    _models = [];

fs.readdirSync(_modulesPath).forEach(function(file) {
    _modules.push(require('./generators/' + file));
});
fs.readdirSync(_modelsPath).forEach(function(file) {
    _models.push(require('./models/' + file));
});


module.exports = {
    fromConfig: fromConfig,
    fromKey: fromKey
};

function fromKey(key, count, dependencies) {
    var config = {};
    _models.forEach(function(model) {
        if(model.__key.toLowerCase() === key.toLowerCase()) {
            config = model.config;
        }
    });
    return fromConfig(config, count, dependencies);
}

function fromConfig(config, count, dependencies) {
    var data = [];

    for (var i = 0; i < count; i++) {
        data.push(generateRow(config, dependencies));
    }

    return data;
}

function generateRow(config, dependencies) {
    var data = {},
        collectionRegex = new RegExp(/\[([^]+)\]/),
        generate = function(key) {
            if (typeof(config[key]) === 'string') {
                return generateItem(config[key], dependencies);
            } else {
                return generateRow(config[key], dependencies);
            }
        };
    if (typeof(config) === 'string') {
        return generateItem(config, dependencies);
    } else if (typeof(config) !== 'object') {
        return;
    } else {
        for (var key in config) {
            var isCollection = collectionRegex.test(key);
            if(isCollection) {
                var count,
                    collection = [],
                    match = collectionRegex.exec(key),
                    modelKey = key.replace(collectionRegex, '');
                if(match[1].indexOf('-')) {
                    var boundaries = match[1].split('-').map(function (num) {
                        return +num;
                    }).sort(function (a, b) {
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                        return 0;
                    });
                    count = Math.floor(Math.random() * (boundaries[1] - boundaries[0] + 1)) + boundaries[0];

                } else {
                    count = +match;
                }

                for(var i = 0; i < count; i++) {
                    collection.push(generate(key));
                }

                data[modelKey] = collection;
            } else {
                data[key] = generate(key);
            }
        }
    }
    return data;
}

function generateItem(type, dependencies) {
    var fn = function() {},
        typeParts = type.split('|'),
        type = typeParts[0],
        typeParams = [];
    if(typeParts.length > 1) {
        typeParams = typeParts.slice(1, typeParts.length);
    }

    _modules.forEach(function(module) {
        if (type.toLowerCase().indexOf(module.__key) > -1) {
            fn = module[type];
            var deps = fn.processDependencies ? fn.processDependencies(dependencies) : dependencies;
            fn = fn.bind(null, deps);
        }
    });
    return fn.apply(null, typeParams);
}