var gog = require('../main')
var test = require('tape')

test('Initialize Engine', function (t) {
    t.plan(1);

    var gogol = new gog.Engine();
    t.equal(typeof gogol.version, 'string');
});
