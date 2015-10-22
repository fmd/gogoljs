var gogol = require('../main')
var test = require('tape')

test('Initialize Engine', function (t) {
    t.plan(1);

    gogol.init('gogol-test-canvas')
    t.equal(typeof gogol.engine, 'Object');
});
