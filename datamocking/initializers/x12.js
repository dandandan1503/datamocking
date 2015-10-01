var api = require('../api');

module.exports = initialize;

function initialize() {
    api.addEndpoint('x12-834-imports', 37, 'x12Import', []);
    api.addEndpoint('x12-834-transactions', 400, 'x12Transaction', ['x12-834-imports']);
    api.addEndpoint('x12-834-validationErrors', 900, 'x12validationError', ['x12-834-imports', 'x12-834-transactions']);
    api.addEndpoint('x12-834-transaction-details', 1, 'x12TransactionDetail', []);
}