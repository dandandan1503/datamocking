module.exports = {
    __key: 'date:'
};

module.exports['date:random'] = randomDate;
module.exports['date:randomFrom'] = randomDateFrom;


function randomDate(from, to) {
    from = +from || -31;
    to = +to || 0;

    var date = new Date();
    date.setHours(date.getHours() + randomIntFromInterval(from, to) * 24);

    return date;
}

function randomDateFrom(startDate, from, to) {
    from = +from || -31;
    to = +to || 0;

    var date = new Date(startDate);
    date.setHours(date.getHours() + randomIntFromInterval(from, to) * 24);

    return date;
}

function randomIntFromInterval(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}