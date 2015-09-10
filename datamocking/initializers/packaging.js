var api = require('../api');

module.exports = initialize;

function initialize() {
    api.addEndpoint('packaging-users', 100, 'packagingUser', []);
    api.addEndpoint('packaging-root-categories', 5, 'packagingRootCategory', []);
    api.addEndpoint('packaging-category-items', 1500, 'packagingCategoryItem', ['packaging-users', 'packaging-root-categories']);
}