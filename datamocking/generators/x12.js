module.exports = {
    __key: 'x12:'
};
module.exports['x12:import'] = x12Import;
module.exports['x12:transaction'] = x12Transaction;

function importId() {
    var num = Math.floor(Math.random() * 5000000000).toString().pad(11, '0');
    return 'TR.NYHBE.834A.D.' + num + '.001.dat';
}

function x12Import(dependencies) {
    return {
        importId: importId(),
        spec: '834',
        transactionCount: 0,
        errorCount: 0,
        status: 'Valid'
    }
}

function x12Transaction(dependencies) {
    var _import,
        transaction;

    _import = dependencies.imports[dependencies.importIds.randomValue()];
    transaction = {
        importId: _import.importId,
        transactionNumber: Math.floor(Math.random() * 9999).toString().pad(4, '0'),
        errorCount: Math.floor(Math.random() * 10),
        controlNumber: '35417',
        version: '005010X220A1'
    };
    transaction.status = transaction.errorCount ? 'Error' : 'Valid';
    _import.errorCount += transaction.errorCount;
    _import.status = _import.errorCount ? 'Error' : 'Valid';
    _import.transactionCount++;

    return transaction;
}
x12Transaction.processDependencies = function (dependencies) {
    var data = {
        imports: {},
        importIds: []
    };
    if(!(dependencies instanceof Array)) {
        throw 'Missing dependency - x12Import';
    }
    if(dependencies[0].config !== 'x12Import') {
        throw 'Dependency must be specified as x12Import';
    }
    dependencies[0].data.forEach(function (dependency) {
        data.imports[dependency.importId] = dependency;
        data.importIds.push(dependency.importId);
    });
    return data;
};