var gog = require('../main')
var test = require('tape')

test('Initialize Scene', function (t) {
    t.plan(1);

    var scene = new gog.Scene();
    t.equal(typeof scene.name, 'string');
});