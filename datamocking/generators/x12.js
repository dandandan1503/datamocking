var dateGenerator = require('./dates');
var _transactionId = 0;

module.exports = {
    __key: 'x12:'
};
module.exports['x12:import'] = x12Import;
module.exports['x12:transaction'] = x12Transaction;
module.exports['x12:validationError'] = x12ValidationError;

function importId() {
    var num = Math.floor(Math.random() * 5000000000).toString().pad(11, '0');
    return 'TR.NYHBE.834A.D.' + num + '.001.dat';
}

function transactionId() {
    return _transactionId += 7;
}

function x12Import(dependencies) {
    var parsingErrors = Math.floor(Math.random() * 7);
    var _import = {
        InterchangeId: importId(),
        Filename: '834.edi',
        IdentifierCode: '834',
        FunctionalIdCode: 'BE',
        Date: dateGenerator['date:random'](-60, 0),
        ControlNumber: '35417',
        Version: '005010X220A1',
        TransactionCount: 0,
        ValidationErrorCount: 0,
        ParsingErrorCount: parsingErrors,
        schema: 'x834'
    };
    _import.Status = hasErrors(_import) ? 'E' : 'V';
    _import.StatusDescription = hasErrors(_import) ? 'Error' : 'Valid';

    return _import;
}

function x12Transaction(dependencies) {
    var _import,
        transaction;

    _import = dependencies.imports[dependencies.InterchangeIds.randomValue()];
    transaction = {
        Id: transactionId(),
        InterchangeId: _import.InterchangeId,
        InterchangeDate: dateGenerator['date:randomFrom'](_import.Date, -10),
        InterchangeControlNumber: '000035417',
        FunctionalGroupControlNumber: '35417',
        FunctionalGroupId: 1336,
        FunctionalIdCode: 'BE',
        ReceiverId: '71644',
        SenderId: 'NYHBEAPTCPP',
        ValidationErrorCount: 0,
        ControlNumber: '35417',
        Version: '005010X220A1',
        schema: 'x834'
    };

    _import.TransactionCount++;

    return transaction;
}
x12Transaction.processDependencies = function (dependencies) {
    var data = {
        imports: {},
        InterchangeIds: []
    };
    if(!(dependencies instanceof Array)) {
        throw 'Missing dependency - x12Import';
    }
    if(dependencies[0].config !== 'x12Import') {
        throw 'Dependency must be specified as x12Import';
    }
    dependencies[0].data.forEach(function (dependency) {
        data.imports[dependency.InterchangeId] = dependency;
        data.InterchangeIds.push(dependency.InterchangeId);
    });
    return data;
};

function x12ValidationError(data) {
    var transactionId = data.TransactionIds.randomValue(),
        _transaction = data.transactions[transactionId],
        _import = data.imports[_transaction.InterchangeId];

    var validationError = {
        InterchangeId: _import.InterchangeId,
        PositionInInterchange: 0,
        TransactionSetId: transactionId,
        SegmentID: 'N1',
        SegmentColumn: '02',
        Message: 'There was an error with a thing',
        Segment: ['ABC123', 'DEF456'].randomValue(),
        interchangeId: _import.InterchangeId,
        transactionId: transactionId,
        schema: 'x834'
    };

    _import.ValidationErrorCount++;
    _import.Status = hasErrors(_import) ? 'E' : 'V';
    _import.StatusDescription = hasErrors(_import) ? 'Error' : 'Valid';
    _transaction.ValidationErrorCount++;
    _transaction.Status = hasErrors(_transaction) ? 'E' : 'V';
    _transaction.StatusDescription = hasErrors(_transaction) ? 'Error' : 'Valid';

    return validationError;
}
x12ValidationError.processDependencies = function(dependencies) {
    var importDependency,
        transactionDependency,
        data = {
            TransactionIds: [],
            imports: {},
            transactions: {}
        };

    dependencies.forEach(function(dep) {
        switch(dep.config) {
            case 'x12Import':
                importDependency = dep;
                break;
            case 'x12Transaction':
                transactionDependency = dep;
                break;
        }
    });

    if(!importDependency || !transactionDependency) {
        throw 'Missing dependency';
    }
    importDependency.data.forEach(function (dependency) {
        data.imports[dependency.InterchangeId] = dependency;
    });
    transactionDependency.data.forEach(function (dependency) {
        data.transactions[dependency.Id] = dependency;
        data.TransactionIds.push(dependency.Id);
    });

    return data;
};

function hasErrors(item) {
    return item.ValidationErrorCount || item.ParsingErrorCount;
}