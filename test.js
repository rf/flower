var assert = require('assert');
var flower = require('./flower');

describe('flower', function () {
  describe('foreach', function () {
    it('works on arrays', function (done) {
      var seen = [];
      flower.each([1, 2, 3, 4], function (item, index, done) {
        seen.push(item);
        done();
      }, function (err) {
        assert.deepEqual(seen, [1, 2, 3, 4]);
        done(err);
      });
    });

    it('works on objects', function (done) {

      var seen = [];

      flower.each({foo: 'bar', baz: 'fiz'}, function (item, key, done) {
        seen.push([item, key]);
        done();
      }, function (err) {
        assert.deepEqual(seen, [['bar', 'foo'], ['fiz', 'baz']]);
        done(err);
      });
    });
  });

  it('allows other events to process', function (done) {
    var run = false;

    flower.each([1, 2, 3, 4], function (item, index, done) {
      done();
    }, function (err) {
      done(err);
      if (run === false) throw new Error("run not flipped");
    });

    setTimeout(function () { run = true; }, 0);
  });

  it('can be cancelled', function (done) {
    var each = flower.each([1, 2, 3, 4], function (item, index, done) {
      done();
    }, function (err) {
      assert(err.message === "ForEach operation cancelled");
      done();
    });

    setTimeout(function () { each.cancel(); }, 1);
  });
});
