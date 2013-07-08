# flower

I needed some specific features in a flow control library so I decided to just
write my own. In particular, I need interruptable iteration. UI events need to
be able to be processed in the middle of iteration and I need a way to
cancel iteration.

## Installation

    $ tipm install russfrank/flower

## API

### `forEach(collection, iterator(item, index, next), done)`

Aliases: `foreach`, `each`. Iterates over the given collection asynchronously.
The returned object has a method `cancel()` which can be used to cancel the
operation. Each iteration is run on the next tick of the event loop, allowing
UI events to be processed inbetween iterations.

```javascript
var flower = require('russfrank/flower');

var each = flower.each([1, 2, 3, 4], function (item, index, done) {
  done();
}, function (err) {
  // err will be Error("ForEach operation cancelled");
});

setTimeout(function () { each.cancel(); }, 1);
```

## test

    $ mocha

## License

  MIT
