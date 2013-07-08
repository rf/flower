module.exports = (function () {

function nextTick (cb) { setTimeout(cb, 0); }

function ForEach (collection, iterator, done) {
  var self = this;

  if (!(this instanceof ForEach)) {
    return new ForEach(collection, iterator, done);
  }

  self._done = done || function () {};
  if (Array.isArray(collection)) {
    self._array = true;
    self._count = collection.length;
  }
  
  else {
    self._array = false;
    self._keys = Object.keys(collection);
    self._count = self._keys.length;
  }

  self._iterator = iterator;
  self._collection = collection;
  self._done = done;
  self._cancelled = false;

  self.iterate(0, done);
}

// ## iterate
// performs a single iteration
ForEach.prototype.iterate = function (num, callback) {
  var self = this;

  var index = self._array? num : self._keys[num];

  if (self._cancelled) callback(new Error("ForEach operation cancelled"));

  else self._iterator(self._collection[index], index, function (err) {
    if (err) return callback(err);
    else {
      num += 1;

      if (num >= self._count) callback();
      else nextTick(function () { self.iterate(num, callback); });
    }
  });
};

// ## cancel
// Cancels the iteration
ForEach.prototype.cancel = function () {
  var self = this;

  self._cancelled = true;
};

return {
  nextTick: nextTick,
  forEach: ForEach,
  foreach: ForEach,
  each: ForEach
};

}());
