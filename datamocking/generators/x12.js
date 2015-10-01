var dateGenerator = require('./dates');
var _transactionId = 0,
    _importId = 1000;

module.exports = {
    __key: 'x12:'
};
module.exports['x12:import'] = x12Import;
module.exports['x12:transaction'] = x12Transaction;
module.exports['x12:validationError'] = x12ValidationError;
module.exports['x12:transactionDetail'] = x12TransactionDetail;

function importId() {
    var num = Math.floor(Math.random() * 5000000000).toString().pad(11, '0');
    return 'TR.NYHBE.834A.D.' + num + '.001.dat';
}

function transactionId() {
    return _transactionId += 7;
}
function importId2() {
    return _importId += 21;
}

function x12Import(dependencies) {
    var parsingErrors = Math.floor(Math.random() * 7);
    var _import = {
        InterchangeId: importId2(),
        Filename: '834.edi',
        IdentifierCode: '834',
        FunctionalIdCode: 'BE',
        Date: dateGenerator['date:random'](-60, 0),
        ControlNumber: '35417',
        Version: '005010X220A1',
        TransactionCount: 0,
        ValidationErrorCount: 0,
        //ParsingErrorCount: parsingErrors,
        schema: 'x834'
    };
    _import.Status = hasErrors(_import) ? 'E' : 'V';
    _import.StatusDescription = hasErrors(_import) ? 'Error' : 'Valid';

    return _import;
}

function x12Transaction(dependencies) {
    var _import,
        transaction,
        id = transactionId();

    _import = dependencies.imports[dependencies.InterchangeIds.randomValue()];

    transaction = {
        Id: id,
        transactionId: id,
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
    //_transaction.StatusDescription = hasErrors(_transaction) ? 'Error' : 'Valid';
    _transaction.StatusDescription = ['ConditionalErrorHold', 'ConditionalError', 'Error', 'ErrorHold', 'HeldEvent'].randomValue();
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

function x12TransactionDetail() {
    return {
        Interchange: 'ISA*00*          *00*          *ZZ*NYHBEAPTCPP    *ZZ*71644          *150220*0538*^*00501*000035515*1*P*|~\n\r' +
            '  GS*BE*NYHBEAPTCPP*71644*20150220*0538*35515*X*005010X220A1~\n\r' +
        '    ST*834*0003*005010X220A1~\n\r' +
        '      BGN*00*ET000083834630*20150220*003812****2~\n\r' +
        '      QTY*TO*2~\n\r' +
        '      N1*P5*APTCPP*FI*113434265~\n\r' +
        '      N1*IN*FREELANCERS HEALTH SERVICE CORPORATION DBA HEALTH REPUBLIC I*FI*453368051~\n\r' +
        '      INS*Y*18*001**A***AC**N~\n\r' +
        '        REF*0F*0000883741~\n\r' +
        '        REF*17*0000883741~\n\r' +
        '        REF*ABB*DK46224U~\n\r' +
        '        REF*3H*0000666366~\n\r' +
        '        DTP*300*D8*20150219~\n\r' +
        '        DTP*303*D8*20150219~\n\r' +
        '        DTP*356*D8*20150101~\n\r' +
        '        NM1*IL*1*ARREDONDO*MARIO*ALFREDO**SR*34*619125988~\n\r' +
        '          PER*IP**TE*9145768760*AP*9144697481~\n\r' +
        '          N3*78 REMINGTON PL~\n\r' +
        '          N4*NEW ROCHELLE*NY*10801**CY*36119~\n\r' +
        '          DMG*D8*19711103*M*M**1~\n\r' +
        '          LUI*LE*ENG**6~\n\r' +
        '          LUI*LE*ENG**7~\n\r' +
        '        HD*001**HLT*PRIMARYSELECT PCMH SILVER NS INN  DEP25 ACUPUNCTUR*ESP~\n\r' +
        '          DTP*348*D8*20150101~\n\r' +
        '          REF*CE*71644NY0040002-06~\n\r' +
        '          REF*1L*71644NY0040002-0000666366-0000883741-20150101~\n\r' +
        '        LS*2700~\n\r' +
        '          LX*1~\n\r' +
        '            N1*75*RATING AREA~\n\r' +
        '              REF*9X*4~\n\r' +
        '          LX*2~\n\r' +
        '            N1*75*SOURCE EXCHANGE ID~\n\r' +
        '              REF*17*NY0~\n\r' +
        '          LX*3~\n\r' +
        '            N1*75*REQUEST SUBMIT TIMESTAMP~\n\r' +
        '              REF*17*20150219121501~\n\r' +
        '          LX*4~\n\r' +
        '            N1*75*APTC AMT~\n\r' +
        '              REF*9V*626.66~\n\r' +
        '              DTP*007*D8*20150401~\n\r' +
        '          LX*5~\n\r' +
        '            N1*75*TOT RES AMT~\n\r' +
        '              REF*9V*0.00~\n\r' +
        '              DTP*007*D8*20150401~\n\r' +
        '          LX*6~\n\r' +
        '            N1*75*PRE AMT TOT~\n\r' +
        '              REF*9X*808.31~\n\r' +
        '              DTP*007*D8*20150401~\n\r' +
        '          LX*7~\n\r' +
        '            N1*75*OTH PAY AMT 1~\n\r' +
        '              REF*9V*181.65~\n\r' +
        '              DTP*007*D8*20150401~\n\r' +
        '          LX*8~\n\r' +
        '            N1*75*CSR AMT~\n\r' +
        '              REF*9V*250.58~\n\r' +
        '              DTP*007*D8*20150101~\n\r' +
        '          LX*9~\n\r' +
        '            N1*75*AID CAT CODE~\n\r' +
        '              REF*17*H2~\n\r' +
        '              DTP*007*D8*20150101~\n\r' +
        '          LE*2700~\n\r' +
        '      INS*N*01*001**A*****N~\n\r' +
        '        REF*0F*0000883741~\n\r' +
        '        REF*17*0001503783~\n\r' +
        '        REF*ABB*CB63895N~\n\r' +
        '        REF*3H*0000666366~\n\r' +
        '        DTP*300*D8*20150219~\n\r' +
        '        DTP*303*D8*20150219~\n\r' +
        '        DTP*356*D8*20150101~\n\r' +
        '        NM1*IL*1*ARREDONDO*MARISELA****34*552418773~\n\r' +
        '          DMG*D8*19720519*F~\n\r' +
        '        HD*001**HLT*PRIMARYSELECT PCMH SILVER NS INN  DEP25 ACUPUNCTUR~\n\r' +
        '          DTP*348*D8*20150101~\n\r' +
        '          REF*CE*71644NY0040002-06~\n\r' +
        '          REF*1L*71644NY0040002-0000666366-0000883741-20150101~\n\r' +
        '        LS*2700~\n\r' +
        '          LX*1~\n\r' +
        '            N1*75*SOURCE EXCHANGE ID~\n\r' +
        '              REF*17*NY0~\n\r' +
        '          LX*2~\n\r' +
        '            N1*75*REQUEST SUBMIT TIMESTAMP~\n\r' +
        '              REF*17*20150219121501~\n\r' +
        '          LX*3~\n\r' +
        '            N1*75*AID CAT CODE~\n\r' +
        '              REF*17*H2~\n\r' +
        '              DTP*007*D8*20150101~\n\r' +
        '          LE*2700~\n\r' +
        '    SE*86*0003~\n\r' +
        '  GE*1*35515~\n\r' +
        'IEA*1*000035515'
    };
}

function hasErrors(item) {
    return item.ValidationErrorCount;
    //return item.ValidationErrorCount || item.ParsingErrorCount;
}