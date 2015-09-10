var path = require('path'),
    read = require('fs-readdir-recursive'),
    _initializersPath = path.join(__dirname, 'initializers');

read(_initializersPath).map(function (file) {
    return require('./initializers/' + file)();
});