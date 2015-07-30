module.exports = {
    __key: 'pin:'
};
module.exports['pin:ssn'] = socialSecurityNumber;

function socialSecurityNumber() {
    var parts = [
            Math.floor(Math.random() * 739) + 1 + '',
            Math.floor(Math.random() * 98) + 1 + '',
            Math.floor(Math.random() * 9998) + 1 + ''
        ],
        partLengths = [3, 2, 4];

    var processPart = function(part, index, parts) {
        while(parts[index].length < partLengths[index]) {
            parts[index] = '0' + parts[index];
        }
    };

    parts.forEach(processPart);

    return parts.join('-');
}