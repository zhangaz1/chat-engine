(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = once;
function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onlyOnce;
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];
},{}],3:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],4:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":12,"./_toSource":17,"./isFunction":21,"./isObject":22}],5:[function(require,module,exports){
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./_overRest":13,"./_setToString":15,"./identity":19}],6:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":8,"./constant":18,"./identity":19}],7:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":14}],8:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":10}],9:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":4,"./_getValue":11}],11:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],12:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":7}],13:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":3}],14:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":9}],15:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":6,"./_shortOut":16}],16:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 500,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],17:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],18:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],19:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],20:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],21:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./isObject":22}],22:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],23:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tasks, callback) {
    callback = (0, _once2.default)(callback || _noop2.default);
    if (!(0, _isArray2.default)(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
    if (!tasks.length) return callback();
    var taskIndex = 0;

    function nextTask(args) {
        if (taskIndex === tasks.length) {
            return callback.apply(null, [null].concat(args));
        }

        var taskCallback = (0, _onlyOnce2.default)((0, _baseRest2.default)(function (err, args) {
            if (err) {
                return callback.apply(null, [err].concat(args));
            }
            nextTask(args);
        }));

        args.push(taskCallback);

        var task = tasks[taskIndex++];
        task.apply(null, args);
    }

    nextTask([]);
};

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _once = require('./internal/once');

var _once2 = _interopRequireDefault(_once);

var _baseRest = require('lodash/_baseRest');

var _baseRest2 = _interopRequireDefault(_baseRest);

var _onlyOnce = require('./internal/onlyOnce');

var _onlyOnce2 = _interopRequireDefault(_onlyOnce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Runs the `tasks` array of functions in series, each passing their results to
 * the next in the array. However, if any of the `tasks` pass an error to their
 * own callback, the next function is not executed, and the main `callback` is
 * immediately called with the error.
 *
 * @name waterfall
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array} tasks - An array of functions to run, each function is passed
 * a `callback(err, result1, result2, ...)` it must call on completion. The
 * first argument is an error (which can be `null`) and any further arguments
 * will be passed as arguments in order to the next task.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This will be passed the results of the last task's
 * callback. Invoked with (err, [results]).
 * @returns undefined
 * @example
 *
 * async.waterfall([
 *     function(callback) {
 *         callback(null, 'one', 'two');
 *     },
 *     function(arg1, arg2, callback) {
 *         // arg1 now equals 'one' and arg2 now equals 'two'
 *         callback(null, 'three');
 *     },
 *     function(arg1, callback) {
 *         // arg1 now equals 'three'
 *         callback(null, 'done');
 *     }
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 *
 * // Or, with named functions:
 * async.waterfall([
 *     myFirstFunction,
 *     mySecondFunction,
 *     myLastFunction,
 * ], function (err, result) {
 *     // result now equals 'done'
 * });
 * function myFirstFunction(callback) {
 *     callback(null, 'one', 'two');
 * }
 * function mySecondFunction(arg1, arg2, callback) {
 *     // arg1 now equals 'one' and arg2 now equals 'two'
 *     callback(null, 'three');
 * }
 * function myLastFunction(arg1, callback) {
 *     // arg1 now equals 'three'
 *     callback(null, 'done');
 * }
 */
},{"./internal/once":1,"./internal/onlyOnce":2,"lodash/_baseRest":5,"lodash/isArray":20,"lodash/noop":23}],25:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],26:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PubNub=t():e.PubNub=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){return!(!navigator||!navigator.sendBeacon)&&void navigator.sendBeacon(e)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),c=r(u),l=(n(13),{get:function(e){try{return localStorage.getItem(e)}catch(e){return null}},set:function(e,t){try{return localStorage.setItem(e,t)}catch(e){return null}}}),h=function(e){function t(e){i(this,t),e.db=l,e.sendBeacon=a,e.sdkFamily="Web";var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return window.addEventListener("offline",function(){n._listenerManager.announceNetworkDown(),n.stop()}),window.addEventListener("online",function(){n._listenerManager.announceNetworkUp(),n.reconnect()}),n}return s(t,e),t}(c.default);t.default=h,e.exports=t.default},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(2),u=i(a),c=n(4),l=i(c),h=n(12),f=i(h),p=n(11),d=i(p),g=n(17),y=i(g),v=n(18),b=i(v),_=n(23),m=i(_),k=n(24),P=r(k),w=n(25),S=r(w),O=n(26),C=r(O),M=n(27),T=r(M),x=n(28),E=r(x),N=n(29),R=r(N),K=n(30),A=r(K),j=n(31),D=r(j),G=n(32),U=r(G),B=n(33),I=r(B),H=n(34),L=r(H),q=n(35),z=r(q),F=n(36),X=r(F),W=n(37),J=r(W),V=n(38),$=r(V),Q=n(39),Y=r(Q),Z=n(40),ee=r(Z),te=n(41),ne=r(te),re=n(42),ie=r(re),oe=n(20),se=r(oe),ae=n(43),ue=r(ae),ce=n(14),le=i(ce),he=n(21),fe=i(he),pe=n(16),de=i(pe),ge=(n(13),function(){function e(t){var n=this;o(this,e);var r=t.sendBeacon,i=t.db,s=this._config=new f.default({setup:t,db:i}),a=new d.default({config:s}),u=new l.default({config:s,crypto:a,sendBeacon:r}),c={config:s,networking:u,crypto:a},h=this._listenerManager=new b.default,p=m.default.bind(this,c,se),g=m.default.bind(this,c,I),v=m.default.bind(this,c,z),_=m.default.bind(this,c,J),k=m.default.bind(this,c,ue),w=new y.default({timeEndpoint:p,leaveEndpoint:g,heartbeatEndpoint:v,setStateEndpoint:_,subscribeEndpoint:k,crypto:c.crypto,config:c.config,listenerManager:h});this.addListener=h.addListener.bind(h),this.removeListener=h.removeListener.bind(h),this.removeAllListeners=h.removeAllListeners.bind(h),this.channelGroups={listGroups:m.default.bind(this,c,T),listChannels:m.default.bind(this,c,E),addChannels:m.default.bind(this,c,P),removeChannels:m.default.bind(this,c,S),deleteGroup:m.default.bind(this,c,C)},this.push={addChannels:m.default.bind(this,c,R),removeChannels:m.default.bind(this,c,A),deleteDevice:m.default.bind(this,c,U),listChannels:m.default.bind(this,c,D)},this.hereNow=m.default.bind(this,c,$),this.whereNow=m.default.bind(this,c,L),this.getState=m.default.bind(this,c,X),this.setState=w.adaptStateChange.bind(w),this.grant=m.default.bind(this,c,ee),this.audit=m.default.bind(this,c,Y),this.publish=m.default.bind(this,c,ne),this.fire=function(e,t){e.replicate=!1,e.storeInHistory=!1,n.publish(e,t)},this.history=m.default.bind(this,c,ie),this.time=p,this.subscribe=w.adaptSubscribeChange.bind(w),this.unsubscribe=w.adaptUnsubscribeChange.bind(w),this.reconnect=w.reconnect.bind(w),this.stop=function(){w.unsubscribeAll(),w.disconnect()},this.unsubscribeAll=w.unsubscribeAll.bind(w),this.getSubscribedChannels=w.getSubscribedChannels.bind(w),this.getSubscribedChannelGroups=w.getSubscribedChannelGroups.bind(w),this.encrypt=a.encrypt.bind(a),this.decrypt=a.decrypt.bind(a),this.getAuthKey=c.config.getAuthKey.bind(c.config),this.setAuthKey=c.config.setAuthKey.bind(c.config),this.setCipherKey=c.config.setCipherKey.bind(c.config),this.getUUID=c.config.getUUID.bind(c.config),this.setUUID=c.config.setUUID.bind(c.config),this.getFilterExpression=c.config.getFilterExpression.bind(c.config),this.setFilterExpression=c.config.setFilterExpression.bind(c.config)}return s(e,[{key:"getVersion",value:function(){return le.default.version}}],[{key:"generateUUID",value:function(){return u.default.v4()}}]),e}());ge.OPERATIONS=fe.default,ge.CATEGORIES=de.default,t.default=ge,e.exports=t.default},function(e,t,n){function r(e,t,n){var r=t&&n||0,i=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){i<16&&(t[r+i++]=c[e])});i<16;)t[r+i++]=0;return t}function i(e,t){var n=t||0,r=u;return r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]}function o(e,t,n){var r=t&&n||0,o=t||[];e=e||{};var s=void 0!==e.clockseq?e.clockseq:p,a=void 0!==e.msecs?e.msecs:(new Date).getTime(),u=void 0!==e.nsecs?e.nsecs:g+1,c=a-d+(u-g)/1e4;if(c<0&&void 0===e.clockseq&&(s=s+1&16383),(c<0||a>d)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");d=a,g=u,p=s,a+=122192928e5;var l=(1e4*(268435455&a)+u)%4294967296;o[r++]=l>>>24&255,o[r++]=l>>>16&255,o[r++]=l>>>8&255,o[r++]=255&l;var h=a/4294967296*1e4&268435455;o[r++]=h>>>8&255,o[r++]=255&h,o[r++]=h>>>24&15|16,o[r++]=h>>>16&255,o[r++]=s>>>8|128,o[r++]=255&s;for(var y=e.node||f,v=0;v<6;v++)o[r+v]=y[v];return t?t:i(o)}function s(e,t,n){var r=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var o=e.random||(e.rng||a)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var s=0;s<16;s++)t[r+s]=o[s];return t||i(o)}for(var a=n(3),u=[],c={},l=0;l<256;l++)u[l]=(l+256).toString(16).substr(1),c[u[l]]=l;var h=a(),f=[1|h[0],h[1],h[2],h[3],h[4],h[5]],p=16383&(h[6]<<8|h[7]),d=0,g=0,y=s;y.v1=o,y.v4=s,y.parse=r,y.unparse=i,e.exports=y},function(e,t){(function(t){var n,r=t.crypto||t.msCrypto;if(r&&r.getRandomValues){var i=new Uint8Array(16);n=function(){return r.getRandomValues(i),i}}if(!n){var o=new Array(16);n=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}e.exports=n}).call(t,function(){return this}())},function(e,t,n){(function(r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(6),u=i(a),c=n(11),l=(i(c),n(12)),h=(i(l),n(16)),f=i(h),p=(n(13),function(){function e(t){var n=t.config,r=t.crypto,i=t.sendBeacon;o(this,e),this._config=n,this._crypto=r,this._sendBeacon=i,this._maxSubDomain=20,this._currentSubDomain=Math.floor(Math.random()*this._maxSubDomain),this._providedFQDN=(this._config.secure?"https://":"http://")+this._config.origin,this._coreParams={},this.shiftStandardOrigin()}return s(e,[{key:"nextOrigin",value:function(){if(this._providedFQDN.indexOf("pubsub.")===-1)return this._providedFQDN;var e=void 0;return this._currentSubDomain=this._currentSubDomain+1,this._currentSubDomain>=this._maxSubDomain&&(this._currentSubDomain=1),e=this._currentSubDomain.toString(),this._providedFQDN.replace("pubsub","ps"+e)}},{key:"shiftStandardOrigin",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._standardOrigin=this.nextOrigin(e),this._standardOrigin}},{key:"getStandardOrigin",value:function(){return this._standardOrigin}},{key:"POST",value:function(e,t,n,r){var i=u.default.post(this.getStandardOrigin()+n.url).query(e).send(t);return this._abstractedXDR(i,n,r)}},{key:"GET",value:function(e,t,n){var r=u.default.get(this.getStandardOrigin()+t.url).query(e);return this._abstractedXDR(r,t,n)}},{key:"_abstractedXDR",value:function(e,t,n){var r=this;return this._config.logVerbosity&&(e=e.use(this._attachSuperagentLogger)),e.timeout(t.timeout).end(function(e,i){var o={};if(o.error=null!==e,o.operation=t.operation,i&&i.status&&(o.statusCode=i.status),e)return o.errorData=e,o.category=r._detectErrorCategory(e),n(o,null);var s=JSON.parse(i.text);return n(o,s)})}},{key:"_detectErrorCategory",value:function(e){if("ENOTFOUND"===e.code)return f.default.PNNetworkIssuesCategory;if(0===e.status||e.hasOwnProperty("status")&&"undefined"==typeof e.status)return f.default.PNNetworkIssuesCategory;if(e.timeout)return f.default.PNTimeoutCategory;if(e.response){if(e.response.badRequest)return f.default.PNBadRequestCategory;if(e.response.forbidden)return f.default.PNAccessDeniedCategory}return f.default.PNUnknownCategory}},{key:"_attachSuperagentLogger",value:function(e){var t=function(){return r&&r.log?r:window&&window.console&&window.console.log?window.console:r},n=(new Date).getTime(),i=(new Date).toISOString(),o=t();o.log("<<<<<"),o.log("["+i+"]","\n",e.url,"\n",e.qs),o.log("-----"),e.on("response",function(t){var r=(new Date).getTime(),i=r-n,s=(new Date).toISOString();o.log(">>>>>>"),o.log("["+s+" / "+i+"]","\n",e.url,"\n",e.qs,"\n",t.text),o.log("-----")})}}]),e}());t.default=p,e.exports=t.default}).call(t,n(5))},function(e,t){},function(e,t,n){(function(t){function r(){}function i(e){if(!v(e))return e;var t=[];for(var n in e)o(t,n,e[n]);return t.join("&")}function o(e,t,n){if(null!=n)if(Array.isArray(n))n.forEach(function(n){o(e,t,n)});else if(v(n))for(var r in n)o(e,t+"["+r+"]",n[r]);else e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));else null===n&&e.push(encodeURIComponent(t))}function s(e){for(var t,n,r={},i=e.split("&"),o=0,s=i.length;o<s;++o)t=i[o],n=t.indexOf("="),n==-1?r[decodeURIComponent(t)]="":r[decodeURIComponent(t.slice(0,n))]=decodeURIComponent(t.slice(n+1));return r}function a(e){var t,n,r,i,o=e.split(/\r?\n/),s={};o.pop();for(var a=0,u=o.length;a<u;++a)n=o[a],t=n.indexOf(":"),r=n.slice(0,t).toLowerCase(),i=_(n.slice(t+1)),s[r]=i;return s}function u(e){return/[\/+]json\b/.test(e)}function c(e){return e.split(/ *; */).shift()}function l(e){return e.split(/ *; */).reduce(function(e,t){var n=t.split(/ *= */),r=n.shift(),i=n.shift();return r&&i&&(e[r]=i),e},{})}function h(e,t){t=t||{},this.req=e,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||"undefined"==typeof this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this._setStatusProperties(this.xhr.status),this.header=this.headers=a(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null}function f(e,t){var n=this;this._query=this._query||[],this.method=e,this.url=t,this.header={},this._header={},this.on("end",function(){var e=null,t=null;try{t=new h(n)}catch(t){return e=new Error("Parser is unable to parse the response"),e.parse=!0,e.original=t,e.rawResponse=n.xhr&&n.xhr.responseText?n.xhr.responseText:null,e.statusCode=n.xhr&&n.xhr.status?n.xhr.status:null,n.callback(e)}n.emit("response",t);var r;try{(t.status<200||t.status>=300)&&(r=new Error(t.statusText||"Unsuccessful HTTP response"),r.original=e,r.response=t,r.status=t.status)}catch(e){r=e}r?n.callback(r,t):n.callback(null,t)})}function p(e,t){var n=b("DELETE",e);return t&&n.end(t),n}var d;"undefined"!=typeof window?d=window:"undefined"!=typeof self?d=self:(t.warn("Using browser-only version of superagent in non-browser environment"),d=this);var g=n(7),y=n(8),v=n(9),b=e.exports=n(10).bind(null,f);b.getXHR=function(){if(!(!d.XMLHttpRequest||d.location&&"file:"==d.location.protocol&&d.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}throw Error("Browser-only verison of superagent could not find XHR")};var _="".trim?function(e){return e.trim()}:function(e){return e.replace(/(^\s*|\s*$)/g,"")};b.serializeObject=i,b.parseString=s,b.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},b.serialize={"application/x-www-form-urlencoded":i,"application/json":JSON.stringify},b.parse={"application/x-www-form-urlencoded":s,"application/json":JSON.parse},h.prototype.get=function(e){return this.header[e.toLowerCase()]},h.prototype._setHeaderProperties=function(e){var t=this.header["content-type"]||"";this.type=c(t);var n=l(t);for(var r in n)this[r]=n[r]},h.prototype._parseBody=function(e){var t=b.parse[this.type];return!t&&u(this.type)&&(t=b.parse["application/json"]),t&&e&&(e.length||e instanceof Object)?t(e):null},h.prototype._setStatusProperties=function(e){1223===e&&(e=204);var t=e/100|0;this.status=this.statusCode=e,this.statusType=t,this.info=1==t,this.ok=2==t,this.clientError=4==t,this.serverError=5==t,this.error=(4==t||5==t)&&this.toError(),this.accepted=202==e,this.noContent=204==e,this.badRequest=400==e,this.unauthorized=401==e,this.notAcceptable=406==e,this.notFound=404==e,this.forbidden=403==e},h.prototype.toError=function(){var e=this.req,t=e.method,n=e.url,r="cannot "+t+" "+n+" ("+this.status+")",i=new Error(r);return i.status=this.status,i.method=t,i.url=n,i},b.Response=h,g(f.prototype);for(var m in y)f.prototype[m]=y[m];f.prototype.type=function(e){return this.set("Content-Type",b.types[e]||e),this},f.prototype.responseType=function(e){return this._responseType=e,this},f.prototype.accept=function(e){return this.set("Accept",b.types[e]||e),this},f.prototype.auth=function(e,t,n){switch(n||(n={type:"basic"}),n.type){case"basic":var r=btoa(e+":"+t);this.set("Authorization","Basic "+r);break;case"auto":this.username=e,this.password=t}return this},f.prototype.query=function(e){return"string"!=typeof e&&(e=i(e)),e&&this._query.push(e),this},f.prototype.attach=function(e,t,n){return this._getFormData().append(e,t,n||t.name),this},f.prototype._getFormData=function(){return this._formData||(this._formData=new d.FormData),this._formData},f.prototype.callback=function(e,t){var n=this._callback;this.clearTimeout(),n(e,t)},f.prototype.crossDomainError=function(){var e=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");e.crossDomain=!0,e.status=this.status,e.method=this.method,e.url=this.url,this.callback(e)},f.prototype._timeoutError=function(){var e=this._timeout,t=new Error("timeout of "+e+"ms exceeded");t.timeout=e,this.callback(t)},f.prototype._appendQueryString=function(){var e=this._query.join("&");e&&(this.url+=~this.url.indexOf("?")?"&"+e:"?"+e)},f.prototype.end=function(e){var t=this,n=this.xhr=b.getXHR(),i=this._timeout,o=this._formData||this._data;this._callback=e||r,n.onreadystatechange=function(){if(4==n.readyState){var e;try{e=n.status}catch(t){e=0}if(0==e){if(t.timedout)return t._timeoutError();if(t._aborted)return;return t.crossDomainError()}t.emit("end")}};var s=function(e,n){n.total>0&&(n.percent=n.loaded/n.total*100),n.direction=e,t.emit("progress",n)};if(this.hasListeners("progress"))try{n.onprogress=s.bind(null,"download"),n.upload&&(n.upload.onprogress=s.bind(null,"upload"))}catch(e){}if(i&&!this._timer&&(this._timer=setTimeout(function(){t.timedout=!0,t.abort()},i)),this._appendQueryString(),this.username&&this.password?n.open(this.method,this.url,!0,this.username,this.password):n.open(this.method,this.url,!0),this._withCredentials&&(n.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof o&&!this._isHost(o)){var a=this._header["content-type"],c=this._serializer||b.serialize[a?a.split(";")[0]:""];!c&&u(a)&&(c=b.serialize["application/json"]),c&&(o=c(o))}for(var l in this.header)null!=this.header[l]&&n.setRequestHeader(l,this.header[l]);return this._responseType&&(n.responseType=this._responseType),this.emit("request",this),n.send("undefined"!=typeof o?o:null),this},b.Request=f,b.get=function(e,t,n){var r=b("GET",e);return"function"==typeof t&&(n=t,t=null),t&&r.query(t),n&&r.end(n),r},b.head=function(e,t,n){var r=b("HEAD",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},b.options=function(e,t,n){var r=b("OPTIONS",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},b.del=p,b.delete=p,b.patch=function(e,t,n){var r=b("PATCH",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},b.post=function(e,t,n){var r=b("POST",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r},b.put=function(e,t,n){var r=b("PUT",e);return"function"==typeof t&&(n=t,t=null),t&&r.send(t),n&&r.end(n),r}}).call(t,n(5))},function(e,t,n){function r(e){if(e)return i(e)}function i(e){for(var t in r.prototype)e[t]=r.prototype[t];return e}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},r.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+e];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var r,i=0;i<n.length;i++)if(r=n[i],r===t||r.fn===t){n.splice(i,1);break}return this},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),n=this._callbacks["$"+e];if(n){n=n.slice(0);for(var r=0,i=n.length;r<i;++r)n[r].apply(this,t)}return this},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},r.prototype.hasListeners=function(e){return!!this.listeners(e).length}},function(e,t,n){var r=n(9);t.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},t.parse=function(e){return this._parser=e,this},t.serialize=function(e){return this._serializer=e,this},t.timeout=function(e){return this._timeout=e,this},t.then=function(e,t){if(!this._fullfilledPromise){var n=this;this._fullfilledPromise=new Promise(function(e,t){n.end(function(n,r){n?t(n):e(r)})})}return this._fullfilledPromise.then(e,t)},t.catch=function(e){return this.then(void 0,e)},t.use=function(e){return e(this),this},t.get=function(e){return this._header[e.toLowerCase()]},t.getHeader=t.get,t.set=function(e,t){if(r(e)){for(var n in e)this.set(n,e[n]);return this}return this._header[e.toLowerCase()]=t,this.header[e]=t,this},t.unset=function(e){return delete this._header[e.toLowerCase()],delete this.header[e],this},t.field=function(e,t){if(null===e||void 0===e)throw new Error(".field(name, val) name can not be empty");if(r(e)){for(var n in e)this.field(n,e[n]);return this}if(null===t||void 0===t)throw new Error(".field(name, val) val can not be empty");return this._getFormData().append(e,t),this},t.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},t.withCredentials=function(){return this._withCredentials=!0,this},t.redirects=function(e){return this._maxRedirects=e,this},t.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},t._isHost=function(e){var t={}.toString.call(e);switch(t){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}},t.send=function(e){var t=r(e),n=this._header["content-type"];if(t&&r(this._data))for(var i in e)this._data[i]=e[i];else"string"==typeof e?(n||this.type("form"),n=this._header["content-type"],"application/x-www-form-urlencoded"==n?this._data=this._data?this._data+"&"+e:e:this._data=(this._data||"")+e):this._data=e;return!t||this._isHost(e)?this:(n||this.type("json"),this)}},function(e,t){function n(e){return null!==e&&"object"==typeof e}e.exports=n},function(e,t){function n(e,t,n){return"function"==typeof n?new e("GET",t).end(n):2==arguments.length?new e("GET",t):new e(t,n)}e.exports=n},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(12),a=(r(s),n(15)),u=r(a),c=function(){function e(t){var n=t.config;i(this,e),this._config=n,this._iv="0123456789012345",this._allowedKeyEncodings=["hex","utf8","base64","binary"],this._allowedKeyLengths=[128,256],this._allowedModes=["ecb","cbc"],this._defaultOptions={encryptKey:!0,keyEncoding:"utf8",keyLength:256,mode:"cbc"}}return o(e,[{key:"HMACSHA256",value:function(e){var t=u.default.HmacSHA256(e,this._config.secretKey);return t.toString(u.default.enc.Base64)}},{key:"SHA256",value:function(e){return u.default.SHA256(e).toString(u.default.enc.Hex)}},{key:"_parseOptions",value:function(e){var t=e||{};return t.hasOwnProperty("encryptKey")||(t.encryptKey=this._defaultOptions.encryptKey),t.hasOwnProperty("keyEncoding")||(t.keyEncoding=this._defaultOptions.keyEncoding),t.hasOwnProperty("keyLength")||(t.keyLength=this._defaultOptions.keyLength),t.hasOwnProperty("mode")||(t.mode=this._defaultOptions.mode),this._allowedKeyEncodings.indexOf(t.keyEncoding.toLowerCase())===-1&&(t.keyEncoding=this._defaultOptions.keyEncoding),this._allowedKeyLengths.indexOf(parseInt(t.keyLength,10))===-1&&(t.keyLength=this._defaultOptions.keyLength),this._allowedModes.indexOf(t.mode.toLowerCase())===-1&&(t.mode=this._defaultOptions.mode),t}},{key:"_decodeKey",value:function(e,t){return"base64"===t.keyEncoding?u.default.enc.Base64.parse(e):"hex"===t.keyEncoding?u.default.enc.Hex.parse(e):e}},{key:"_getPaddedKey",value:function(e,t){return e=this._decodeKey(e,t),t.encryptKey?u.default.enc.Utf8.parse(this.SHA256(e).slice(0,32)):e}},{key:"_getMode",value:function(e){return"ecb"===e.mode?u.default.mode.ECB:u.default.mode.CBC}},{key:"_getIV",value:function(e){return"cbc"===e.mode?u.default.enc.Utf8.parse(this._iv):null}},{key:"encrypt",value:function(e,t,n){if(!t&&!this._config.cipherKey)return e;n=this._parseOptions(n);var r=this._getIV(n),i=this._getMode(n),o=this._getPaddedKey(t||this._config.cipherKey,n),s=u.default.AES.encrypt(e,o,{iv:r,mode:i}).ciphertext,a=s.toString(u.default.enc.Base64);return a||e}},{key:"decrypt",value:function(e,t,n){if(!t&&!this._config.cipherKey)return e;n=this._parseOptions(n);var r=this._getIV(n),i=this._getMode(n),o=this._getPaddedKey(t||this._config.cipherKey,n);try{var s=u.default.enc.Base64.parse(e),a=u.default.AES.decrypt({ciphertext:s},o,{iv:r,mode:i}).toString(u.default.enc.Utf8),c=JSON.parse(a);return c}catch(e){return null}}}]),e}();t.default=c,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),a=r(s),u=(n(13),n(14)),c=r(u),l=function(){function e(t){var n=t.setup,r=t.db;i(this,e),this._db=r,this.instanceId=a.default.v4(),this.secretKey=n.secretKey,this.subscribeKey=n.subscribeKey,this.publishKey=n.publishKey,this.sdkFamily=n.sdkFamily,this.partnerId=n.partnerId,this.setAuthKey(n.authKey),this.setCipherKey(n.cipherKey),this.setFilterExpression(n.filterExpression),this.origin=n.origin||"pubsub.pubnub.com",this.secure=n.ssl||!1,"undefined"!=typeof location&&"https:"===location.protocol&&(this.secure=!0),this.logVerbosity=n.logVerbosity||!1,this.suppressLeaveEvents=n.suppressLeaveEvents||!1,this.announceFailedHeartbeats=n.announceFailedHeartbeats||!0,this.announceSuccessfulHeartbeats=n.announceSuccessfulHeartbeats||!1,this.useInstanceId=n.useInstanceId||!1,this.useRequestId=n.useRequestId||!1,this.setTransactionTimeout(n.transactionalRequestTimeout||15e3),this.setSubscribeTimeout(n.subscribeRequestTimeout||31e4),this.setSendBeaconConfig(n.useSendBeacon||!0),this.setPresenceTimeout(n.presenceTimeout||300),n.heartbeatInterval&&this.setHeartbeatInterval(n.heartbeatInterval),this.setUUID(this._decideUUID(n.uuid))}return o(e,[{key:"getAuthKey",value:function(){return this.authKey}},{key:"setAuthKey",value:function(e){return this.authKey=e,this}},{key:"setCipherKey",value:function(e){return this.cipherKey=e,this}},{key:"getUUID",value:function(){return this.UUID}},{key:"setUUID",value:function(e){return this._db&&this._db.set&&this._db.set(this.subscribeKey+"uuid",e),this.UUID=e,this}},{key:"getFilterExpression",value:function(){return this.filterExpression}},{key:"setFilterExpression",value:function(e){return this.filterExpression=e,this}},{key:"getPresenceTimeout",value:function(){return this._presenceTimeout}},{key:"setPresenceTimeout",value:function(e){return this._presenceTimeout=e,this.setHeartbeatInterval(this._presenceTimeout/2-1),this}},{key:"getHeartbeatInterval",value:function(){return this._heartbeatInterval}},{key:"setHeartbeatInterval",value:function(e){return this._heartbeatInterval=e,this}},{key:"getSubscribeTimeout",value:function(){return this._subscribeRequestTimeout}},{key:"setSubscribeTimeout",value:function(e){return this._subscribeRequestTimeout=e,this}},{key:"getTransactionTimeout",value:function(){return this._transactionalRequestTimeout}},{key:"setTransactionTimeout",value:function(e){return this._transactionalRequestTimeout=e,this}},{key:"isSendBeaconEnabled",value:function(){return this._useSendBeacon}},{key:"setSendBeaconConfig",value:function(e){return this._useSendBeacon=e,this}},{key:"getVersion",value:function(){return c.default.version}},{key:"_decideUUID",value:function(e){return e?e:this._db&&this._db.get&&this._db.get(this.subscribeKey+"uuid")?this._db.get(this.subscribeKey+"uuid"):a.default.v4()}}]),e}();t.default=l,e.exports=t.default},function(e,t){"use strict";e.exports={}},function(e,t){e.exports={name:"pubnub",preferGlobal:!1,version:"4.0.13",author:"PubNub <support@pubnub.com>",description:"Publish & Subscribe Real-time Messaging with PubNub",bin:{},scripts:{codecov:"cat coverage/lcov.info | codecov"},main:"./lib/node/index.js","react-native":"./lib/node/index.js",browser:"./dist/web/pubnub.min.js",repository:{type:"git",url:"git://github.com/pubnub/javascript.git"},keywords:["cloud","publish","subscribe","websockets","comet","bosh","xmpp","real-time","messaging"],dependencies:{superagent:"^2.3.0",uuid:"^2.0.3"},noAnalyze:!1,devDependencies:{"babel-core":"^6.17.0","babel-eslint":"7.0.0","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-transform-class-properties":"^6.16.0","babel-plugin-transform-flow-strip-types":"^6.14.0","babel-preset-es2015":"^6.16.0","babel-register":"^6.16.3",chai:"^3.5.0","eslint-config-airbnb":"12.0.0","eslint-plugin-flowtype":"2.19.0","eslint-plugin-import":"^1.16.0","eslint-plugin-mocha":"4.6.0","eslint-plugin-react":"6.3.0","flow-bin":"^0.33.0",gulp:"^3.9.1","gulp-babel":"^6.1.2","gulp-clean":"^0.3.2","gulp-eslint":"^3.0.1","gulp-exec":"^2.1.2","gulp-flowtype":"^1.0.0","gulp-gzip":"^1.4.0","gulp-istanbul":"^1.1.1","gulp-mocha":"^3.0.1","gulp-rename":"^1.2.2","gulp-sourcemaps":"^1.6.0","gulp-uglify":"^2.0.0","imports-loader":"0.6.5",isparta:"^4.0.0","json-loader":"0.5.4",karma:"1.3.0","karma-babel-preprocessor":"^6.0.1","karma-chai":"0.1.0","karma-chrome-launcher":"^2.0.0","karma-mocha":"^1.2.0","karma-phantomjs-launcher":"1.0.2","karma-spec-reporter":"0.0.26",mocha:"3.1.0",nock:"^8.0.0","phantomjs-prebuilt":"2.1.12","remap-istanbul":"^0.6.4","run-sequence":"^1.2.2",sinon:"^1.17.6","stats-webpack-plugin":"^0.4.2","uglify-js":"^2.7.3",underscore:"^1.8.3",webpack:"^1.13.2","webpack-dev-server":"1.16.1","webpack-stream":"^3.2.0"},bundleDependencies:[],license:"MIT",engine:{node:">=0.8"}}},function(e,t){"use strict";var n=n||function(e,t){var n={},r=n.lib={},i=function(){},o=r.Base={extend:function(e){i.prototype=this;var t=new i;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},s=r.WordArray=o.extend({init:function(e,n){e=this.words=e||[],this.sigBytes=n!=t?n:4*e.length},toString:function(e){return(e||u).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes;if(e=e.sigBytes,this.clamp(),r%4)for(var i=0;i<e;i++)t[r+i>>>2]|=(n[i>>>2]>>>24-8*(i%4)&255)<<24-8*((r+i)%4);else if(65535<n.length)for(i=0;i<e;i+=4)t[r+i>>>2]=n[i>>>2];else t.push.apply(t,n);return this.sigBytes+=e,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-8*(n%4),t.length=e.ceil(n/4)},clone:function(){var e=o.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var n=[],r=0;r<t;r+=4)n.push(4294967296*e.random()|0);return new s.init(n,t)}}),a=n.enc={},u=a.Hex={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++){var i=t[r>>>2]>>>24-8*(r%4)&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-4*(r%8);return new s.init(n,t/2)}},c=a.Latin1={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;r<e;r++)n.push(String.fromCharCode(t[r>>>2]>>>24-8*(r%4)&255));return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(255&e.charCodeAt(r))<<24-8*(r%4);return new s.init(n,t)}},l=a.Utf8={stringify:function(e){try{return decodeURIComponent(escape(c.stringify(e)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(e){return c.parse(unescape(encodeURIComponent(e)))}},h=r.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,r=n.words,i=n.sigBytes,o=this.blockSize,a=i/(4*o),a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0);
if(t=a*o,i=e.min(4*t,i),t){for(var u=0;u<t;u+=o)this._doProcessBlock(r,u);u=r.splice(0,t),n.sigBytes-=i}return new s.init(u,i)},clone:function(){var e=o.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});r.Hasher=h.extend({cfg:o.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new f.HMAC.init(e,n).finalize(t)}}});var f=n.algo={};return n}(Math);!function(e){for(var t=n,r=t.lib,i=r.WordArray,o=r.Hasher,r=t.algo,s=[],a=[],u=function(e){return 4294967296*(e-(0|e))|0},c=2,l=0;64>l;){var h;e:{h=c;for(var f=e.sqrt(h),p=2;p<=f;p++)if(!(h%p)){h=!1;break e}h=!0}h&&(8>l&&(s[l]=u(e.pow(c,.5))),a[l]=u(e.pow(c,1/3)),l++),c++}var d=[],r=r.SHA256=o.extend({_doReset:function(){this._hash=new i.init(s.slice(0))},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],i=n[1],o=n[2],s=n[3],u=n[4],c=n[5],l=n[6],h=n[7],f=0;64>f;f++){if(16>f)d[f]=0|e[t+f];else{var p=d[f-15],g=d[f-2];d[f]=((p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3)+d[f-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+d[f-16]}p=h+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&c^~u&l)+a[f]+d[f],g=((r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22))+(r&i^r&o^i&o),h=l,l=c,c=u,u=s+p|0,s=o,o=i,i=r,r=p+g|0}n[0]=n[0]+r|0,n[1]=n[1]+i|0,n[2]=n[2]+o|0,n[3]=n[3]+s|0,n[4]=n[4]+u|0,n[5]=n[5]+c|0,n[6]=n[6]+l|0,n[7]=n[7]+h|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return n[i>>>5]|=128<<24-i%32,n[(i+64>>>9<<4)+14]=e.floor(r/4294967296),n[(i+64>>>9<<4)+15]=r,t.sigBytes=4*n.length,this._process(),this._hash},clone:function(){var e=o.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA256=o._createHelper(r),t.HmacSHA256=o._createHmacHelper(r)}(Math),function(){var e=n,t=e.enc.Utf8;e.algo.HMAC=e.lib.Base.extend({init:function(e,n){e=this._hasher=new e.init,"string"==typeof n&&(n=t.parse(n));var r=e.blockSize,i=4*r;n.sigBytes>i&&(n=e.finalize(n)),n.clamp();for(var o=this._oKey=n.clone(),s=this._iKey=n.clone(),a=o.words,u=s.words,c=0;c<r;c++)a[c]^=1549556828,u[c]^=909522486;o.sigBytes=s.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher;return e=t.finalize(e),t.reset(),t.finalize(this._oKey.clone().concat(e))}})}(),function(){var e=n,t=e.lib.WordArray;e.enc.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp(),e=[];for(var i=0;i<n;i+=3)for(var o=(t[i>>>2]>>>24-8*(i%4)&255)<<16|(t[i+1>>>2]>>>24-8*((i+1)%4)&255)<<8|t[i+2>>>2]>>>24-8*((i+2)%4)&255,s=0;4>s&&i+.75*s<n;s++)e.push(r.charAt(o>>>6*(3-s)&63));if(t=r.charAt(64))for(;e.length%4;)e.push(t);return e.join("")},parse:function(e){var n=e.length,r=this._map,i=r.charAt(64);i&&(i=e.indexOf(i),-1!=i&&(n=i));for(var i=[],o=0,s=0;s<n;s++)if(s%4){var a=r.indexOf(e.charAt(s-1))<<2*(s%4),u=r.indexOf(e.charAt(s))>>>6-2*(s%4);i[o>>>2]|=(a|u)<<24-8*(o%4),o++}return t.create(i,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){function t(e,t,n,r,i,o,s){return e=e+(t&n|~t&r)+i+s,(e<<o|e>>>32-o)+t}function r(e,t,n,r,i,o,s){return e=e+(t&r|n&~r)+i+s,(e<<o|e>>>32-o)+t}function i(e,t,n,r,i,o,s){return e=e+(t^n^r)+i+s,(e<<o|e>>>32-o)+t}function o(e,t,n,r,i,o,s){return e=e+(n^(t|~r))+i+s,(e<<o|e>>>32-o)+t}for(var s=n,a=s.lib,u=a.WordArray,c=a.Hasher,a=s.algo,l=[],h=0;64>h;h++)l[h]=4294967296*e.abs(e.sin(h+1))|0;a=a.MD5=c.extend({_doReset:function(){this._hash=new u.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,n){for(var s=0;16>s;s++){var a=n+s,u=e[a];e[a]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var s=this._hash.words,a=e[n+0],u=e[n+1],c=e[n+2],h=e[n+3],f=e[n+4],p=e[n+5],d=e[n+6],g=e[n+7],y=e[n+8],v=e[n+9],b=e[n+10],_=e[n+11],m=e[n+12],k=e[n+13],P=e[n+14],w=e[n+15],S=s[0],O=s[1],C=s[2],M=s[3],S=t(S,O,C,M,a,7,l[0]),M=t(M,S,O,C,u,12,l[1]),C=t(C,M,S,O,c,17,l[2]),O=t(O,C,M,S,h,22,l[3]),S=t(S,O,C,M,f,7,l[4]),M=t(M,S,O,C,p,12,l[5]),C=t(C,M,S,O,d,17,l[6]),O=t(O,C,M,S,g,22,l[7]),S=t(S,O,C,M,y,7,l[8]),M=t(M,S,O,C,v,12,l[9]),C=t(C,M,S,O,b,17,l[10]),O=t(O,C,M,S,_,22,l[11]),S=t(S,O,C,M,m,7,l[12]),M=t(M,S,O,C,k,12,l[13]),C=t(C,M,S,O,P,17,l[14]),O=t(O,C,M,S,w,22,l[15]),S=r(S,O,C,M,u,5,l[16]),M=r(M,S,O,C,d,9,l[17]),C=r(C,M,S,O,_,14,l[18]),O=r(O,C,M,S,a,20,l[19]),S=r(S,O,C,M,p,5,l[20]),M=r(M,S,O,C,b,9,l[21]),C=r(C,M,S,O,w,14,l[22]),O=r(O,C,M,S,f,20,l[23]),S=r(S,O,C,M,v,5,l[24]),M=r(M,S,O,C,P,9,l[25]),C=r(C,M,S,O,h,14,l[26]),O=r(O,C,M,S,y,20,l[27]),S=r(S,O,C,M,k,5,l[28]),M=r(M,S,O,C,c,9,l[29]),C=r(C,M,S,O,g,14,l[30]),O=r(O,C,M,S,m,20,l[31]),S=i(S,O,C,M,p,4,l[32]),M=i(M,S,O,C,y,11,l[33]),C=i(C,M,S,O,_,16,l[34]),O=i(O,C,M,S,P,23,l[35]),S=i(S,O,C,M,u,4,l[36]),M=i(M,S,O,C,f,11,l[37]),C=i(C,M,S,O,g,16,l[38]),O=i(O,C,M,S,b,23,l[39]),S=i(S,O,C,M,k,4,l[40]),M=i(M,S,O,C,a,11,l[41]),C=i(C,M,S,O,h,16,l[42]),O=i(O,C,M,S,d,23,l[43]),S=i(S,O,C,M,v,4,l[44]),M=i(M,S,O,C,m,11,l[45]),C=i(C,M,S,O,w,16,l[46]),O=i(O,C,M,S,c,23,l[47]),S=o(S,O,C,M,a,6,l[48]),M=o(M,S,O,C,g,10,l[49]),C=o(C,M,S,O,P,15,l[50]),O=o(O,C,M,S,p,21,l[51]),S=o(S,O,C,M,m,6,l[52]),M=o(M,S,O,C,h,10,l[53]),C=o(C,M,S,O,b,15,l[54]),O=o(O,C,M,S,u,21,l[55]),S=o(S,O,C,M,y,6,l[56]),M=o(M,S,O,C,w,10,l[57]),C=o(C,M,S,O,d,15,l[58]),O=o(O,C,M,S,k,21,l[59]),S=o(S,O,C,M,f,6,l[60]),M=o(M,S,O,C,_,10,l[61]),C=o(C,M,S,O,c,15,l[62]),O=o(O,C,M,S,v,21,l[63]);s[0]=s[0]+S|0,s[1]=s[1]+O|0,s[2]=s[2]+C|0,s[3]=s[3]+M|0},_doFinalize:function(){var t=this._data,n=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;n[i>>>5]|=128<<24-i%32;var o=e.floor(r/4294967296);for(n[(i+64>>>9<<4)+15]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),n[(i+64>>>9<<4)+14]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(n.length+1),this._process(),t=this._hash,n=t.words,r=0;4>r;r++)i=n[r],n[r]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8);return t},clone:function(){var e=c.clone.call(this);return e._hash=this._hash.clone(),e}}),s.MD5=c._createHelper(a),s.HmacMD5=c._createHmacHelper(a)}(Math),function(){var e=n,t=e.lib,r=t.Base,i=t.WordArray,t=e.algo,o=t.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=n.hasher.create(),o=i.create(),s=o.words,a=n.keySize,n=n.iterations;s.length<a;){u&&r.update(u);var u=r.update(e).finalize(t);r.reset();for(var c=1;c<n;c++)u=r.finalize(u),r.reset();o.concat(u)}return o.sigBytes=4*a,o}});e.EvpKDF=function(e,t,n){return o.create(n).compute(e,t)}}(),n.lib.Cipher||function(e){var t=n,r=t.lib,i=r.Base,o=r.WordArray,s=r.BufferedBlockAlgorithm,a=t.enc.Base64,u=t.algo.EvpKDF,c=r.Cipher=s.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset()},reset:function(){s.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(t,n,r){return("string"==typeof n?g:d).encrypt(e,t,n,r)},decrypt:function(t,n,r){return("string"==typeof n?g:d).decrypt(e,t,n,r)}}}});r.StreamCipher=c.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l=t.mode={},h=function(t,n,r){var i=this._iv;i?this._iv=e:i=this._prevBlock;for(var o=0;o<r;o++)t[n+o]^=i[o]},f=(r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}})).extend();f.Encryptor=f.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize;h.call(this,e,t,r),n.encryptBlock(e,t),this._prevBlock=e.slice(t,t+r)}}),f.Decryptor=f.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=e.slice(t,t+r);n.decryptBlock(e,t),h.call(this,e,t,r),this._prevBlock=i}}),l=l.CBC=f,f=(t.pad={}).Pkcs7={pad:function(e,t){for(var n=4*t,n=n-e.sigBytes%n,r=n<<24|n<<16|n<<8|n,i=[],s=0;s<n;s+=4)i.push(r);n=o.create(i,n),e.concat(n)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},r.BlockCipher=c.extend({cfg:c.cfg.extend({mode:l,padding:f}),reset:function(){c.reset.call(this);var e=this.cfg,t=e.iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=e.createEncryptor;else n=e.createDecryptor,this._minBufferSize=1;this._mode=n.call(e,this,t&&t.words)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else t=this._process(!0),e.unpad(t);return t},blockSize:4});var p=r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),l=(t.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext;return e=e.salt,(e?o.create([1398893684,1701076831]).concat(e).concat(t):t).toString(a)},parse:function(e){e=a.parse(e);var t=e.words;if(1398893684==t[0]&&1701076831==t[1]){var n=o.create(t.slice(2,4));t.splice(0,4),e.sigBytes-=16}return p.create({ciphertext:e,salt:n})}},d=r.SerializableCipher=i.extend({cfg:i.extend({format:l}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r);return t=i.finalize(t),i=i.cfg,p.create({ciphertext:t,key:n,iv:i.iv,algorithm:e,mode:i.mode,padding:i.padding,blockSize:e.blockSize,formatter:r.format})},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),t=(t.kdf={}).OpenSSL={execute:function(e,t,n,r){return r||(r=o.random(8)),e=u.create({keySize:t+n}).compute(e,r),n=o.create(e.words.slice(t),4*n),e.sigBytes=4*t,p.create({key:e,iv:n,salt:r})}},g=r.PasswordBasedCipher=d.extend({cfg:d.cfg.extend({kdf:t}),encrypt:function(e,t,n,r){return r=this.cfg.extend(r),n=r.kdf.execute(n,e.keySize,e.ivSize),r.iv=n.iv,e=d.encrypt.call(this,e,t,n.key,r),e.mixIn(n),e},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),n=r.kdf.execute(n,e.keySize,e.ivSize,t.salt),r.iv=n.iv,d.decrypt.call(this,e,t,n.key,r)}})}(),function(){for(var e=n,t=e.lib.BlockCipher,r=e.algo,i=[],o=[],s=[],a=[],u=[],c=[],l=[],h=[],f=[],p=[],d=[],g=0;256>g;g++)d[g]=128>g?g<<1:g<<1^283;for(var y=0,v=0,g=0;256>g;g++){var b=v^v<<1^v<<2^v<<3^v<<4,b=b>>>8^255&b^99;i[y]=b,o[b]=y;var _=d[y],m=d[_],k=d[m],P=257*d[b]^16843008*b;s[y]=P<<24|P>>>8,a[y]=P<<16|P>>>16,u[y]=P<<8|P>>>24,c[y]=P,P=16843009*k^65537*m^257*_^16843008*y,l[b]=P<<24|P>>>8,h[b]=P<<16|P>>>16,f[b]=P<<8|P>>>24,p[b]=P,y?(y=_^d[d[d[k^_]]],v^=d[d[v]]):y=v=1}var w=[0,1,2,4,8,16,32,64,128,27,54],r=r.AES=t.extend({_doReset:function(){for(var e=this._key,t=e.words,n=e.sigBytes/4,e=4*((this._nRounds=n+6)+1),r=this._keySchedule=[],o=0;o<e;o++)if(o<n)r[o]=t[o];else{var s=r[o-1];o%n?6<n&&4==o%n&&(s=i[s>>>24]<<24|i[s>>>16&255]<<16|i[s>>>8&255]<<8|i[255&s]):(s=s<<8|s>>>24,s=i[s>>>24]<<24|i[s>>>16&255]<<16|i[s>>>8&255]<<8|i[255&s],s^=w[o/n|0]<<24),r[o]=r[o-n]^s}for(t=this._invKeySchedule=[],n=0;n<e;n++)o=e-n,s=n%4?r[o]:r[o-4],t[n]=4>n||4>=o?s:l[i[s>>>24]]^h[i[s>>>16&255]]^f[i[s>>>8&255]]^p[i[255&s]]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,s,a,u,c,i)},decryptBlock:function(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,l,h,f,p,o),n=e[t+1],e[t+1]=e[t+3],e[t+3]=n},_doCryptBlock:function(e,t,n,r,i,o,s,a){for(var u=this._nRounds,c=e[t]^n[0],l=e[t+1]^n[1],h=e[t+2]^n[2],f=e[t+3]^n[3],p=4,d=1;d<u;d++)var g=r[c>>>24]^i[l>>>16&255]^o[h>>>8&255]^s[255&f]^n[p++],y=r[l>>>24]^i[h>>>16&255]^o[f>>>8&255]^s[255&c]^n[p++],v=r[h>>>24]^i[f>>>16&255]^o[c>>>8&255]^s[255&l]^n[p++],f=r[f>>>24]^i[c>>>16&255]^o[l>>>8&255]^s[255&h]^n[p++],c=g,l=y,h=v;g=(a[c>>>24]<<24|a[l>>>16&255]<<16|a[h>>>8&255]<<8|a[255&f])^n[p++],y=(a[l>>>24]<<24|a[h>>>16&255]<<16|a[f>>>8&255]<<8|a[255&c])^n[p++],v=(a[h>>>24]<<24|a[f>>>16&255]<<16|a[c>>>8&255]<<8|a[255&l])^n[p++],f=(a[f>>>24]<<24|a[c>>>16&255]<<16|a[l>>>8&255]<<8|a[255&h])^n[p++],e[t]=g,e[t+1]=y,e[t+2]=v,e[t+3]=f},keySize:8});e.AES=t._createHelper(r)}(),n.mode.ECB=function(){var e=n.lib.BlockCipherMode.extend();return e.Encryptor=e.extend({processBlock:function(e,t){this._cipher.encryptBlock(e,t)}}),e.Decryptor=e.extend({processBlock:function(e,t){this._cipher.decryptBlock(e,t)}}),e}(),e.exports=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={PNNetworkUpCategory:"PNNetworkUpCategory",PNNetworkDownCategory:"PNNetworkDownCategory",PNNetworkIssuesCategory:"PNNetworkIssuesCategory",PNTimeoutCategory:"PNTimeoutCategory",PNBadRequestCategory:"PNBadRequestCategory",PNAccessDeniedCategory:"PNAccessDeniedCategory",PNUnknownCategory:"PNUnknownCategory",PNReconnectedCategory:"PNReconnectedCategory",PNConnectedCategory:"PNConnectedCategory"},e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(11),a=(r(s),n(12)),u=(r(a),n(18)),c=(r(u),n(19)),l=r(c),h=n(22),f=r(h),p=(n(13),n(16)),d=r(p),g=function(){function e(t){var n=t.subscribeEndpoint,r=t.leaveEndpoint,o=t.heartbeatEndpoint,s=t.setStateEndpoint,a=t.timeEndpoint,u=t.config,c=t.crypto,h=t.listenerManager;i(this,e),this._listenerManager=h,this._config=u,this._leaveEndpoint=r,this._heartbeatEndpoint=o,this._setStateEndpoint=s,this._subscribeEndpoint=n,this._crypto=c,this._channels={},this._presenceChannels={},this._channelGroups={},this._presenceChannelGroups={},this._pendingChannelSubscriptions=[],this._pendingChannelGroupSubscriptions=[],this._timetoken=0,this._subscriptionStatusAnnounced=!1,this._reconnectionManager=new l.default({timeEndpoint:a})}return o(e,[{key:"adaptStateChange",value:function(e,t){var n=this,r=e.state,i=e.channels,o=void 0===i?[]:i,s=e.channelGroups,a=void 0===s?[]:s;o.forEach(function(e){e in n._channels&&(n._channels[e].state=r)}),a.forEach(function(e){e in n._channelGroups&&(n._channelGroups[e].state=r)}),this._setStateEndpoint({state:r,channels:o,channelGroups:a},t)}},{key:"adaptSubscribeChange",value:function(e){var t=this,n=e.timetoken,r=e.channels,i=void 0===r?[]:r,o=e.channelGroups,s=void 0===o?[]:o,a=e.withPresence,u=void 0!==a&&a;n&&(this._timetoken=n),i.forEach(function(e){t._channels[e]={state:{}},u&&(t._presenceChannels[e]={}),t._pendingChannelSubscriptions.push(e)}),s.forEach(function(e){t._channelGroups[e]={state:{}},u&&(t._presenceChannelGroups[e]={}),t._pendingChannelGroupSubscriptions.push(e)}),this._subscriptionStatusAnnounced=!1,this.reconnect()}},{key:"adaptUnsubscribeChange",value:function(e){var t=this,n=e.channels,r=void 0===n?[]:n,i=e.channelGroups,o=void 0===i?[]:i;r.forEach(function(e){e in t._channels&&delete t._channels[e],e in t._presenceChannels&&delete t._presenceChannels[e]}),o.forEach(function(e){e in t._channelGroups&&delete t._channelGroups[e],e in t._presenceChannelGroups&&delete t._channelGroups[e]}),this._config.suppressLeaveEvents===!1&&this._leaveEndpoint({channels:r,channelGroups:o},function(e){e.affectedChannels=r,e.affectedChannelGroups=o,t._listenerManager.announceStatus(e)}),this.reconnect()}},{key:"unsubscribeAll",value:function(){this.adaptUnsubscribeChange({channels:this.getSubscribedChannels(),channelGroups:this.getSubscribedChannelGroups()})}},{key:"getSubscribedChannels",value:function(){return Object.keys(this._channels)}},{key:"getSubscribedChannelGroups",value:function(){return Object.keys(this._channelGroups)}},{key:"reconnect",value:function(){this._startSubscribeLoop(),this._registerHeartbeatTimer()}},{key:"disconnect",value:function(){this._stopSubscribeLoop(),this._stopHeartbeatTimer()}},{key:"_registerHeartbeatTimer",value:function(){this._stopHeartbeatTimer(),this._performHeartbeatLoop(),this._heartbeatTimer=setInterval(this._performHeartbeatLoop.bind(this),1e3*this._config.getHeartbeatInterval())}},{key:"_stopHeartbeatTimer",value:function(){this._heartbeatTimer&&(clearInterval(this._heartbeatTimer),this._heartbeatTimer=null)}},{key:"_performHeartbeatLoop",value:function(){var e=this,t=Object.keys(this._channels),n=Object.keys(this._channelGroups),r={};if(0!==t.length||0!==n.length){t.forEach(function(t){var n=e._channels[t].state;Object.keys(n).length&&(r[t]=n)}),n.forEach(function(t){var n=e._channelGroups[t].state;Object.keys(n).length&&(r[t]=n)});var i=function(t){t.error&&e._config.announceFailedHeartbeats&&e._listenerManager.announceStatus(t),!t.error&&e._config.announceSuccessfulHeartbeats&&e._listenerManager.announceStatus(t)};this._heartbeatEndpoint({channels:t,channelGroups:n,state:r},i.bind(this))}}},{key:"_startSubscribeLoop",value:function(){this._stopSubscribeLoop();var e=[],t=[];if(Object.keys(this._channels).forEach(function(t){return e.push(t)}),Object.keys(this._presenceChannels).forEach(function(t){return e.push(t+"-pnpres")}),Object.keys(this._channelGroups).forEach(function(e){return t.push(e)}),Object.keys(this._presenceChannelGroups).forEach(function(e){return t.push(e+"-pnpres")}),0!==e.length||0!==t.length){var n={channels:e,channelGroups:t,timetoken:this._timetoken,filterExpression:this._config.filterExpression,region:this._region};this._subscribeCall=this._subscribeEndpoint(n,this._processSubscribeResponse.bind(this))}}},{key:"_processSubscribeResponse",value:function(e,t){var n=this;if(e.error)return void(e.category===d.default.PNTimeoutCategory?this._startSubscribeLoop():e.category===d.default.PNNetworkIssuesCategory?(this.disconnect(),this._reconnectionManager.onReconnection(function(){n.reconnect(),n._subscriptionStatusAnnounced=!0;var t={category:d.default.PNReconnectedCategory,operation:e.operation};n._listenerManager.announceStatus(t)}),this._reconnectionManager.startPolling(),this._listenerManager.announceStatus(e)):this._listenerManager.announceStatus(e));if(!this._subscriptionStatusAnnounced){var r={};r.category=d.default.PNConnectedCategory,r.operation=e.operation,r.affectedChannels=this._pendingChannelSubscriptions,r.affectedChannelGroups=this._pendingChannelGroupSubscriptions,this._subscriptionStatusAnnounced=!0,this._listenerManager.announceStatus(r),this._pendingChannelSubscriptions=[],this._pendingChannelGroupSubscriptions=[]}t.messages.forEach(function(e){var t=e.channel,r=e.subscriptionMatch,i=e.publishMetaData;if(t===r&&(r=null),f.default.endsWith(e.channel,"-pnpres")){var o={};o.channel=null,o.subscription=null,o.actualChannel=null!=r?t:null,o.subscribedChannel=null!=r?r:t,t&&(o.channel=t.substring(0,t.lastIndexOf("-pnpres"))),r&&(o.subscription=r.substring(0,r.lastIndexOf("-pnpres"))),o.action=e.payload.action,o.state=e.payload.data,o.timetoken=i.publishTimetoken,o.occupancy=e.payload.occupancy,o.uuid=e.payload.uuid,o.timestamp=e.payload.timestamp,n._listenerManager.announcePresence(o)}else{var s={};s.channel=null,s.subscription=null,s.actualChannel=null!=r?t:null,s.subscribedChannel=null!=r?r:t,s.channel=t,s.subscription=r,s.timetoken=i.publishTimetoken,n._config.cipherKey?s.message=n._crypto.decrypt(e.payload):s.message=e.payload,n._listenerManager.announceMessage(s)}}),this._region=t.metadata.region,this._timetoken=t.metadata.timetoken,this._startSubscribeLoop()}},{key:"_stopSubscribeLoop",value:function(){this._subscribeCall&&(this._subscribeCall.abort(),this._subscribeCall=null)}}]),e}();t.default=g,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=(n(13),n(16)),a=r(s),u=function(){function e(){i(this,e),this._listeners=[]}return o(e,[{key:"addListener",value:function(e){this._listeners.push(e)}},{key:"removeListener",value:function(e){var t=[];this._listeners.forEach(function(n){n!==e&&t.push(n)}),this._listeners=t}},{key:"removeAllListeners",value:function(){this._listeners=[]}},{key:"announcePresence",value:function(e){this._listeners.forEach(function(t){t.presence&&t.presence(e)})}},{key:"announceStatus",value:function(e){this._listeners.forEach(function(t){t.status&&t.status(e)})}},{key:"announceMessage",value:function(e){this._listeners.forEach(function(t){t.message&&t.message(e)})}},{key:"announceNetworkUp",value:function(){var e={};e.category=a.default.PNNetworkUpCategory,this.announceStatus(e)}},{key:"announceNetworkDown",value:function(){var e={};e.category=a.default.PNNetworkDownCategory,this.announceStatus(e)}}]),e}();t.default=u,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(20),a=(r(s),n(13),function(){function e(t){var n=t.timeEndpoint;i(this,e),this._timeEndpoint=n}return o(e,[{key:"onReconnection",value:function(e){this._reconnectionCallback=e}},{key:"startPolling",value:function(){this._timeTimer=setInterval(this._performTimeLoop.bind(this),3e3)}},{key:"_performTimeLoop",value:function(){var e=this;this._timeEndpoint(function(t){t.error||(clearInterval(e._timeTimer),e._reconnectionCallback())})}}]),e}());t.default=a,e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNTimeOperation}function o(){return"/time/0"}function s(e){var t=e.config;return t.getTransactionTimeout()}function a(){return{}}function u(){return!1}function c(e,t){return{timetoken:t[0]}}function l(){}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.getURL=o,t.getRequestTimeout=s,t.prepareParams=a,t.isAuthSupported=u,t.handleResponse=c,t.validateParams=l;var h=(n(13),n(21)),f=r(h)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={PNTimeOperation:"PNTimeOperation",PNHistoryOperation:"PNHistoryOperation",PNSubscribeOperation:"PNSubscribeOperation",PNUnsubscribeOperation:"PNUnsubscribeOperation",PNPublishOperation:"PNPublishOperation",PNPushNotificationEnabledChannelsOperation:"PNPushNotificationEnabledChannelsOperation",PNRemoveAllPushNotificationsOperation:"PNRemoveAllPushNotificationsOperation",PNWhereNowOperation:"PNWhereNowOperation",PNSetStateOperation:"PNSetStateOperation",PNHereNowOperation:"PNHereNowOperation",PNGetStateOperation:"PNGetStateOperation",PNHeartbeatOperation:"PNHeartbeatOperation",PNChannelGroupsOperation:"PNChannelGroupsOperation",PNRemoveGroupOperation:"PNRemoveGroupOperation",PNChannelsForGroupOperation:"PNChannelsForGroupOperation",PNAddChannelsToGroupOperation:"PNAddChannelsToGroupOperation",PNRemoveChannelsFromGroupOperation:"PNRemoveChannelsFromGroupOperation",PNAccessManagerGrant:"PNAccessManagerGrant",PNAccessManagerAudit:"PNAccessManagerAudit"},e.exports=t.default},function(e,t){"use strict";function n(e){return encodeURIComponent(e).replace(/[!'()*~]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function r(e){var t=[];return Object.keys(e).forEach(function(e){return t.push(e)}),t}function i(e){return r(e).sort()}function o(e){var t=i(e);return t.map(function(t){return t+"="+n(e[t])}).join("&")}e.exports={signPamFromParams:o,endsWith:function(e,t){return e.indexOf(t,this.length-t.length)!==-1}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){return e.type=t,e}function o(e){return i({message:e},"validationError")}function s(e){var t="PubNub-JS-"+e.sdkFamily;return e.partnerId&&(t+="-"+e.partnerId),t+="/"+e.getVersion()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=e.networking,r=e.config,i=e.crypto,a=null,c={};t.getOperation()===p.default.PNTimeOperation||t.getOperation()===p.default.PNChannelGroupsOperation?a=arguments.length<=2?void 0:arguments[2]:(c=arguments.length<=2?void 0:arguments[2],a=arguments.length<=3?void 0:arguments[3]);var h=t.validateParams(e,c);if(h)return void a(o(h));var f=t.prepareParams(e,c);if(f.uuid=r.UUID,f.pnsdk=s(r),r.useInstanceId&&(f.instanceid=r.instanceId),r.useRequestId&&(f.requestid=u.default.v4()),t.isAuthSupported()&&r.getAuthKey()&&(f.auth=r.getAuthKey()),t.getOperation()===p.default.PNAccessManagerGrant){var d=r.subscribeKey+"\n"+r.publishKey+"\ngrant\n";d+=l.default.signPamFromParams(f),f.signature=i.HMACSHA256(d)}if(t.getOperation()===p.default.PNAccessManagerAudit){var g=r.subscribeKey+"\n"+r.publishKey+"\naudit\n";g+=l.default.signPamFromParams(f),f.signature=i.HMACSHA256(g)}var y=function(n,r){if(a){if(n.error)return a(n);a(n,t.handleResponse(e,r,c))}},v=void 0;if(t.usePost&&t.usePost(e,c)){var b=t.postURL(e,c),_={url:b,operation:t.getOperation(),timeout:t.getRequestTimeout(e)},m=t.postPayload(e,c);v=n.POST(f,m,_,y)}else{var k=t.getURL(e,c),P={url:k,operation:t.getOperation(),timeout:t.getRequestTimeout(e)};v=n.GET(f,P,y)}return t.getOperation()===p.default.PNSubscribeOperation?v:void 0};var a=n(2),u=r(a),c=(n(13),n(22)),l=r(c),h=n(12),f=(r(h),n(21)),p=r(f);e.exports=t.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNAddChannelsToGroupOperation}function o(e,t){var n=t.channels,r=t.channelGroup,i=e.config;return r?n&&0!==n.length?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing Channel Group"}function s(e,t){var n=t.channelGroup,r=e.config;return"/v1/channel-registration/sub-key/"+r.subscribeKey+"/channel-group/"+n}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channels,r=void 0===n?[]:n;return{add:r.join(",")}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNRemoveChannelsFromGroupOperation}function o(e,t){var n=t.channels,r=t.channelGroup,i=e.config;return r?n&&0!==n.length?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing Channel Group"}function s(e,t){var n=t.channelGroup,r=e.config;return"/v1/channel-registration/sub-key/"+r.subscribeKey+"/channel-group/"+n}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channels,r=void 0===n?[]:n;return{remove:r.join(",")}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNRemoveGroupOperation}function o(e,t){var n=t.channelGroup,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channel Group"}function s(e,t){var n=t.channelGroup,r=e.config;return"/v1/channel-registration/sub-key/"+r.subscribeKey+"/channel-group/"+n+"/remove"}function a(){return!0}function u(e){var t=e.config;return t.getTransactionTimeout()}function c(){return{}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.isAuthSupported=a,t.getRequestTimeout=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNChannelGroupsOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e){var t=e.config;return"/v1/channel-registration/sub-key/"+t.subscribeKey+"/channel-group"}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(){return{}}function l(e,t){return{groups:t.payload.groups}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNChannelsForGroupOperation}function o(e,t){var n=t.channelGroup,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channel Group"}function s(e,t){var n=t.channelGroup,r=e.config;return"/v1/channel-registration/sub-key/"+r.subscribeKey+"/channel-group/"+n}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(){return{}}function l(e,t){return{channels:t.payload.channels}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNPushNotificationEnabledChannelsOperation}function o(e,t){var n=t.device,r=t.pushGateway,i=t.channels,o=e.config;return n?r?i&&0!==i.length?o.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device,r=e.config;return"/v1/push/sub-key/"+r.subscribeKey+"/devices/"+n}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.pushGateway,r=t.channels,i=void 0===r?[]:r;return{type:n,add:i.join(",")}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNPushNotificationEnabledChannelsOperation}function o(e,t){var n=t.device,r=t.pushGateway,i=t.channels,o=e.config;return n?r?i&&0!==i.length?o.subscribeKey?void 0:"Missing Subscribe Key":"Missing Channels":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device,r=e.config;return"/v1/push/sub-key/"+r.subscribeKey+"/devices/"+n}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.pushGateway,r=t.channels,i=void 0===r?[]:r;return{type:n,remove:i.join(",")}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{
default:e}}function i(){return f.default.PNPushNotificationEnabledChannelsOperation}function o(e,t){var n=t.device,r=t.pushGateway,i=e.config;return n?r?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device,r=e.config;return"/v1/push/sub-key/"+r.subscribeKey+"/devices/"+n}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.pushGateway;return{type:n}}function l(e,t){return{channels:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNRemoveAllPushNotificationsOperation}function o(e,t){var n=t.device,r=t.pushGateway,i=e.config;return n?r?i.subscribeKey?void 0:"Missing Subscribe Key":"Missing GW Type (pushGateway: gcm or apns)":"Missing Device ID (device)"}function s(e,t){var n=t.device,r=e.config;return"/v1/push/sub-key/"+r.subscribeKey+"/devices/"+n+"/remove"}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.pushGateway;return{type:n}}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNUnsubscribeOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+encodeURIComponent(o)+"/leave"}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i={};return r.length>0&&(i["channel-group"]=r.join(",")),i}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNWhereNowOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.uuid,i=void 0===r?n.UUID:r;return"/v2/presence/sub-key/"+n.subscribeKey+"/uuid/"+i}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(){return{}}function l(e,t){return{channels:t.payload.channels}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNHeartbeatOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+encodeURIComponent(o)+"/heartbeat"}function a(){return!0}function u(e){var t=e.config;return t.getTransactionTimeout()}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i=t.state,o=void 0===i?{}:i,s=e.config,a={};return r.length>0&&(a["channel-group"]=r.join(",")),a.state=JSON.stringify(o),a.heartbeat=s.getPresenceTimeout(),a}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.isAuthSupported=a,t.getRequestTimeout=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNGetStateOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.uuid,i=void 0===r?n.UUID:r,o=t.channels,s=void 0===o?[]:o,a=s.length>0?s.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+a+"/uuid/"+i}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i={};return r.length>0&&(i["channel-group"]=r.join(",")),i}function l(e,t,n){var r=n.channels,i=void 0===r?[]:r,o=n.channelGroups,s=void 0===o?[]:o,a={};return 1===i.length&&0===s.length?a[i[0]]=t.payload:a=t.payload,{channels:a}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNSetStateOperation}function o(e,t){var n=e.config,r=t.state;return r?n.subscribeKey?void 0:"Missing Subscribe Key":"Missing State"}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/presence/sub-key/"+n.subscribeKey+"/channel/"+o+"/uuid/"+n.UUID+"/data"}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.state,r=t.channelGroups,i=void 0===r?[]:r,o={};return o.state=JSON.stringify(n),i.length>0&&(o["channel-group"]=i.join(",")),o}function l(e,t){return{state:t.payload}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNHereNowOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=t.channelGroups,s=void 0===o?[]:o,a="/v2/presence/sub-key/"+n.subscribeKey;if(i.length>0||s.length>0){var u=i.length>0?i.join(","):",";a+="/channel/"+encodeURIComponent(u)}return a}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!0}function c(e,t){var n=t.channelGroups,r=void 0===n?[]:n,i=t.includeUUIDs,o=void 0===i||i,s=t.includeState,a=void 0!==s&&s,u={};return o||(u.disable_uuids=1),a&&(u.state=1),r.length>0&&(u["channel-group"]=r.join(",")),u}function l(e,t,n){var r=n.channels,i=void 0===r?[]:r,o=n.channelGroups,s=void 0===o?[]:o,a=n.includeUUIDs,u=void 0===a||a,c=n.includeState,l=void 0!==c&&c,h=function(){var e={},n=[];return e.totalChannels=1,e.totalOccupancy=t.occupancy,e.channels={},e.channels[i[0]]={occupants:n,name:i[0],occupancy:t.occupancy},u&&t.uuids.forEach(function(e){l?n.push({state:e.state,uuid:e.uuid}):n.push({state:null,uuid:e})}),e},f=function(){var e={};return e.totalChannels=t.payload.total_channels,e.totalOccupancy=t.payload.total_occupancy,e.channels={},Object.keys(t.payload.channels).forEach(function(n){var r=t.payload.channels[n],i=[];return e.channels[n]={occupants:i,name:n,occupancy:r.occupancy},u&&r.uuids.forEach(function(e){l?i.push({state:e.state,uuid:e.uuid}):i.push({state:null,uuid:e})}),e}),e},p=void 0;return p=i.length>1||s.length>0||0===s.length&&0===i.length?f():h()}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNAccessManagerAudit}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e){var t=e.config;return"/v1/auth/audit/sub-key/"+t.subscribeKey}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!1}function c(e,t){var n=t.channel,r=t.channelGroup,i=t.authKeys,o=void 0===i?[]:i,s={};return s.timestamp=Math.floor((new Date).getTime()/1e3),n&&(s.channel=n),r&&(s["channel-group"]=r),o.length>0&&(s.auth=o.join(",")),s}function l(e,t){return t.payload}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNAccessManagerGrant}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e){var t=e.config;return"/v1/auth/grant/sub-key/"+t.subscribeKey}function a(e){var t=e.config;return t.getTransactionTimeout()}function u(){return!1}function c(e,t){var n=t.channels,r=void 0===n?[]:n,i=t.channelGroups,o=void 0===i?[]:i,s=t.ttl,a=t.read,u=void 0!==a&&a,c=t.write,l=void 0!==c&&c,h=t.manage,f=void 0!==h&&h,p=t.authKeys,d=void 0===p?[]:p,g={};return g.r=u?"1":"0",g.w=l?"1":"0",g.m=f?"1":"0",g.timestamp=Math.floor((new Date).getTime()/1e3),r.length>0&&(g.channel=r.join(",")),o.length>0&&(g["channel-group"]=o.join(",")),d.length>0&&(g.auth=d.join(",")),(s||0===s)&&(g.ttl=s),g}function l(){return{}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=e.crypto,r=e.config,i=JSON.stringify(t);return r.cipherKey&&(i=n.encrypt(i),i=JSON.stringify(i)),i}function o(){return v.default.PNPublishOperation}function s(e,t){var n=e.config,r=t.message,i=t.channel;return i?r?n.subscribeKey?void 0:"Missing Subscribe Key":"Missing Message":"Missing Channel"}function a(e,t){var n=t.sendByPost,r=void 0!==n&&n;return r}function u(e,t){var n=e.config,r=t.channel,o=t.message,s=i(e,o);return"/publish/"+n.publishKey+"/"+n.subscribeKey+"/0/"+encodeURIComponent(r)+"/0/"+encodeURIComponent(s)}function c(e,t){var n=e.config,r=t.channel;return"/publish/"+n.publishKey+"/"+n.subscribeKey+"/0/"+encodeURIComponent(r)+"/0"}function l(e){var t=e.config;return t.getTransactionTimeout()}function h(){return!0}function f(e,t){var n=t.message;return i(e,n)}function p(e,t){var n=t.meta,r=t.replicate,i=void 0===r||r,o=t.storeInHistory,s={};return null!=o&&(o?s.store="1":s.store="0"),i===!1&&(s.norep="true"),n&&"object"===("undefined"==typeof n?"undefined":g(n))&&(s.meta=JSON.stringify(n)),s}function d(e,t){return{timetoken:t[2]}}Object.defineProperty(t,"__esModule",{value:!0});var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.getOperation=o,t.validateParams=s,t.usePost=a,t.getURL=u,t.postURL=c,t.getRequestTimeout=l,t.isAuthSupported=h,t.postPayload=f,t.prepareParams=p,t.handleResponse=d;var y=(n(13),n(21)),v=r(y)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=e.config,r=e.crypto;if(!n.cipherKey)return t;try{return r.decrypt(t)}catch(e){return t}}function o(){return p.default.PNHistoryOperation}function s(e,t){var n=t.channel,r=e.config;return n?r.subscribeKey?void 0:"Missing Subscribe Key":"Missing channel"}function a(e,t){var n=t.channel,r=e.config;return"/v2/history/sub-key/"+r.subscribeKey+"/channel/"+encodeURIComponent(n)}function u(e){var t=e.config;return t.getTransactionTimeout()}function c(){return!0}function l(e,t){var n=t.start,r=t.end,i=t.includeTimetoken,o=t.reverse,s=t.count,a=void 0===s?100:s,u={};return u.count=a,n&&(u.start=n),r&&(u.end=r),null!=i&&(u.include_token=i.toString()),null!=o&&(u.reverse=o.toString()),u}function h(e,t){var n={messages:[],startTimeToken:parseInt(t[1],10),endTimeToken:parseInt(t[2],10)};return t[0].forEach(function(t){var r={timetoken:null,entry:null};t.timetoken?(r.timetoken=t.timetoken,r.entry=i(e,t.message)):r.entry=i(e,t),n.messages.push(r)}),n}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=o,t.validateParams=s,t.getURL=a,t.getRequestTimeout=u,t.isAuthSupported=c,t.prepareParams=l,t.handleResponse=h;var f=(n(13),n(21)),p=r(f)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(){return f.default.PNSubscribeOperation}function o(e){var t=e.config;if(!t.subscribeKey)return"Missing Subscribe Key"}function s(e,t){var n=e.config,r=t.channels,i=void 0===r?[]:r,o=i.length>0?i.join(","):",";return"/v2/subscribe/"+n.subscribeKey+"/"+encodeURIComponent(o)+"/0"}function a(e){var t=e.config;return t.getSubscribeTimeout()}function u(){return!0}function c(e,t){var n=e.config,r=t.channelGroups,i=void 0===r?[]:r,o=t.timetoken,s=t.filterExpression,a=t.region,u={heartbeat:n.getPresenceTimeout()};return i.length>0&&(u["channel-group"]=i.join(",")),s&&s.length>0&&(u["filter-expr"]=s),o&&(u.tt=o),a&&(u.tr=a),u}function l(e,t){var n=[];t.m.forEach(function(e){var t={publishTimetoken:e.p.t,region:e.p.r},r={shard:parseInt(e.a,10),subscriptionMatch:e.b,channel:e.c,payload:e.d,flags:e.f,issuingClientId:e.i,subscribeKey:e.k,originationTimetoken:e.o,publishMetaData:t};n.push(r)});var r={timetoken:t.t.t,region:t.t.r};return{messages:n,metadata:r}}Object.defineProperty(t,"__esModule",{value:!0}),t.getOperation=i,t.validateParams=o,t.getURL=s,t.getRequestTimeout=a,t.isAuthSupported=u,t.prepareParams=c,t.handleResponse=l;var h=(n(13),n(21)),f=r(h)}])});
},{}],27:[function(require,module,exports){
module.exports = require('pubnub'); 

},{"pubnub":26}],28:[function(require,module,exports){
"use strict";
const EventEmitter = require('events');

let Rltm = require('rltm');
let waterfall = require('async/waterfall');

let plugins = []; 

let uuid = null;
let me = false;
let globalChat = false;


function addChild(ob, childName, childOb) {
   ob[childName] = childOb;
   childOb.parent = ob;
}

var users = {};

function loadClassPlugins(obj) {

    let className = obj.constructor.name;

    for(let i in plugins) {
        // do plugin error checking here

        if(plugins[i].extends && plugins[i].extends[className]) {
            
            // add properties from plugin object to class under plugin namespace
            addChild(obj, plugins[i].namespace, plugins[i].extends[className]);   

            // this is a reserved function in plugins that run at start of class            
            if(obj[plugins[i].namespace].construct) {
                obj[plugins[i].namespace].construct();
            }

        }


    }

}

let runPluginQueue = function(location, event, first, last) {
    
    let plugin_queue = [];

    plugin_queue.push(first);

    for(let i in plugins) {
        if(plugins[i].middleware && plugins[i].middleware[location] && plugins[i].middleware[location][event]) {
            plugin_queue.push(plugins[i].middleware[location][event]);
        }
    }

    waterfall(plugin_queue, last);

}

class Chat {

    constructor(channel) {

        console.log('new Chat', channel)

        this.channel = channel;

        // key/value of user sin channel
        // users = {};

        // our events published over this event emitter
        this.emitter = new EventEmitter();

        // initialize RLTM with pubnub keys
        this.rltm = new Rltm({
            publishKey: 'pub-c-f7d7be90-895a-4b24-bf99-5977c22c66c9',
            subscribeKey: 'sub-c-bd013f24-9a24-11e6-a681-02ee2ddab7fe',
            uuid: uuid
        });
            
        this.rltm.addListener({
            status: (statusEvent) => {
                
                if (statusEvent.category === "PNConnectedCategory") {
                    this.emitter.emit('ready');
                }

            },
            message: (m) => {

                let event = m.message[0];
                let payload = m.message[1];
                payload.chat = this;

                if(payload.sender && users[payload.sender]) {
                    payload.sender = users[payload.sender];
                }

                this.broadcast(event, payload);

            }
        });

        console.log('subscribing to', this.channel);

        this.rltm.subscribe({ 
            channels: [this.channel],
            withPresence: true
        });

        loadClassPlugins(this);

    }

    publish(event, data) {

        console.log(event, data)

        let payload = {
            data: data
        };

        payload.sender = me.data.uuid;

        runPluginQueue('publish', event, (next) => {
            next(null, payload);
        }, (err, payload) => {

            delete payload.chat;

            this.rltm.publish({
                message: [event, payload],
                channel: this.channel
            });

        });

    }

    broadcast(event, payload) {

        runPluginQueue(event, payload, (next) => {
            next(null, payload);
        }, (err, payload) => {
           this.emitter.emit(event, payload);
        });


    }

};

class GlobalChat extends Chat {
    constructor(channel) {

        super(channel);


        this.rltm.addListener({
            presence: (presenceEvent) => {

                console.log(presenceEvent)

                let payload = {
                    user: users[presenceEvent.uuid],
                    data: presenceEvent
                }

                if(presenceEvent.action == "join") {

                    console.log(presenceEvent)

                    console.log('join', presenceEvent.uuid, presenceEvent.state);

                    if(!users[presenceEvent.uuid] && presenceEvent.state && presenceEvent.state._initialized) {
                        users[presenceEvent.uuid] = new User(presenceEvent.uuid, presenceEvent.state);
                        this.broadcast('join', payload);

                    }

                }
                if(presenceEvent.action == "leave") {
                    delete users[presenceEvent.uuid];
                    this.broadcast('leave', payload);
                }
                if(presenceEvent.action == "timeout") {
                    // set idle?
                    this.broadcast('timeout', payload);  
                }
                if(presenceEvent.action == "state-change") {

                    console.log('state change', presenceEvent.uuid, presenceEvent.state);

                    if(users[presenceEvent.uuid]) {
                        users[presenceEvent.uuid].update(presenceEvent.state);
                        // this will broadcast every change individually
                        // probably doesn't work anymore
                    } else {
                        
                        if(!users[presenceEvent.uuid] && presenceEvent.state && presenceEvent.state._initialized) {

                            users[presenceEvent.uuid] = new User(presenceEvent.uuid, presenceEvent.state);

                            payload.user = users[presenceEvent.uuid];
                            this.broadcast('join', payload);
                        }

                    }

                }

            }
        });

        // get users online now
        this.rltm.hereNow({
            channels: [this.channel],
            includeUUIDs: true,
            includeState: true
        }, (status, response) => {

            if(!status.error) {

                console.log(response)

                // get the result of who's online
                let occupants = response.channels[this.channel].occupants;

                // for every occupant, create a model user
                for(let i in occupants) {

                    if(users[occupants[i].uuid]) {
                        users[occupants[i].uuid].update(occupants[i].state);
                        // this will broadcast every change individually
                    } else {
                        
                        if(!users[occupants[i].uuid] && occupants[i].state && occupants[i].state._initialized) {
                            users[occupants[i].uuid] = new User(occupants[i].uuid, occupants[i].state);
                        }

                    }

                    this.broadcast('join', {
                        user: users[occupants[i].uuid],
                        chat: this
                    });

                }

            } else {
                console.log(status, response);
            }

        });
    

    }
    setState(state) {

        this.rltm.setState({
            state: state,
            channels: [this.channel]
        }, (status, response) => {
        });

    }
}

class GroupChat extends Chat {
    constructor(channel) {

        channel = channel || [globalChat.channel, 'group', new Date().getTime()].join('.');

        super(channel);

        this.rltm.addListener({
            presence: (presenceEvent) => {

                console.log(presenceEvent)
                
                console.log(users)

                let payload = {
                    user: users[presenceEvent.uuid],
                    data: presenceEvent
                }

                if(presenceEvent.action == "join") {
                    this.broadcast('join', payload);
                }
                if(presenceEvent.action == "leave") {
                    this.broadcast('leave', payload);
                }
                if(presenceEvent.action == "timeout") {
                    this.broadcast('timeout', payload);  
                }

            }
        });

        // get users online now
        this.rltm.hereNow({
            channels: [this.channel],
            includeUUIDs: true,
            includeState: true
        }, (status, response) => {

            if(!status.error) {

                console.log(response)

                console.log(users)

                // get the result of who's online
                let occupants = response.channels[this.channel].occupants;

                // for every occupant, create a model user
                for(let i in occupants) {

                    this.broadcast('join', {
                        user: users[occupants[i].uuid],
                        chat: this
                    });

                }

            } else {
                console.log(status, response);
            }

        });

    }
}

class User {
    constructor(uuid, state) {

        // this is public data exposed to the network
        // we can't JSON stringify the object without circular reference        
        this.data = {
            uuid: uuid,
            state: state || {}
        }

        // user can be created before network sync has begun
        // this property lets us know when that has happened
        this.data.state._initialized = true;

        this.feed = new Chat([globalChat.channel, 'feed', uuid].join('.'));
        this.direct = new Chat([globalChat.channel, 'private', uuid].join('.'));

        console.log(this.feed)
        
        // our personal event emitter
        this.emitter = new EventEmitter();
        
    }
    set(property, value) {

        // this is a public setter that sets locally and publishes an event
        this.data.state[property] = value;

        // publish data to the network
        this.emitter.emit('state-update', {
            property: property,
            value: value
        });

    }
    update(state) {
        
        // shorthand loop for updating multiple properties with set
        for(var key in state) {
            this.set(key, state[key]);
        }

    }
};

class Me extends User {
    constructor(uuid, state) {
        
        console.log('new me', uuid, state);

        // call the User constructor
        super(uuid, state);
        
        // load Me plugins
        loadClassPlugins(this);

    }
    set(property, value) {

        // set the property using User method
        super.set(property, value);

        globalChat.setState(this.data.state);

    }
    update(state) {

        super.update(state);

        globalChat.setState(this.data.state);

    }
}

module.exports = {
    config(config, plugs) {

        this.config = config || {};

        this.config.globalChannel = this.config.globalChannel || 'ofc-global';

        plugins = plugs;

        this.plugin = {};

        return this;

    },
    identify(id, state) {

        uuid = id;

        globalChat = new GlobalChat(this.config.globalChannel);

        me = new Me(uuid, state);

        return me;
    },
    getGlobalChat() {
        return globalChat
    },
    Chat: Chat,
    GlobalChat: GlobalChat,
    GroupChat: GroupChat,
    User: User,
    Me: Me,
    plugin: {}
};

},{"async/waterfall":24,"events":25,"rltm":27}],29:[function(require,module,exports){
window.OCF = window.OCF || require('./src/index.js');

},{"./src/index.js":28}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvaW50ZXJuYWwvb25jZS5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9pbnRlcm5hbC9vbmx5T25jZS5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVJlc3QuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNldFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2FzeW5jL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlclJlc3QuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL19zaG9ydE91dC5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL190b1NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL2NvbnN0YW50LmpzIiwibm9kZV9tb2R1bGVzL2FzeW5jL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJub2RlX21vZHVsZXMvYXN5bmMvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2FzeW5jL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2FzeW5jL25vZGVfbW9kdWxlcy9sb2Rhc2gvbm9vcC5qcyIsIm5vZGVfbW9kdWxlcy9hc3luYy93YXRlcmZhbGwuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wdWJudWIvZGlzdC93ZWIvcHVibnViLm1pbi5qcyIsIm5vZGVfbW9kdWxlcy9ybHRtL3NyYy9pbmRleC5qcyIsInNyYy9pbmRleC5qcyIsIndpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWJBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IG9uY2U7XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZuID09PSBudWxsKSByZXR1cm47XG4gICAgICAgIHZhciBjYWxsRm4gPSBmbjtcbiAgICAgICAgZm4gPSBudWxsO1xuICAgICAgICBjYWxsRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gb25seU9uY2U7XG5mdW5jdGlvbiBvbmx5T25jZShmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChmbiA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgd2FzIGFscmVhZHkgY2FsbGVkLlwiKTtcbiAgICAgICAgdmFyIGNhbGxGbiA9IGZuO1xuICAgICAgICBmbiA9IG51bGw7XG4gICAgICAgIGNhbGxGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5JyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlc3Q7XG4iLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0VG9TdHJpbmc7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBiYXNlSXNOYXRpdmUgPSByZXF1aXJlKCcuL19iYXNlSXNOYXRpdmUnKSxcbiAgICBnZXRWYWx1ZSA9IHJlcXVpcmUoJy4vX2dldFZhbHVlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlclJlc3Q7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgYmFzZVNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVNldFRvU3RyaW5nJyksXG4gICAgc2hvcnRPdXQgPSByZXF1aXJlKCcuL19zaG9ydE91dCcpO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDUwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3J0T3V0O1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc3RhbnQ7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGB1bmRlZmluZWRgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4zLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5ub29wKTtcbiAqIC8vID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAqL1xuZnVuY3Rpb24gbm9vcCgpIHtcbiAgLy8gTm8gb3BlcmF0aW9uIHBlcmZvcm1lZC5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub29wO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9ICgwLCBfb25jZTIuZGVmYXVsdCkoY2FsbGJhY2sgfHwgX25vb3AyLmRlZmF1bHQpO1xuICAgIGlmICghKDAsIF9pc0FycmF5Mi5kZWZhdWx0KSh0YXNrcykpIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIHdhdGVyZmFsbCBtdXN0IGJlIGFuIGFycmF5IG9mIGZ1bmN0aW9ucycpKTtcbiAgICBpZiAoIXRhc2tzLmxlbmd0aCkgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgdmFyIHRhc2tJbmRleCA9IDA7XG5cbiAgICBmdW5jdGlvbiBuZXh0VGFzayhhcmdzKSB7XG4gICAgICAgIGlmICh0YXNrSW5kZXggPT09IHRhc2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhc2tDYWxsYmFjayA9ICgwLCBfb25seU9uY2UyLmRlZmF1bHQpKCgwLCBfYmFzZVJlc3QyLmRlZmF1bHQpKGZ1bmN0aW9uIChlcnIsIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgW2Vycl0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRUYXNrKGFyZ3MpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgYXJncy5wdXNoKHRhc2tDYWxsYmFjayk7XG5cbiAgICAgICAgdmFyIHRhc2sgPSB0YXNrc1t0YXNrSW5kZXgrK107XG4gICAgICAgIHRhc2suYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuXG4gICAgbmV4dFRhc2soW10pO1xufTtcblxudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoL2lzQXJyYXknKTtcblxudmFyIF9pc0FycmF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQXJyYXkpO1xuXG52YXIgX25vb3AgPSByZXF1aXJlKCdsb2Rhc2gvbm9vcCcpO1xuXG52YXIgX25vb3AyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbm9vcCk7XG5cbnZhciBfb25jZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvb25jZScpO1xuXG52YXIgX29uY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb25jZSk7XG5cbnZhciBfYmFzZVJlc3QgPSByZXF1aXJlKCdsb2Rhc2gvX2Jhc2VSZXN0Jyk7XG5cbnZhciBfYmFzZVJlc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmFzZVJlc3QpO1xuXG52YXIgX29ubHlPbmNlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9vbmx5T25jZScpO1xuXG52YXIgX29ubHlPbmNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29ubHlPbmNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKlxuICogUnVucyB0aGUgYHRhc2tzYCBhcnJheSBvZiBmdW5jdGlvbnMgaW4gc2VyaWVzLCBlYWNoIHBhc3NpbmcgdGhlaXIgcmVzdWx0cyB0b1xuICogdGhlIG5leHQgaW4gdGhlIGFycmF5LiBIb3dldmVyLCBpZiBhbnkgb2YgdGhlIGB0YXNrc2AgcGFzcyBhbiBlcnJvciB0byB0aGVpclxuICogb3duIGNhbGxiYWNrLCB0aGUgbmV4dCBmdW5jdGlvbiBpcyBub3QgZXhlY3V0ZWQsIGFuZCB0aGUgbWFpbiBgY2FsbGJhY2tgIGlzXG4gKiBpbW1lZGlhdGVseSBjYWxsZWQgd2l0aCB0aGUgZXJyb3IuXG4gKlxuICogQG5hbWUgd2F0ZXJmYWxsXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgbW9kdWxlOkNvbnRyb2xGbG93XG4gKiBAbWV0aG9kXG4gKiBAY2F0ZWdvcnkgQ29udHJvbCBGbG93XG4gKiBAcGFyYW0ge0FycmF5fSB0YXNrcyAtIEFuIGFycmF5IG9mIGZ1bmN0aW9ucyB0byBydW4sIGVhY2ggZnVuY3Rpb24gaXMgcGFzc2VkXG4gKiBhIGBjYWxsYmFjayhlcnIsIHJlc3VsdDEsIHJlc3VsdDIsIC4uLilgIGl0IG11c3QgY2FsbCBvbiBjb21wbGV0aW9uLiBUaGVcbiAqIGZpcnN0IGFyZ3VtZW50IGlzIGFuIGVycm9yICh3aGljaCBjYW4gYmUgYG51bGxgKSBhbmQgYW55IGZ1cnRoZXIgYXJndW1lbnRzXG4gKiB3aWxsIGJlIHBhc3NlZCBhcyBhcmd1bWVudHMgaW4gb3JkZXIgdG8gdGhlIG5leHQgdGFzay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBydW4gb25jZSBhbGwgdGhlXG4gKiBmdW5jdGlvbnMgaGF2ZSBjb21wbGV0ZWQuIFRoaXMgd2lsbCBiZSBwYXNzZWQgdGhlIHJlc3VsdHMgb2YgdGhlIGxhc3QgdGFzaydzXG4gKiBjYWxsYmFjay4gSW52b2tlZCB3aXRoIChlcnIsIFtyZXN1bHRzXSkuXG4gKiBAcmV0dXJucyB1bmRlZmluZWRcbiAqIEBleGFtcGxlXG4gKlxuICogYXN5bmMud2F0ZXJmYWxsKFtcbiAqICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xuICogICAgICAgICBjYWxsYmFjayhudWxsLCAnb25lJywgJ3R3bycpO1xuICogICAgIH0sXG4gKiAgICAgZnVuY3Rpb24oYXJnMSwgYXJnMiwgY2FsbGJhY2spIHtcbiAqICAgICAgICAgLy8gYXJnMSBub3cgZXF1YWxzICdvbmUnIGFuZCBhcmcyIG5vdyBlcXVhbHMgJ3R3bydcbiAqICAgICAgICAgY2FsbGJhY2sobnVsbCwgJ3RocmVlJyk7XG4gKiAgICAgfSxcbiAqICAgICBmdW5jdGlvbihhcmcxLCBjYWxsYmFjaykge1xuICogICAgICAgICAvLyBhcmcxIG5vdyBlcXVhbHMgJ3RocmVlJ1xuICogICAgICAgICBjYWxsYmFjayhudWxsLCAnZG9uZScpO1xuICogICAgIH1cbiAqIF0sIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICogICAgIC8vIHJlc3VsdCBub3cgZXF1YWxzICdkb25lJ1xuICogfSk7XG4gKlxuICogLy8gT3IsIHdpdGggbmFtZWQgZnVuY3Rpb25zOlxuICogYXN5bmMud2F0ZXJmYWxsKFtcbiAqICAgICBteUZpcnN0RnVuY3Rpb24sXG4gKiAgICAgbXlTZWNvbmRGdW5jdGlvbixcbiAqICAgICBteUxhc3RGdW5jdGlvbixcbiAqIF0sIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xuICogICAgIC8vIHJlc3VsdCBub3cgZXF1YWxzICdkb25lJ1xuICogfSk7XG4gKiBmdW5jdGlvbiBteUZpcnN0RnVuY3Rpb24oY2FsbGJhY2spIHtcbiAqICAgICBjYWxsYmFjayhudWxsLCAnb25lJywgJ3R3bycpO1xuICogfVxuICogZnVuY3Rpb24gbXlTZWNvbmRGdW5jdGlvbihhcmcxLCBhcmcyLCBjYWxsYmFjaykge1xuICogICAgIC8vIGFyZzEgbm93IGVxdWFscyAnb25lJyBhbmQgYXJnMiBub3cgZXF1YWxzICd0d28nXG4gKiAgICAgY2FsbGJhY2sobnVsbCwgJ3RocmVlJyk7XG4gKiB9XG4gKiBmdW5jdGlvbiBteUxhc3RGdW5jdGlvbihhcmcxLCBjYWxsYmFjaykge1xuICogICAgIC8vIGFyZzEgbm93IGVxdWFscyAndGhyZWUnXG4gKiAgICAgY2FsbGJhY2sobnVsbCwgJ2RvbmUnKTtcbiAqIH1cbiAqLyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuUHViTnViPXQoKTplLlB1Yk51Yj10KCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIGk9bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIGVbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsdCksaS5sb2FkZWQ9ITAsaS5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LnA9XCJcIix0KDApfShbZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfWZ1bmN0aW9uIG8oZSx0KXtpZighZSl0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7cmV0dXJuIXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0P2U6dH1mdW5jdGlvbiBzKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCYmbnVsbCE9PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIrdHlwZW9mIHQpO2UucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodCYmdC5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTplLGVudW1lcmFibGU6ITEsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pLHQmJihPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKGUsdCk6ZS5fX3Byb3RvX189dCl9ZnVuY3Rpb24gYShlKXtyZXR1cm4hKCFuYXZpZ2F0b3J8fCFuYXZpZ2F0b3Iuc2VuZEJlYWNvbikmJnZvaWQgbmF2aWdhdG9yLnNlbmRCZWFjb24oZSl9T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHU9bigxKSxjPXIodSksbD0obigxMykse2dldDpmdW5jdGlvbihlKXt0cnl7cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGUpfWNhdGNoKGUpe3JldHVybiBudWxsfX0sc2V0OmZ1bmN0aW9uKGUsdCl7dHJ5e3JldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShlLHQpfWNhdGNoKGUpe3JldHVybiBudWxsfX19KSxoPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7aSh0aGlzLHQpLGUuZGI9bCxlLnNlbmRCZWFjb249YSxlLnNka0ZhbWlseT1cIldlYlwiO3ZhciBuPW8odGhpcywodC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzLGUpKTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsZnVuY3Rpb24oKXtuLl9saXN0ZW5lck1hbmFnZXIuYW5ub3VuY2VOZXR3b3JrRG93bigpLG4uc3RvcCgpfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvbmxpbmVcIixmdW5jdGlvbigpe24uX2xpc3RlbmVyTWFuYWdlci5hbm5vdW5jZU5ldHdvcmtVcCgpLG4ucmVjb25uZWN0KCl9KSxufXJldHVybiBzKHQsZSksdH0oYy5kZWZhdWx0KTt0LmRlZmF1bHQ9aCxlLmV4cG9ydHM9dC5kZWZhdWx0fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtpZihlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIHQ9e307aWYobnVsbCE9ZSlmb3IodmFyIG4gaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxuKSYmKHRbbl09ZVtuXSk7cmV0dXJuIHQuZGVmYXVsdD1lLHR9ZnVuY3Rpb24gaShlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gbyhlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHM9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIua2V5LHIpfX1yZXR1cm4gZnVuY3Rpb24odCxuLHIpe3JldHVybiBuJiZlKHQucHJvdG90eXBlLG4pLHImJmUodCxyKSx0fX0oKSxhPW4oMiksdT1pKGEpLGM9big0KSxsPWkoYyksaD1uKDEyKSxmPWkoaCkscD1uKDExKSxkPWkocCksZz1uKDE3KSx5PWkoZyksdj1uKDE4KSxiPWkodiksXz1uKDIzKSxtPWkoXyksaz1uKDI0KSxQPXIoayksdz1uKDI1KSxTPXIodyksTz1uKDI2KSxDPXIoTyksTT1uKDI3KSxUPXIoTSkseD1uKDI4KSxFPXIoeCksTj1uKDI5KSxSPXIoTiksSz1uKDMwKSxBPXIoSyksaj1uKDMxKSxEPXIoaiksRz1uKDMyKSxVPXIoRyksQj1uKDMzKSxJPXIoQiksSD1uKDM0KSxMPXIoSCkscT1uKDM1KSx6PXIocSksRj1uKDM2KSxYPXIoRiksVz1uKDM3KSxKPXIoVyksVj1uKDM4KSwkPXIoViksUT1uKDM5KSxZPXIoUSksWj1uKDQwKSxlZT1yKFopLHRlPW4oNDEpLG5lPXIodGUpLHJlPW4oNDIpLGllPXIocmUpLG9lPW4oMjApLHNlPXIob2UpLGFlPW4oNDMpLHVlPXIoYWUpLGNlPW4oMTQpLGxlPWkoY2UpLGhlPW4oMjEpLGZlPWkoaGUpLHBlPW4oMTYpLGRlPWkocGUpLGdlPShuKDEzKSxmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7dmFyIG49dGhpcztvKHRoaXMsZSk7dmFyIHI9dC5zZW5kQmVhY29uLGk9dC5kYixzPXRoaXMuX2NvbmZpZz1uZXcgZi5kZWZhdWx0KHtzZXR1cDp0LGRiOml9KSxhPW5ldyBkLmRlZmF1bHQoe2NvbmZpZzpzfSksdT1uZXcgbC5kZWZhdWx0KHtjb25maWc6cyxjcnlwdG86YSxzZW5kQmVhY29uOnJ9KSxjPXtjb25maWc6cyxuZXR3b3JraW5nOnUsY3J5cHRvOmF9LGg9dGhpcy5fbGlzdGVuZXJNYW5hZ2VyPW5ldyBiLmRlZmF1bHQscD1tLmRlZmF1bHQuYmluZCh0aGlzLGMsc2UpLGc9bS5kZWZhdWx0LmJpbmQodGhpcyxjLEkpLHY9bS5kZWZhdWx0LmJpbmQodGhpcyxjLHopLF89bS5kZWZhdWx0LmJpbmQodGhpcyxjLEopLGs9bS5kZWZhdWx0LmJpbmQodGhpcyxjLHVlKSx3PW5ldyB5LmRlZmF1bHQoe3RpbWVFbmRwb2ludDpwLGxlYXZlRW5kcG9pbnQ6ZyxoZWFydGJlYXRFbmRwb2ludDp2LHNldFN0YXRlRW5kcG9pbnQ6XyxzdWJzY3JpYmVFbmRwb2ludDprLGNyeXB0bzpjLmNyeXB0byxjb25maWc6Yy5jb25maWcsbGlzdGVuZXJNYW5hZ2VyOmh9KTt0aGlzLmFkZExpc3RlbmVyPWguYWRkTGlzdGVuZXIuYmluZChoKSx0aGlzLnJlbW92ZUxpc3RlbmVyPWgucmVtb3ZlTGlzdGVuZXIuYmluZChoKSx0aGlzLnJlbW92ZUFsbExpc3RlbmVycz1oLnJlbW92ZUFsbExpc3RlbmVycy5iaW5kKGgpLHRoaXMuY2hhbm5lbEdyb3Vwcz17bGlzdEdyb3VwczptLmRlZmF1bHQuYmluZCh0aGlzLGMsVCksbGlzdENoYW5uZWxzOm0uZGVmYXVsdC5iaW5kKHRoaXMsYyxFKSxhZGRDaGFubmVsczptLmRlZmF1bHQuYmluZCh0aGlzLGMsUCkscmVtb3ZlQ2hhbm5lbHM6bS5kZWZhdWx0LmJpbmQodGhpcyxjLFMpLGRlbGV0ZUdyb3VwOm0uZGVmYXVsdC5iaW5kKHRoaXMsYyxDKX0sdGhpcy5wdXNoPXthZGRDaGFubmVsczptLmRlZmF1bHQuYmluZCh0aGlzLGMsUikscmVtb3ZlQ2hhbm5lbHM6bS5kZWZhdWx0LmJpbmQodGhpcyxjLEEpLGRlbGV0ZURldmljZTptLmRlZmF1bHQuYmluZCh0aGlzLGMsVSksbGlzdENoYW5uZWxzOm0uZGVmYXVsdC5iaW5kKHRoaXMsYyxEKX0sdGhpcy5oZXJlTm93PW0uZGVmYXVsdC5iaW5kKHRoaXMsYywkKSx0aGlzLndoZXJlTm93PW0uZGVmYXVsdC5iaW5kKHRoaXMsYyxMKSx0aGlzLmdldFN0YXRlPW0uZGVmYXVsdC5iaW5kKHRoaXMsYyxYKSx0aGlzLnNldFN0YXRlPXcuYWRhcHRTdGF0ZUNoYW5nZS5iaW5kKHcpLHRoaXMuZ3JhbnQ9bS5kZWZhdWx0LmJpbmQodGhpcyxjLGVlKSx0aGlzLmF1ZGl0PW0uZGVmYXVsdC5iaW5kKHRoaXMsYyxZKSx0aGlzLnB1Ymxpc2g9bS5kZWZhdWx0LmJpbmQodGhpcyxjLG5lKSx0aGlzLmZpcmU9ZnVuY3Rpb24oZSx0KXtlLnJlcGxpY2F0ZT0hMSxlLnN0b3JlSW5IaXN0b3J5PSExLG4ucHVibGlzaChlLHQpfSx0aGlzLmhpc3Rvcnk9bS5kZWZhdWx0LmJpbmQodGhpcyxjLGllKSx0aGlzLnRpbWU9cCx0aGlzLnN1YnNjcmliZT13LmFkYXB0U3Vic2NyaWJlQ2hhbmdlLmJpbmQodyksdGhpcy51bnN1YnNjcmliZT13LmFkYXB0VW5zdWJzY3JpYmVDaGFuZ2UuYmluZCh3KSx0aGlzLnJlY29ubmVjdD13LnJlY29ubmVjdC5iaW5kKHcpLHRoaXMuc3RvcD1mdW5jdGlvbigpe3cudW5zdWJzY3JpYmVBbGwoKSx3LmRpc2Nvbm5lY3QoKX0sdGhpcy51bnN1YnNjcmliZUFsbD13LnVuc3Vic2NyaWJlQWxsLmJpbmQodyksdGhpcy5nZXRTdWJzY3JpYmVkQ2hhbm5lbHM9dy5nZXRTdWJzY3JpYmVkQ2hhbm5lbHMuYmluZCh3KSx0aGlzLmdldFN1YnNjcmliZWRDaGFubmVsR3JvdXBzPXcuZ2V0U3Vic2NyaWJlZENoYW5uZWxHcm91cHMuYmluZCh3KSx0aGlzLmVuY3J5cHQ9YS5lbmNyeXB0LmJpbmQoYSksdGhpcy5kZWNyeXB0PWEuZGVjcnlwdC5iaW5kKGEpLHRoaXMuZ2V0QXV0aEtleT1jLmNvbmZpZy5nZXRBdXRoS2V5LmJpbmQoYy5jb25maWcpLHRoaXMuc2V0QXV0aEtleT1jLmNvbmZpZy5zZXRBdXRoS2V5LmJpbmQoYy5jb25maWcpLHRoaXMuc2V0Q2lwaGVyS2V5PWMuY29uZmlnLnNldENpcGhlcktleS5iaW5kKGMuY29uZmlnKSx0aGlzLmdldFVVSUQ9Yy5jb25maWcuZ2V0VVVJRC5iaW5kKGMuY29uZmlnKSx0aGlzLnNldFVVSUQ9Yy5jb25maWcuc2V0VVVJRC5iaW5kKGMuY29uZmlnKSx0aGlzLmdldEZpbHRlckV4cHJlc3Npb249Yy5jb25maWcuZ2V0RmlsdGVyRXhwcmVzc2lvbi5iaW5kKGMuY29uZmlnKSx0aGlzLnNldEZpbHRlckV4cHJlc3Npb249Yy5jb25maWcuc2V0RmlsdGVyRXhwcmVzc2lvbi5iaW5kKGMuY29uZmlnKX1yZXR1cm4gcyhlLFt7a2V5OlwiZ2V0VmVyc2lvblwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIGxlLmRlZmF1bHQudmVyc2lvbn19XSxbe2tleTpcImdlbmVyYXRlVVVJRFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHUuZGVmYXVsdC52NCgpfX1dKSxlfSgpKTtnZS5PUEVSQVRJT05TPWZlLmRlZmF1bHQsZ2UuQ0FURUdPUklFUz1kZS5kZWZhdWx0LHQuZGVmYXVsdD1nZSxlLmV4cG9ydHM9dC5kZWZhdWx0fSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gcihlLHQsbil7dmFyIHI9dCYmbnx8MCxpPTA7Zm9yKHQ9dHx8W10sZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csZnVuY3Rpb24oZSl7aTwxNiYmKHRbcitpKytdPWNbZV0pfSk7aTwxNjspdFtyK2krK109MDtyZXR1cm4gdH1mdW5jdGlvbiBpKGUsdCl7dmFyIG49dHx8MCxyPXU7cmV0dXJuIHJbZVtuKytdXStyW2VbbisrXV0rcltlW24rK11dK3JbZVtuKytdXStcIi1cIityW2VbbisrXV0rcltlW24rK11dK1wiLVwiK3JbZVtuKytdXStyW2VbbisrXV0rXCItXCIrcltlW24rK11dK3JbZVtuKytdXStcIi1cIityW2VbbisrXV0rcltlW24rK11dK3JbZVtuKytdXStyW2VbbisrXV0rcltlW24rK11dK3JbZVtuKytdXX1mdW5jdGlvbiBvKGUsdCxuKXt2YXIgcj10JiZufHwwLG89dHx8W107ZT1lfHx7fTt2YXIgcz12b2lkIDAhPT1lLmNsb2Nrc2VxP2UuY2xvY2tzZXE6cCxhPXZvaWQgMCE9PWUubXNlY3M/ZS5tc2VjczoobmV3IERhdGUpLmdldFRpbWUoKSx1PXZvaWQgMCE9PWUubnNlY3M/ZS5uc2VjczpnKzEsYz1hLWQrKHUtZykvMWU0O2lmKGM8MCYmdm9pZCAwPT09ZS5jbG9ja3NlcSYmKHM9cysxJjE2MzgzKSwoYzwwfHxhPmQpJiZ2b2lkIDA9PT1lLm5zZWNzJiYodT0wKSx1Pj0xZTQpdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7ZD1hLGc9dSxwPXMsYSs9MTIyMTkyOTI4ZTU7dmFyIGw9KDFlNCooMjY4NDM1NDU1JmEpK3UpJTQyOTQ5NjcyOTY7b1tyKytdPWw+Pj4yNCYyNTUsb1tyKytdPWw+Pj4xNiYyNTUsb1tyKytdPWw+Pj44JjI1NSxvW3IrK109MjU1Jmw7dmFyIGg9YS80Mjk0OTY3Mjk2KjFlNCYyNjg0MzU0NTU7b1tyKytdPWg+Pj44JjI1NSxvW3IrK109MjU1Jmgsb1tyKytdPWg+Pj4yNCYxNXwxNixvW3IrK109aD4+PjE2JjI1NSxvW3IrK109cz4+Pjh8MTI4LG9bcisrXT0yNTUmcztmb3IodmFyIHk9ZS5ub2RlfHxmLHY9MDt2PDY7disrKW9bcit2XT15W3ZdO3JldHVybiB0P3Q6aShvKX1mdW5jdGlvbiBzKGUsdCxuKXt2YXIgcj10JiZufHwwO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYodD1cImJpbmFyeVwiPT1lP25ldyBBcnJheSgxNik6bnVsbCxlPW51bGwpLGU9ZXx8e307dmFyIG89ZS5yYW5kb218fChlLnJuZ3x8YSkoKTtpZihvWzZdPTE1Jm9bNl18NjQsb1s4XT02MyZvWzhdfDEyOCx0KWZvcih2YXIgcz0wO3M8MTY7cysrKXRbcitzXT1vW3NdO3JldHVybiB0fHxpKG8pfWZvcih2YXIgYT1uKDMpLHU9W10sYz17fSxsPTA7bDwyNTY7bCsrKXVbbF09KGwrMjU2KS50b1N0cmluZygxNikuc3Vic3RyKDEpLGNbdVtsXV09bDt2YXIgaD1hKCksZj1bMXxoWzBdLGhbMV0saFsyXSxoWzNdLGhbNF0saFs1XV0scD0xNjM4MyYoaFs2XTw8OHxoWzddKSxkPTAsZz0wLHk9czt5LnYxPW8seS52ND1zLHkucGFyc2U9cix5LnVucGFyc2U9aSxlLmV4cG9ydHM9eX0sZnVuY3Rpb24oZSx0KXsoZnVuY3Rpb24odCl7dmFyIG4scj10LmNyeXB0b3x8dC5tc0NyeXB0bztpZihyJiZyLmdldFJhbmRvbVZhbHVlcyl7dmFyIGk9bmV3IFVpbnQ4QXJyYXkoMTYpO249ZnVuY3Rpb24oKXtyZXR1cm4gci5nZXRSYW5kb21WYWx1ZXMoaSksaX19aWYoIW4pe3ZhciBvPW5ldyBBcnJheSgxNik7bj1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PTA7dDwxNjt0KyspMD09PSgzJnQpJiYoZT00Mjk0OTY3Mjk2Kk1hdGgucmFuZG9tKCkpLG9bdF09ZT4+PigoMyZ0KTw8MykmMjU1O3JldHVybiBvfX1lLmV4cG9ydHM9bn0pLmNhbGwodCxmdW5jdGlvbigpe3JldHVybiB0aGlzfSgpKX0sZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBvKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIHI9dFtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsci5rZXkscil9fXJldHVybiBmdW5jdGlvbih0LG4scil7cmV0dXJuIG4mJmUodC5wcm90b3R5cGUsbiksciYmZSh0LHIpLHR9fSgpLGE9big2KSx1PWkoYSksYz1uKDExKSxsPShpKGMpLG4oMTIpKSxoPShpKGwpLG4oMTYpKSxmPWkoaCkscD0obigxMyksZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe3ZhciBuPXQuY29uZmlnLHI9dC5jcnlwdG8saT10LnNlbmRCZWFjb247byh0aGlzLGUpLHRoaXMuX2NvbmZpZz1uLHRoaXMuX2NyeXB0bz1yLHRoaXMuX3NlbmRCZWFjb249aSx0aGlzLl9tYXhTdWJEb21haW49MjAsdGhpcy5fY3VycmVudFN1YkRvbWFpbj1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5fbWF4U3ViRG9tYWluKSx0aGlzLl9wcm92aWRlZEZRRE49KHRoaXMuX2NvbmZpZy5zZWN1cmU/XCJodHRwczovL1wiOlwiaHR0cDovL1wiKSt0aGlzLl9jb25maWcub3JpZ2luLHRoaXMuX2NvcmVQYXJhbXM9e30sdGhpcy5zaGlmdFN0YW5kYXJkT3JpZ2luKCl9cmV0dXJuIHMoZSxbe2tleTpcIm5leHRPcmlnaW5cIix2YWx1ZTpmdW5jdGlvbigpe2lmKHRoaXMuX3Byb3ZpZGVkRlFETi5pbmRleE9mKFwicHVic3ViLlwiKT09PS0xKXJldHVybiB0aGlzLl9wcm92aWRlZEZRRE47dmFyIGU9dm9pZCAwO3JldHVybiB0aGlzLl9jdXJyZW50U3ViRG9tYWluPXRoaXMuX2N1cnJlbnRTdWJEb21haW4rMSx0aGlzLl9jdXJyZW50U3ViRG9tYWluPj10aGlzLl9tYXhTdWJEb21haW4mJih0aGlzLl9jdXJyZW50U3ViRG9tYWluPTEpLGU9dGhpcy5fY3VycmVudFN1YkRvbWFpbi50b1N0cmluZygpLHRoaXMuX3Byb3ZpZGVkRlFETi5yZXBsYWNlKFwicHVic3ViXCIsXCJwc1wiK2UpfX0se2tleTpcInNoaWZ0U3RhbmRhcmRPcmlnaW5cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07cmV0dXJuIHRoaXMuX3N0YW5kYXJkT3JpZ2luPXRoaXMubmV4dE9yaWdpbihlKSx0aGlzLl9zdGFuZGFyZE9yaWdpbn19LHtrZXk6XCJnZXRTdGFuZGFyZE9yaWdpblwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3N0YW5kYXJkT3JpZ2lufX0se2tleTpcIlBPU1RcIix2YWx1ZTpmdW5jdGlvbihlLHQsbixyKXt2YXIgaT11LmRlZmF1bHQucG9zdCh0aGlzLmdldFN0YW5kYXJkT3JpZ2luKCkrbi51cmwpLnF1ZXJ5KGUpLnNlbmQodCk7cmV0dXJuIHRoaXMuX2Fic3RyYWN0ZWRYRFIoaSxuLHIpfX0se2tleTpcIkdFVFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcj11LmRlZmF1bHQuZ2V0KHRoaXMuZ2V0U3RhbmRhcmRPcmlnaW4oKSt0LnVybCkucXVlcnkoZSk7cmV0dXJuIHRoaXMuX2Fic3RyYWN0ZWRYRFIocix0LG4pfX0se2tleTpcIl9hYnN0cmFjdGVkWERSXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXM7cmV0dXJuIHRoaXMuX2NvbmZpZy5sb2dWZXJib3NpdHkmJihlPWUudXNlKHRoaXMuX2F0dGFjaFN1cGVyYWdlbnRMb2dnZXIpKSxlLnRpbWVvdXQodC50aW1lb3V0KS5lbmQoZnVuY3Rpb24oZSxpKXt2YXIgbz17fTtpZihvLmVycm9yPW51bGwhPT1lLG8ub3BlcmF0aW9uPXQub3BlcmF0aW9uLGkmJmkuc3RhdHVzJiYoby5zdGF0dXNDb2RlPWkuc3RhdHVzKSxlKXJldHVybiBvLmVycm9yRGF0YT1lLG8uY2F0ZWdvcnk9ci5fZGV0ZWN0RXJyb3JDYXRlZ29yeShlKSxuKG8sbnVsbCk7dmFyIHM9SlNPTi5wYXJzZShpLnRleHQpO3JldHVybiBuKG8scyl9KX19LHtrZXk6XCJfZGV0ZWN0RXJyb3JDYXRlZ29yeVwiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKFwiRU5PVEZPVU5EXCI9PT1lLmNvZGUpcmV0dXJuIGYuZGVmYXVsdC5QTk5ldHdvcmtJc3N1ZXNDYXRlZ29yeTtpZigwPT09ZS5zdGF0dXN8fGUuaGFzT3duUHJvcGVydHkoXCJzdGF0dXNcIikmJlwidW5kZWZpbmVkXCI9PXR5cGVvZiBlLnN0YXR1cylyZXR1cm4gZi5kZWZhdWx0LlBOTmV0d29ya0lzc3Vlc0NhdGVnb3J5O2lmKGUudGltZW91dClyZXR1cm4gZi5kZWZhdWx0LlBOVGltZW91dENhdGVnb3J5O2lmKGUucmVzcG9uc2Upe2lmKGUucmVzcG9uc2UuYmFkUmVxdWVzdClyZXR1cm4gZi5kZWZhdWx0LlBOQmFkUmVxdWVzdENhdGVnb3J5O2lmKGUucmVzcG9uc2UuZm9yYmlkZGVuKXJldHVybiBmLmRlZmF1bHQuUE5BY2Nlc3NEZW5pZWRDYXRlZ29yeX1yZXR1cm4gZi5kZWZhdWx0LlBOVW5rbm93bkNhdGVnb3J5fX0se2tleTpcIl9hdHRhY2hTdXBlcmFnZW50TG9nZ2VyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZnVuY3Rpb24oKXtyZXR1cm4gciYmci5sb2c/cjp3aW5kb3cmJndpbmRvdy5jb25zb2xlJiZ3aW5kb3cuY29uc29sZS5sb2c/d2luZG93LmNvbnNvbGU6cn0sbj0obmV3IERhdGUpLmdldFRpbWUoKSxpPShuZXcgRGF0ZSkudG9JU09TdHJpbmcoKSxvPXQoKTtvLmxvZyhcIjw8PDw8XCIpLG8ubG9nKFwiW1wiK2krXCJdXCIsXCJcXG5cIixlLnVybCxcIlxcblwiLGUucXMpLG8ubG9nKFwiLS0tLS1cIiksZS5vbihcInJlc3BvbnNlXCIsZnVuY3Rpb24odCl7dmFyIHI9KG5ldyBEYXRlKS5nZXRUaW1lKCksaT1yLW4scz0obmV3IERhdGUpLnRvSVNPU3RyaW5nKCk7by5sb2coXCI+Pj4+Pj5cIiksby5sb2coXCJbXCIrcytcIiAvIFwiK2krXCJdXCIsXCJcXG5cIixlLnVybCxcIlxcblwiLGUucXMsXCJcXG5cIix0LnRleHQpLG8ubG9nKFwiLS0tLS1cIil9KX19XSksZX0oKSk7dC5kZWZhdWx0PXAsZS5leHBvcnRzPXQuZGVmYXVsdH0pLmNhbGwodCxuKDUpKX0sZnVuY3Rpb24oZSx0KXt9LGZ1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCl7ZnVuY3Rpb24gcigpe31mdW5jdGlvbiBpKGUpe2lmKCF2KGUpKXJldHVybiBlO3ZhciB0PVtdO2Zvcih2YXIgbiBpbiBlKW8odCxuLGVbbl0pO3JldHVybiB0LmpvaW4oXCImXCIpfWZ1bmN0aW9uIG8oZSx0LG4pe2lmKG51bGwhPW4paWYoQXJyYXkuaXNBcnJheShuKSluLmZvckVhY2goZnVuY3Rpb24obil7byhlLHQsbil9KTtlbHNlIGlmKHYobikpZm9yKHZhciByIGluIG4pbyhlLHQrXCJbXCIrcitcIl1cIixuW3JdKTtlbHNlIGUucHVzaChlbmNvZGVVUklDb21wb25lbnQodCkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG4pKTtlbHNlIG51bGw9PT1uJiZlLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHQpKX1mdW5jdGlvbiBzKGUpe2Zvcih2YXIgdCxuLHI9e30saT1lLnNwbGl0KFwiJlwiKSxvPTAscz1pLmxlbmd0aDtvPHM7KytvKXQ9aVtvXSxuPXQuaW5kZXhPZihcIj1cIiksbj09LTE/cltkZWNvZGVVUklDb21wb25lbnQodCldPVwiXCI6cltkZWNvZGVVUklDb21wb25lbnQodC5zbGljZSgwLG4pKV09ZGVjb2RlVVJJQ29tcG9uZW50KHQuc2xpY2UobisxKSk7cmV0dXJuIHJ9ZnVuY3Rpb24gYShlKXt2YXIgdCxuLHIsaSxvPWUuc3BsaXQoL1xccj9cXG4vKSxzPXt9O28ucG9wKCk7Zm9yKHZhciBhPTAsdT1vLmxlbmd0aDthPHU7KythKW49b1thXSx0PW4uaW5kZXhPZihcIjpcIikscj1uLnNsaWNlKDAsdCkudG9Mb3dlckNhc2UoKSxpPV8obi5zbGljZSh0KzEpKSxzW3JdPWk7cmV0dXJuIHN9ZnVuY3Rpb24gdShlKXtyZXR1cm4vW1xcLytdanNvblxcYi8udGVzdChlKX1mdW5jdGlvbiBjKGUpe3JldHVybiBlLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCl9ZnVuY3Rpb24gbChlKXtyZXR1cm4gZS5zcGxpdCgvICo7ICovKS5yZWR1Y2UoZnVuY3Rpb24oZSx0KXt2YXIgbj10LnNwbGl0KC8gKj0gKi8pLHI9bi5zaGlmdCgpLGk9bi5zaGlmdCgpO3JldHVybiByJiZpJiYoZVtyXT1pKSxlfSx7fSl9ZnVuY3Rpb24gaChlLHQpe3Q9dHx8e30sdGhpcy5yZXE9ZSx0aGlzLnhocj10aGlzLnJlcS54aHIsdGhpcy50ZXh0PVwiSEVBRFwiIT10aGlzLnJlcS5tZXRob2QmJihcIlwiPT09dGhpcy54aHIucmVzcG9uc2VUeXBlfHxcInRleHRcIj09PXRoaXMueGhyLnJlc3BvbnNlVHlwZSl8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0aGlzLnhoci5yZXNwb25zZVR5cGU/dGhpcy54aHIucmVzcG9uc2VUZXh0Om51bGwsdGhpcy5zdGF0dXNUZXh0PXRoaXMucmVxLnhoci5zdGF0dXNUZXh0LHRoaXMuX3NldFN0YXR1c1Byb3BlcnRpZXModGhpcy54aHIuc3RhdHVzKSx0aGlzLmhlYWRlcj10aGlzLmhlYWRlcnM9YSh0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSksdGhpcy5oZWFkZXJbXCJjb250ZW50LXR5cGVcIl09dGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIiksdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlciksdGhpcy5ib2R5PVwiSEVBRFwiIT10aGlzLnJlcS5tZXRob2Q/dGhpcy5fcGFyc2VCb2R5KHRoaXMudGV4dD90aGlzLnRleHQ6dGhpcy54aHIucmVzcG9uc2UpOm51bGx9ZnVuY3Rpb24gZihlLHQpe3ZhciBuPXRoaXM7dGhpcy5fcXVlcnk9dGhpcy5fcXVlcnl8fFtdLHRoaXMubWV0aG9kPWUsdGhpcy51cmw9dCx0aGlzLmhlYWRlcj17fSx0aGlzLl9oZWFkZXI9e30sdGhpcy5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dmFyIGU9bnVsbCx0PW51bGw7dHJ5e3Q9bmV3IGgobil9Y2F0Y2godCl7cmV0dXJuIGU9bmV3IEVycm9yKFwiUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2VcIiksZS5wYXJzZT0hMCxlLm9yaWdpbmFsPXQsZS5yYXdSZXNwb25zZT1uLnhociYmbi54aHIucmVzcG9uc2VUZXh0P24ueGhyLnJlc3BvbnNlVGV4dDpudWxsLGUuc3RhdHVzQ29kZT1uLnhociYmbi54aHIuc3RhdHVzP24ueGhyLnN0YXR1czpudWxsLG4uY2FsbGJhY2soZSl9bi5lbWl0KFwicmVzcG9uc2VcIix0KTt2YXIgcjt0cnl7KHQuc3RhdHVzPDIwMHx8dC5zdGF0dXM+PTMwMCkmJihyPW5ldyBFcnJvcih0LnN0YXR1c1RleHR8fFwiVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2VcIiksci5vcmlnaW5hbD1lLHIucmVzcG9uc2U9dCxyLnN0YXR1cz10LnN0YXR1cyl9Y2F0Y2goZSl7cj1lfXI/bi5jYWxsYmFjayhyLHQpOm4uY2FsbGJhY2sobnVsbCx0KX0pfWZ1bmN0aW9uIHAoZSx0KXt2YXIgbj1iKFwiREVMRVRFXCIsZSk7cmV0dXJuIHQmJm4uZW5kKHQpLG59dmFyIGQ7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz9kPXdpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9kPXNlbGY6KHQud2FybihcIlVzaW5nIGJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIiksZD10aGlzKTt2YXIgZz1uKDcpLHk9big4KSx2PW4oOSksYj1lLmV4cG9ydHM9bigxMCkuYmluZChudWxsLGYpO2IuZ2V0WEhSPWZ1bmN0aW9uKCl7aWYoISghZC5YTUxIdHRwUmVxdWVzdHx8ZC5sb2NhdGlvbiYmXCJmaWxlOlwiPT1kLmxvY2F0aW9uLnByb3RvY29sJiZkLkFjdGl2ZVhPYmplY3QpKXJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7dHJ5e3JldHVybiBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpfWNhdGNoKGUpe310cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFAuNi4wXCIpfWNhdGNoKGUpe310cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFAuMy4wXCIpfWNhdGNoKGUpe310cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTXN4bWwyLlhNTEhUVFBcIil9Y2F0Y2goZSl7fXRocm93IEVycm9yKFwiQnJvd3Nlci1vbmx5IHZlcmlzb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFJcIil9O3ZhciBfPVwiXCIudHJpbT9mdW5jdGlvbihlKXtyZXR1cm4gZS50cmltKCl9OmZ1bmN0aW9uKGUpe3JldHVybiBlLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZyxcIlwiKX07Yi5zZXJpYWxpemVPYmplY3Q9aSxiLnBhcnNlU3RyaW5nPXMsYi50eXBlcz17aHRtbDpcInRleHQvaHRtbFwiLGpzb246XCJhcHBsaWNhdGlvbi9qc29uXCIseG1sOlwiYXBwbGljYXRpb24veG1sXCIsdXJsZW5jb2RlZDpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLGZvcm06XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcImZvcm0tZGF0YVwiOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJ9LGIuc2VyaWFsaXplPXtcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOmksXCJhcHBsaWNhdGlvbi9qc29uXCI6SlNPTi5zdHJpbmdpZnl9LGIucGFyc2U9e1wiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI6cyxcImFwcGxpY2F0aW9uL2pzb25cIjpKU09OLnBhcnNlfSxoLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuaGVhZGVyW2UudG9Mb3dlckNhc2UoKV19LGgucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuaGVhZGVyW1wiY29udGVudC10eXBlXCJdfHxcIlwiO3RoaXMudHlwZT1jKHQpO3ZhciBuPWwodCk7Zm9yKHZhciByIGluIG4pdGhpc1tyXT1uW3JdfSxoLnByb3RvdHlwZS5fcGFyc2VCb2R5PWZ1bmN0aW9uKGUpe3ZhciB0PWIucGFyc2VbdGhpcy50eXBlXTtyZXR1cm4hdCYmdSh0aGlzLnR5cGUpJiYodD1iLnBhcnNlW1wiYXBwbGljYXRpb24vanNvblwiXSksdCYmZSYmKGUubGVuZ3RofHxlIGluc3RhbmNlb2YgT2JqZWN0KT90KGUpOm51bGx9LGgucHJvdG90eXBlLl9zZXRTdGF0dXNQcm9wZXJ0aWVzPWZ1bmN0aW9uKGUpezEyMjM9PT1lJiYoZT0yMDQpO3ZhciB0PWUvMTAwfDA7dGhpcy5zdGF0dXM9dGhpcy5zdGF0dXNDb2RlPWUsdGhpcy5zdGF0dXNUeXBlPXQsdGhpcy5pbmZvPTE9PXQsdGhpcy5vaz0yPT10LHRoaXMuY2xpZW50RXJyb3I9ND09dCx0aGlzLnNlcnZlckVycm9yPTU9PXQsdGhpcy5lcnJvcj0oND09dHx8NT09dCkmJnRoaXMudG9FcnJvcigpLHRoaXMuYWNjZXB0ZWQ9MjAyPT1lLHRoaXMubm9Db250ZW50PTIwND09ZSx0aGlzLmJhZFJlcXVlc3Q9NDAwPT1lLHRoaXMudW5hdXRob3JpemVkPTQwMT09ZSx0aGlzLm5vdEFjY2VwdGFibGU9NDA2PT1lLHRoaXMubm90Rm91bmQ9NDA0PT1lLHRoaXMuZm9yYmlkZGVuPTQwMz09ZX0saC5wcm90b3R5cGUudG9FcnJvcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMucmVxLHQ9ZS5tZXRob2Qsbj1lLnVybCxyPVwiY2Fubm90IFwiK3QrXCIgXCIrbitcIiAoXCIrdGhpcy5zdGF0dXMrXCIpXCIsaT1uZXcgRXJyb3Iocik7cmV0dXJuIGkuc3RhdHVzPXRoaXMuc3RhdHVzLGkubWV0aG9kPXQsaS51cmw9bixpfSxiLlJlc3BvbnNlPWgsZyhmLnByb3RvdHlwZSk7Zm9yKHZhciBtIGluIHkpZi5wcm90b3R5cGVbbV09eVttXTtmLnByb3RvdHlwZS50eXBlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnNldChcIkNvbnRlbnQtVHlwZVwiLGIudHlwZXNbZV18fGUpLHRoaXN9LGYucHJvdG90eXBlLnJlc3BvbnNlVHlwZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fcmVzcG9uc2VUeXBlPWUsdGhpc30sZi5wcm90b3R5cGUuYWNjZXB0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnNldChcIkFjY2VwdFwiLGIudHlwZXNbZV18fGUpLHRoaXN9LGYucHJvdG90eXBlLmF1dGg9ZnVuY3Rpb24oZSx0LG4pe3N3aXRjaChufHwobj17dHlwZTpcImJhc2ljXCJ9KSxuLnR5cGUpe2Nhc2VcImJhc2ljXCI6dmFyIHI9YnRvYShlK1wiOlwiK3QpO3RoaXMuc2V0KFwiQXV0aG9yaXphdGlvblwiLFwiQmFzaWMgXCIrcik7YnJlYWs7Y2FzZVwiYXV0b1wiOnRoaXMudXNlcm5hbWU9ZSx0aGlzLnBhc3N3b3JkPXR9cmV0dXJuIHRoaXN9LGYucHJvdG90eXBlLnF1ZXJ5PWZ1bmN0aW9uKGUpe3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBlJiYoZT1pKGUpKSxlJiZ0aGlzLl9xdWVyeS5wdXNoKGUpLHRoaXN9LGYucHJvdG90eXBlLmF0dGFjaD1mdW5jdGlvbihlLHQsbil7cmV0dXJuIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGUsdCxufHx0Lm5hbWUpLHRoaXN9LGYucHJvdG90eXBlLl9nZXRGb3JtRGF0YT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9mb3JtRGF0YXx8KHRoaXMuX2Zvcm1EYXRhPW5ldyBkLkZvcm1EYXRhKSx0aGlzLl9mb3JtRGF0YX0sZi5wcm90b3R5cGUuY2FsbGJhY2s9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLl9jYWxsYmFjazt0aGlzLmNsZWFyVGltZW91dCgpLG4oZSx0KX0sZi5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvcj1mdW5jdGlvbigpe3ZhciBlPW5ldyBFcnJvcihcIlJlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy5cIik7ZS5jcm9zc0RvbWFpbj0hMCxlLnN0YXR1cz10aGlzLnN0YXR1cyxlLm1ldGhvZD10aGlzLm1ldGhvZCxlLnVybD10aGlzLnVybCx0aGlzLmNhbGxiYWNrKGUpfSxmLnByb3RvdHlwZS5fdGltZW91dEVycm9yPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5fdGltZW91dCx0PW5ldyBFcnJvcihcInRpbWVvdXQgb2YgXCIrZStcIm1zIGV4Y2VlZGVkXCIpO3QudGltZW91dD1lLHRoaXMuY2FsbGJhY2sodCl9LGYucHJvdG90eXBlLl9hcHBlbmRRdWVyeVN0cmluZz1mdW5jdGlvbigpe3ZhciBlPXRoaXMuX3F1ZXJ5LmpvaW4oXCImXCIpO2UmJih0aGlzLnVybCs9fnRoaXMudXJsLmluZGV4T2YoXCI/XCIpP1wiJlwiK2U6XCI/XCIrZSl9LGYucHJvdG90eXBlLmVuZD1mdW5jdGlvbihlKXt2YXIgdD10aGlzLG49dGhpcy54aHI9Yi5nZXRYSFIoKSxpPXRoaXMuX3RpbWVvdXQsbz10aGlzLl9mb3JtRGF0YXx8dGhpcy5fZGF0YTt0aGlzLl9jYWxsYmFjaz1lfHxyLG4ub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09bi5yZWFkeVN0YXRlKXt2YXIgZTt0cnl7ZT1uLnN0YXR1c31jYXRjaCh0KXtlPTB9aWYoMD09ZSl7aWYodC50aW1lZG91dClyZXR1cm4gdC5fdGltZW91dEVycm9yKCk7aWYodC5fYWJvcnRlZClyZXR1cm47cmV0dXJuIHQuY3Jvc3NEb21haW5FcnJvcigpfXQuZW1pdChcImVuZFwiKX19O3ZhciBzPWZ1bmN0aW9uKGUsbil7bi50b3RhbD4wJiYobi5wZXJjZW50PW4ubG9hZGVkL24udG90YWwqMTAwKSxuLmRpcmVjdGlvbj1lLHQuZW1pdChcInByb2dyZXNzXCIsbil9O2lmKHRoaXMuaGFzTGlzdGVuZXJzKFwicHJvZ3Jlc3NcIikpdHJ5e24ub25wcm9ncmVzcz1zLmJpbmQobnVsbCxcImRvd25sb2FkXCIpLG4udXBsb2FkJiYobi51cGxvYWQub25wcm9ncmVzcz1zLmJpbmQobnVsbCxcInVwbG9hZFwiKSl9Y2F0Y2goZSl7fWlmKGkmJiF0aGlzLl90aW1lciYmKHRoaXMuX3RpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnRpbWVkb3V0PSEwLHQuYWJvcnQoKX0saSkpLHRoaXMuX2FwcGVuZFF1ZXJ5U3RyaW5nKCksdGhpcy51c2VybmFtZSYmdGhpcy5wYXNzd29yZD9uLm9wZW4odGhpcy5tZXRob2QsdGhpcy51cmwsITAsdGhpcy51c2VybmFtZSx0aGlzLnBhc3N3b3JkKTpuLm9wZW4odGhpcy5tZXRob2QsdGhpcy51cmwsITApLHRoaXMuX3dpdGhDcmVkZW50aWFscyYmKG4ud2l0aENyZWRlbnRpYWxzPSEwKSxcIkdFVFwiIT10aGlzLm1ldGhvZCYmXCJIRUFEXCIhPXRoaXMubWV0aG9kJiZcInN0cmluZ1wiIT10eXBlb2YgbyYmIXRoaXMuX2lzSG9zdChvKSl7dmFyIGE9dGhpcy5faGVhZGVyW1wiY29udGVudC10eXBlXCJdLGM9dGhpcy5fc2VyaWFsaXplcnx8Yi5zZXJpYWxpemVbYT9hLnNwbGl0KFwiO1wiKVswXTpcIlwiXTshYyYmdShhKSYmKGM9Yi5zZXJpYWxpemVbXCJhcHBsaWNhdGlvbi9qc29uXCJdKSxjJiYobz1jKG8pKX1mb3IodmFyIGwgaW4gdGhpcy5oZWFkZXIpbnVsbCE9dGhpcy5oZWFkZXJbbF0mJm4uc2V0UmVxdWVzdEhlYWRlcihsLHRoaXMuaGVhZGVyW2xdKTtyZXR1cm4gdGhpcy5fcmVzcG9uc2VUeXBlJiYobi5yZXNwb25zZVR5cGU9dGhpcy5fcmVzcG9uc2VUeXBlKSx0aGlzLmVtaXQoXCJyZXF1ZXN0XCIsdGhpcyksbi5zZW5kKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBvP286bnVsbCksdGhpc30sYi5SZXF1ZXN0PWYsYi5nZXQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWIoXCJHRVRcIixlKTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYobj10LHQ9bnVsbCksdCYmci5xdWVyeSh0KSxuJiZyLmVuZChuKSxyfSxiLmhlYWQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWIoXCJIRUFEXCIsZSk7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKG49dCx0PW51bGwpLHQmJnIuc2VuZCh0KSxuJiZyLmVuZChuKSxyfSxiLm9wdGlvbnM9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWIoXCJPUFRJT05TXCIsZSk7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKG49dCx0PW51bGwpLHQmJnIuc2VuZCh0KSxuJiZyLmVuZChuKSxyfSxiLmRlbD1wLGIuZGVsZXRlPXAsYi5wYXRjaD1mdW5jdGlvbihlLHQsbil7dmFyIHI9YihcIlBBVENIXCIsZSk7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKG49dCx0PW51bGwpLHQmJnIuc2VuZCh0KSxuJiZyLmVuZChuKSxyfSxiLnBvc3Q9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPWIoXCJQT1NUXCIsZSk7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKG49dCx0PW51bGwpLHQmJnIuc2VuZCh0KSxuJiZyLmVuZChuKSxyfSxiLnB1dD1mdW5jdGlvbihlLHQsbil7dmFyIHI9YihcIlBVVFwiLGUpO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJihuPXQsdD1udWxsKSx0JiZyLnNlbmQodCksbiYmci5lbmQobikscn19KS5jYWxsKHQsbig1KSl9LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiByKGUpe2lmKGUpcmV0dXJuIGkoZSl9ZnVuY3Rpb24gaShlKXtmb3IodmFyIHQgaW4gci5wcm90b3R5cGUpZVt0XT1yLnByb3RvdHlwZVt0XTtyZXR1cm4gZX1lLmV4cG9ydHM9cixyLnByb3RvdHlwZS5vbj1yLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuX2NhbGxiYWNrcz10aGlzLl9jYWxsYmFja3N8fHt9LCh0aGlzLl9jYWxsYmFja3NbXCIkXCIrZV09dGhpcy5fY2FsbGJhY2tzW1wiJFwiK2VdfHxbXSkucHVzaCh0KSx0aGlzfSxyLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3RoaXMub2ZmKGUsbiksdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIG4uZm49dCx0aGlzLm9uKGUsbiksdGhpc30sci5wcm90b3R5cGUub2ZmPXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1yLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc3x8e30sMD09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fY2FsbGJhY2tzPXt9LHRoaXM7dmFyIG49dGhpcy5fY2FsbGJhY2tzW1wiJFwiK2VdO2lmKCFuKXJldHVybiB0aGlzO2lmKDE9PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbXCIkXCIrZV0sdGhpcztmb3IodmFyIHIsaT0wO2k8bi5sZW5ndGg7aSsrKWlmKHI9bltpXSxyPT09dHx8ci5mbj09PXQpe24uc3BsaWNlKGksMSk7YnJlYWt9cmV0dXJuIHRoaXN9LHIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oZSl7dGhpcy5fY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc3x8e307dmFyIHQ9W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSksbj10aGlzLl9jYWxsYmFja3NbXCIkXCIrZV07aWYobil7bj1uLnNsaWNlKDApO2Zvcih2YXIgcj0wLGk9bi5sZW5ndGg7cjxpOysrciluW3JdLmFwcGx5KHRoaXMsdCl9cmV0dXJuIHRoaXN9LHIucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc3x8e30sdGhpcy5fY2FsbGJhY2tzW1wiJFwiK2VdfHxbXX0sci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiEhdGhpcy5saXN0ZW5lcnMoZSkubGVuZ3RofX0sZnVuY3Rpb24oZSx0LG4pe3ZhciByPW4oOSk7dC5jbGVhclRpbWVvdXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fdGltZW91dD0wLGNsZWFyVGltZW91dCh0aGlzLl90aW1lciksdGhpc30sdC5wYXJzZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fcGFyc2VyPWUsdGhpc30sdC5zZXJpYWxpemU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX3NlcmlhbGl6ZXI9ZSx0aGlzfSx0LnRpbWVvdXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX3RpbWVvdXQ9ZSx0aGlzfSx0LnRoZW49ZnVuY3Rpb24oZSx0KXtpZighdGhpcy5fZnVsbGZpbGxlZFByb21pc2Upe3ZhciBuPXRoaXM7dGhpcy5fZnVsbGZpbGxlZFByb21pc2U9bmV3IFByb21pc2UoZnVuY3Rpb24oZSx0KXtuLmVuZChmdW5jdGlvbihuLHIpe24/dChuKTplKHIpfSl9KX1yZXR1cm4gdGhpcy5fZnVsbGZpbGxlZFByb21pc2UudGhlbihlLHQpfSx0LmNhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnRoZW4odm9pZCAwLGUpfSx0LnVzZT1mdW5jdGlvbihlKXtyZXR1cm4gZSh0aGlzKSx0aGlzfSx0LmdldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5faGVhZGVyW2UudG9Mb3dlckNhc2UoKV19LHQuZ2V0SGVhZGVyPXQuZ2V0LHQuc2V0PWZ1bmN0aW9uKGUsdCl7aWYocihlKSl7Zm9yKHZhciBuIGluIGUpdGhpcy5zZXQobixlW25dKTtyZXR1cm4gdGhpc31yZXR1cm4gdGhpcy5faGVhZGVyW2UudG9Mb3dlckNhc2UoKV09dCx0aGlzLmhlYWRlcltlXT10LHRoaXN9LHQudW5zZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSB0aGlzLl9oZWFkZXJbZS50b0xvd2VyQ2FzZSgpXSxkZWxldGUgdGhpcy5oZWFkZXJbZV0sdGhpc30sdC5maWVsZD1mdW5jdGlvbihlLHQpe2lmKG51bGw9PT1lfHx2b2lkIDA9PT1lKXRocm93IG5ldyBFcnJvcihcIi5maWVsZChuYW1lLCB2YWwpIG5hbWUgY2FuIG5vdCBiZSBlbXB0eVwiKTtpZihyKGUpKXtmb3IodmFyIG4gaW4gZSl0aGlzLmZpZWxkKG4sZVtuXSk7cmV0dXJuIHRoaXN9aWYobnVsbD09PXR8fHZvaWQgMD09PXQpdGhyb3cgbmV3IEVycm9yKFwiLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHlcIik7cmV0dXJuIHRoaXMuX2dldEZvcm1EYXRhKCkuYXBwZW5kKGUsdCksdGhpc30sdC5hYm9ydD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9hYm9ydGVkP3RoaXM6KHRoaXMuX2Fib3J0ZWQ9ITAsdGhpcy54aHImJnRoaXMueGhyLmFib3J0KCksdGhpcy5yZXEmJnRoaXMucmVxLmFib3J0KCksdGhpcy5jbGVhclRpbWVvdXQoKSx0aGlzLmVtaXQoXCJhYm9ydFwiKSx0aGlzKX0sdC53aXRoQ3JlZGVudGlhbHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd2l0aENyZWRlbnRpYWxzPSEwLHRoaXN9LHQucmVkaXJlY3RzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9tYXhSZWRpcmVjdHM9ZSx0aGlzfSx0LnRvSlNPTj1mdW5jdGlvbigpe3JldHVybnttZXRob2Q6dGhpcy5tZXRob2QsdXJsOnRoaXMudXJsLGRhdGE6dGhpcy5fZGF0YSxoZWFkZXJzOnRoaXMuX2hlYWRlcn19LHQuX2lzSG9zdD1mdW5jdGlvbihlKXt2YXIgdD17fS50b1N0cmluZy5jYWxsKGUpO3N3aXRjaCh0KXtjYXNlXCJbb2JqZWN0IEZpbGVdXCI6Y2FzZVwiW29iamVjdCBCbG9iXVwiOmNhc2VcIltvYmplY3QgRm9ybURhdGFdXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LHQuc2VuZD1mdW5jdGlvbihlKXt2YXIgdD1yKGUpLG49dGhpcy5faGVhZGVyW1wiY29udGVudC10eXBlXCJdO2lmKHQmJnIodGhpcy5fZGF0YSkpZm9yKHZhciBpIGluIGUpdGhpcy5fZGF0YVtpXT1lW2ldO2Vsc2VcInN0cmluZ1wiPT10eXBlb2YgZT8obnx8dGhpcy50eXBlKFwiZm9ybVwiKSxuPXRoaXMuX2hlYWRlcltcImNvbnRlbnQtdHlwZVwiXSxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiPT1uP3RoaXMuX2RhdGE9dGhpcy5fZGF0YT90aGlzLl9kYXRhK1wiJlwiK2U6ZTp0aGlzLl9kYXRhPSh0aGlzLl9kYXRhfHxcIlwiKStlKTp0aGlzLl9kYXRhPWU7cmV0dXJuIXR8fHRoaXMuX2lzSG9zdChlKT90aGlzOihufHx0aGlzLnR5cGUoXCJqc29uXCIpLHRoaXMpfX0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiBudWxsIT09ZSYmXCJvYmplY3RcIj09dHlwZW9mIGV9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQsbil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbj9uZXcgZShcIkdFVFwiLHQpLmVuZChuKToyPT1hcmd1bWVudHMubGVuZ3RoP25ldyBlKFwiR0VUXCIsdCk6bmV3IGUodCxuKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixyKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxyJiZlKHQsciksdH19KCkscz1uKDEyKSxhPShyKHMpLG4oMTUpKSx1PXIoYSksYz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7dmFyIG49dC5jb25maWc7aSh0aGlzLGUpLHRoaXMuX2NvbmZpZz1uLHRoaXMuX2l2PVwiMDEyMzQ1Njc4OTAxMjM0NVwiLHRoaXMuX2FsbG93ZWRLZXlFbmNvZGluZ3M9W1wiaGV4XCIsXCJ1dGY4XCIsXCJiYXNlNjRcIixcImJpbmFyeVwiXSx0aGlzLl9hbGxvd2VkS2V5TGVuZ3Rocz1bMTI4LDI1Nl0sdGhpcy5fYWxsb3dlZE1vZGVzPVtcImVjYlwiLFwiY2JjXCJdLHRoaXMuX2RlZmF1bHRPcHRpb25zPXtlbmNyeXB0S2V5OiEwLGtleUVuY29kaW5nOlwidXRmOFwiLGtleUxlbmd0aDoyNTYsbW9kZTpcImNiY1wifX1yZXR1cm4gbyhlLFt7a2V5OlwiSE1BQ1NIQTI1NlwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXUuZGVmYXVsdC5IbWFjU0hBMjU2KGUsdGhpcy5fY29uZmlnLnNlY3JldEtleSk7cmV0dXJuIHQudG9TdHJpbmcodS5kZWZhdWx0LmVuYy5CYXNlNjQpfX0se2tleTpcIlNIQTI1NlwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB1LmRlZmF1bHQuU0hBMjU2KGUpLnRvU3RyaW5nKHUuZGVmYXVsdC5lbmMuSGV4KX19LHtrZXk6XCJfcGFyc2VPcHRpb25zXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9ZXx8e307cmV0dXJuIHQuaGFzT3duUHJvcGVydHkoXCJlbmNyeXB0S2V5XCIpfHwodC5lbmNyeXB0S2V5PXRoaXMuX2RlZmF1bHRPcHRpb25zLmVuY3J5cHRLZXkpLHQuaGFzT3duUHJvcGVydHkoXCJrZXlFbmNvZGluZ1wiKXx8KHQua2V5RW5jb2Rpbmc9dGhpcy5fZGVmYXVsdE9wdGlvbnMua2V5RW5jb2RpbmcpLHQuaGFzT3duUHJvcGVydHkoXCJrZXlMZW5ndGhcIil8fCh0LmtleUxlbmd0aD10aGlzLl9kZWZhdWx0T3B0aW9ucy5rZXlMZW5ndGgpLHQuaGFzT3duUHJvcGVydHkoXCJtb2RlXCIpfHwodC5tb2RlPXRoaXMuX2RlZmF1bHRPcHRpb25zLm1vZGUpLHRoaXMuX2FsbG93ZWRLZXlFbmNvZGluZ3MuaW5kZXhPZih0LmtleUVuY29kaW5nLnRvTG93ZXJDYXNlKCkpPT09LTEmJih0LmtleUVuY29kaW5nPXRoaXMuX2RlZmF1bHRPcHRpb25zLmtleUVuY29kaW5nKSx0aGlzLl9hbGxvd2VkS2V5TGVuZ3Rocy5pbmRleE9mKHBhcnNlSW50KHQua2V5TGVuZ3RoLDEwKSk9PT0tMSYmKHQua2V5TGVuZ3RoPXRoaXMuX2RlZmF1bHRPcHRpb25zLmtleUxlbmd0aCksdGhpcy5fYWxsb3dlZE1vZGVzLmluZGV4T2YodC5tb2RlLnRvTG93ZXJDYXNlKCkpPT09LTEmJih0Lm1vZGU9dGhpcy5fZGVmYXVsdE9wdGlvbnMubW9kZSksdH19LHtrZXk6XCJfZGVjb2RlS2V5XCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtyZXR1cm5cImJhc2U2NFwiPT09dC5rZXlFbmNvZGluZz91LmRlZmF1bHQuZW5jLkJhc2U2NC5wYXJzZShlKTpcImhleFwiPT09dC5rZXlFbmNvZGluZz91LmRlZmF1bHQuZW5jLkhleC5wYXJzZShlKTplfX0se2tleTpcIl9nZXRQYWRkZWRLZXlcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3JldHVybiBlPXRoaXMuX2RlY29kZUtleShlLHQpLHQuZW5jcnlwdEtleT91LmRlZmF1bHQuZW5jLlV0ZjgucGFyc2UodGhpcy5TSEEyNTYoZSkuc2xpY2UoMCwzMikpOmV9fSx7a2V5OlwiX2dldE1vZGVcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm5cImVjYlwiPT09ZS5tb2RlP3UuZGVmYXVsdC5tb2RlLkVDQjp1LmRlZmF1bHQubW9kZS5DQkN9fSx7a2V5OlwiX2dldElWXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuXCJjYmNcIj09PWUubW9kZT91LmRlZmF1bHQuZW5jLlV0ZjgucGFyc2UodGhpcy5faXYpOm51bGx9fSx7a2V5OlwiZW5jcnlwdFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXtpZighdCYmIXRoaXMuX2NvbmZpZy5jaXBoZXJLZXkpcmV0dXJuIGU7bj10aGlzLl9wYXJzZU9wdGlvbnMobik7dmFyIHI9dGhpcy5fZ2V0SVYobiksaT10aGlzLl9nZXRNb2RlKG4pLG89dGhpcy5fZ2V0UGFkZGVkS2V5KHR8fHRoaXMuX2NvbmZpZy5jaXBoZXJLZXksbikscz11LmRlZmF1bHQuQUVTLmVuY3J5cHQoZSxvLHtpdjpyLG1vZGU6aX0pLmNpcGhlcnRleHQsYT1zLnRvU3RyaW5nKHUuZGVmYXVsdC5lbmMuQmFzZTY0KTtyZXR1cm4gYXx8ZX19LHtrZXk6XCJkZWNyeXB0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe2lmKCF0JiYhdGhpcy5fY29uZmlnLmNpcGhlcktleSlyZXR1cm4gZTtuPXRoaXMuX3BhcnNlT3B0aW9ucyhuKTt2YXIgcj10aGlzLl9nZXRJVihuKSxpPXRoaXMuX2dldE1vZGUobiksbz10aGlzLl9nZXRQYWRkZWRLZXkodHx8dGhpcy5fY29uZmlnLmNpcGhlcktleSxuKTt0cnl7dmFyIHM9dS5kZWZhdWx0LmVuYy5CYXNlNjQucGFyc2UoZSksYT11LmRlZmF1bHQuQUVTLmRlY3J5cHQoe2NpcGhlcnRleHQ6c30sbyx7aXY6cixtb2RlOml9KS50b1N0cmluZyh1LmRlZmF1bHQuZW5jLlV0ZjgpLGM9SlNPTi5wYXJzZShhKTtyZXR1cm4gY31jYXRjaChlKXtyZXR1cm4gbnVsbH19fV0pLGV9KCk7dC5kZWZhdWx0PWMsZS5leHBvcnRzPXQuZGVmYXVsdH0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixyKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxyJiZlKHQsciksdH19KCkscz1uKDIpLGE9cihzKSx1PShuKDEzKSxuKDE0KSksYz1yKHUpLGw9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe3ZhciBuPXQuc2V0dXAscj10LmRiO2kodGhpcyxlKSx0aGlzLl9kYj1yLHRoaXMuaW5zdGFuY2VJZD1hLmRlZmF1bHQudjQoKSx0aGlzLnNlY3JldEtleT1uLnNlY3JldEtleSx0aGlzLnN1YnNjcmliZUtleT1uLnN1YnNjcmliZUtleSx0aGlzLnB1Ymxpc2hLZXk9bi5wdWJsaXNoS2V5LHRoaXMuc2RrRmFtaWx5PW4uc2RrRmFtaWx5LHRoaXMucGFydG5lcklkPW4ucGFydG5lcklkLHRoaXMuc2V0QXV0aEtleShuLmF1dGhLZXkpLHRoaXMuc2V0Q2lwaGVyS2V5KG4uY2lwaGVyS2V5KSx0aGlzLnNldEZpbHRlckV4cHJlc3Npb24obi5maWx0ZXJFeHByZXNzaW9uKSx0aGlzLm9yaWdpbj1uLm9yaWdpbnx8XCJwdWJzdWIucHVibnViLmNvbVwiLHRoaXMuc2VjdXJlPW4uc3NsfHwhMSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbG9jYXRpb24mJlwiaHR0cHM6XCI9PT1sb2NhdGlvbi5wcm90b2NvbCYmKHRoaXMuc2VjdXJlPSEwKSx0aGlzLmxvZ1ZlcmJvc2l0eT1uLmxvZ1ZlcmJvc2l0eXx8ITEsdGhpcy5zdXBwcmVzc0xlYXZlRXZlbnRzPW4uc3VwcHJlc3NMZWF2ZUV2ZW50c3x8ITEsdGhpcy5hbm5vdW5jZUZhaWxlZEhlYXJ0YmVhdHM9bi5hbm5vdW5jZUZhaWxlZEhlYXJ0YmVhdHN8fCEwLHRoaXMuYW5ub3VuY2VTdWNjZXNzZnVsSGVhcnRiZWF0cz1uLmFubm91bmNlU3VjY2Vzc2Z1bEhlYXJ0YmVhdHN8fCExLHRoaXMudXNlSW5zdGFuY2VJZD1uLnVzZUluc3RhbmNlSWR8fCExLHRoaXMudXNlUmVxdWVzdElkPW4udXNlUmVxdWVzdElkfHwhMSx0aGlzLnNldFRyYW5zYWN0aW9uVGltZW91dChuLnRyYW5zYWN0aW9uYWxSZXF1ZXN0VGltZW91dHx8MTVlMyksdGhpcy5zZXRTdWJzY3JpYmVUaW1lb3V0KG4uc3Vic2NyaWJlUmVxdWVzdFRpbWVvdXR8fDMxZTQpLHRoaXMuc2V0U2VuZEJlYWNvbkNvbmZpZyhuLnVzZVNlbmRCZWFjb258fCEwKSx0aGlzLnNldFByZXNlbmNlVGltZW91dChuLnByZXNlbmNlVGltZW91dHx8MzAwKSxuLmhlYXJ0YmVhdEludGVydmFsJiZ0aGlzLnNldEhlYXJ0YmVhdEludGVydmFsKG4uaGVhcnRiZWF0SW50ZXJ2YWwpLHRoaXMuc2V0VVVJRCh0aGlzLl9kZWNpZGVVVUlEKG4udXVpZCkpfXJldHVybiBvKGUsW3trZXk6XCJnZXRBdXRoS2V5XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hdXRoS2V5fX0se2tleTpcInNldEF1dGhLZXlcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5hdXRoS2V5PWUsdGhpc319LHtrZXk6XCJzZXRDaXBoZXJLZXlcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5jaXBoZXJLZXk9ZSx0aGlzfX0se2tleTpcImdldFVVSURcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLlVVSUR9fSx7a2V5Olwic2V0VVVJRFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9kYiYmdGhpcy5fZGIuc2V0JiZ0aGlzLl9kYi5zZXQodGhpcy5zdWJzY3JpYmVLZXkrXCJ1dWlkXCIsZSksdGhpcy5VVUlEPWUsdGhpc319LHtrZXk6XCJnZXRGaWx0ZXJFeHByZXNzaW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWx0ZXJFeHByZXNzaW9ufX0se2tleTpcInNldEZpbHRlckV4cHJlc3Npb25cIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5maWx0ZXJFeHByZXNzaW9uPWUsdGhpc319LHtrZXk6XCJnZXRQcmVzZW5jZVRpbWVvdXRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9wcmVzZW5jZVRpbWVvdXR9fSx7a2V5Olwic2V0UHJlc2VuY2VUaW1lb3V0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX3ByZXNlbmNlVGltZW91dD1lLHRoaXMuc2V0SGVhcnRiZWF0SW50ZXJ2YWwodGhpcy5fcHJlc2VuY2VUaW1lb3V0LzItMSksdGhpc319LHtrZXk6XCJnZXRIZWFydGJlYXRJbnRlcnZhbFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2hlYXJ0YmVhdEludGVydmFsfX0se2tleTpcInNldEhlYXJ0YmVhdEludGVydmFsXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2hlYXJ0YmVhdEludGVydmFsPWUsdGhpc319LHtrZXk6XCJnZXRTdWJzY3JpYmVUaW1lb3V0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc3Vic2NyaWJlUmVxdWVzdFRpbWVvdXR9fSx7a2V5Olwic2V0U3Vic2NyaWJlVGltZW91dFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9zdWJzY3JpYmVSZXF1ZXN0VGltZW91dD1lLHRoaXN9fSx7a2V5OlwiZ2V0VHJhbnNhY3Rpb25UaW1lb3V0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fdHJhbnNhY3Rpb25hbFJlcXVlc3RUaW1lb3V0fX0se2tleTpcInNldFRyYW5zYWN0aW9uVGltZW91dFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl90cmFuc2FjdGlvbmFsUmVxdWVzdFRpbWVvdXQ9ZSx0aGlzfX0se2tleTpcImlzU2VuZEJlYWNvbkVuYWJsZWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl91c2VTZW5kQmVhY29ufX0se2tleTpcInNldFNlbmRCZWFjb25Db25maWdcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fdXNlU2VuZEJlYWNvbj1lLHRoaXN9fSx7a2V5OlwiZ2V0VmVyc2lvblwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIGMuZGVmYXVsdC52ZXJzaW9ufX0se2tleTpcIl9kZWNpZGVVVUlEXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGU/ZTp0aGlzLl9kYiYmdGhpcy5fZGIuZ2V0JiZ0aGlzLl9kYi5nZXQodGhpcy5zdWJzY3JpYmVLZXkrXCJ1dWlkXCIpP3RoaXMuX2RiLmdldCh0aGlzLnN1YnNjcmliZUtleStcInV1aWRcIik6YS5kZWZhdWx0LnY0KCl9fV0pLGV9KCk7dC5kZWZhdWx0PWwsZS5leHBvcnRzPXQuZGVmYXVsdH0sZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtlLmV4cG9ydHM9e319LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPXtuYW1lOlwicHVibnViXCIscHJlZmVyR2xvYmFsOiExLHZlcnNpb246XCI0LjAuMTNcIixhdXRob3I6XCJQdWJOdWIgPHN1cHBvcnRAcHVibnViLmNvbT5cIixkZXNjcmlwdGlvbjpcIlB1Ymxpc2ggJiBTdWJzY3JpYmUgUmVhbC10aW1lIE1lc3NhZ2luZyB3aXRoIFB1Yk51YlwiLGJpbjp7fSxzY3JpcHRzOntjb2RlY292OlwiY2F0IGNvdmVyYWdlL2xjb3YuaW5mbyB8IGNvZGVjb3ZcIn0sbWFpbjpcIi4vbGliL25vZGUvaW5kZXguanNcIixcInJlYWN0LW5hdGl2ZVwiOlwiLi9saWIvbm9kZS9pbmRleC5qc1wiLGJyb3dzZXI6XCIuL2Rpc3Qvd2ViL3B1Ym51Yi5taW4uanNcIixyZXBvc2l0b3J5Ont0eXBlOlwiZ2l0XCIsdXJsOlwiZ2l0Oi8vZ2l0aHViLmNvbS9wdWJudWIvamF2YXNjcmlwdC5naXRcIn0sa2V5d29yZHM6W1wiY2xvdWRcIixcInB1Ymxpc2hcIixcInN1YnNjcmliZVwiLFwid2Vic29ja2V0c1wiLFwiY29tZXRcIixcImJvc2hcIixcInhtcHBcIixcInJlYWwtdGltZVwiLFwibWVzc2FnaW5nXCJdLGRlcGVuZGVuY2llczp7c3VwZXJhZ2VudDpcIl4yLjMuMFwiLHV1aWQ6XCJeMi4wLjNcIn0sbm9BbmFseXplOiExLGRldkRlcGVuZGVuY2llczp7XCJiYWJlbC1jb3JlXCI6XCJeNi4xNy4wXCIsXCJiYWJlbC1lc2xpbnRcIjpcIjcuMC4wXCIsXCJiYWJlbC1wbHVnaW4tYWRkLW1vZHVsZS1leHBvcnRzXCI6XCJeMC4yLjFcIixcImJhYmVsLXBsdWdpbi10cmFuc2Zvcm0tY2xhc3MtcHJvcGVydGllc1wiOlwiXjYuMTYuMFwiLFwiYmFiZWwtcGx1Z2luLXRyYW5zZm9ybS1mbG93LXN0cmlwLXR5cGVzXCI6XCJeNi4xNC4wXCIsXCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6XCJeNi4xNi4wXCIsXCJiYWJlbC1yZWdpc3RlclwiOlwiXjYuMTYuM1wiLGNoYWk6XCJeMy41LjBcIixcImVzbGludC1jb25maWctYWlyYm5iXCI6XCIxMi4wLjBcIixcImVzbGludC1wbHVnaW4tZmxvd3R5cGVcIjpcIjIuMTkuMFwiLFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjpcIl4xLjE2LjBcIixcImVzbGludC1wbHVnaW4tbW9jaGFcIjpcIjQuNi4wXCIsXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6XCI2LjMuMFwiLFwiZmxvdy1iaW5cIjpcIl4wLjMzLjBcIixndWxwOlwiXjMuOS4xXCIsXCJndWxwLWJhYmVsXCI6XCJeNi4xLjJcIixcImd1bHAtY2xlYW5cIjpcIl4wLjMuMlwiLFwiZ3VscC1lc2xpbnRcIjpcIl4zLjAuMVwiLFwiZ3VscC1leGVjXCI6XCJeMi4xLjJcIixcImd1bHAtZmxvd3R5cGVcIjpcIl4xLjAuMFwiLFwiZ3VscC1nemlwXCI6XCJeMS40LjBcIixcImd1bHAtaXN0YW5idWxcIjpcIl4xLjEuMVwiLFwiZ3VscC1tb2NoYVwiOlwiXjMuMC4xXCIsXCJndWxwLXJlbmFtZVwiOlwiXjEuMi4yXCIsXCJndWxwLXNvdXJjZW1hcHNcIjpcIl4xLjYuMFwiLFwiZ3VscC11Z2xpZnlcIjpcIl4yLjAuMFwiLFwiaW1wb3J0cy1sb2FkZXJcIjpcIjAuNi41XCIsaXNwYXJ0YTpcIl40LjAuMFwiLFwianNvbi1sb2FkZXJcIjpcIjAuNS40XCIsa2FybWE6XCIxLjMuMFwiLFwia2FybWEtYmFiZWwtcHJlcHJvY2Vzc29yXCI6XCJeNi4wLjFcIixcImthcm1hLWNoYWlcIjpcIjAuMS4wXCIsXCJrYXJtYS1jaHJvbWUtbGF1bmNoZXJcIjpcIl4yLjAuMFwiLFwia2FybWEtbW9jaGFcIjpcIl4xLjIuMFwiLFwia2FybWEtcGhhbnRvbWpzLWxhdW5jaGVyXCI6XCIxLjAuMlwiLFwia2FybWEtc3BlYy1yZXBvcnRlclwiOlwiMC4wLjI2XCIsbW9jaGE6XCIzLjEuMFwiLG5vY2s6XCJeOC4wLjBcIixcInBoYW50b21qcy1wcmVidWlsdFwiOlwiMi4xLjEyXCIsXCJyZW1hcC1pc3RhbmJ1bFwiOlwiXjAuNi40XCIsXCJydW4tc2VxdWVuY2VcIjpcIl4xLjIuMlwiLHNpbm9uOlwiXjEuMTcuNlwiLFwic3RhdHMtd2VicGFjay1wbHVnaW5cIjpcIl4wLjQuMlwiLFwidWdsaWZ5LWpzXCI6XCJeMi43LjNcIix1bmRlcnNjb3JlOlwiXjEuOC4zXCIsd2VicGFjazpcIl4xLjEzLjJcIixcIndlYnBhY2stZGV2LXNlcnZlclwiOlwiMS4xNi4xXCIsXCJ3ZWJwYWNrLXN0cmVhbVwiOlwiXjMuMi4wXCJ9LGJ1bmRsZURlcGVuZGVuY2llczpbXSxsaWNlbnNlOlwiTUlUXCIsZW5naW5lOntub2RlOlwiPj0wLjhcIn19fSxmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO3ZhciBuPW58fGZ1bmN0aW9uKGUsdCl7dmFyIG49e30scj1uLmxpYj17fSxpPWZ1bmN0aW9uKCl7fSxvPXIuQmFzZT17ZXh0ZW5kOmZ1bmN0aW9uKGUpe2kucHJvdG90eXBlPXRoaXM7dmFyIHQ9bmV3IGk7cmV0dXJuIGUmJnQubWl4SW4oZSksdC5oYXNPd25Qcm9wZXJ0eShcImluaXRcIil8fCh0LmluaXQ9ZnVuY3Rpb24oKXt0LiRzdXBlci5pbml0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pLHQuaW5pdC5wcm90b3R5cGU9dCx0LiRzdXBlcj10aGlzLHR9LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuZXh0ZW5kKCk7cmV0dXJuIGUuaW5pdC5hcHBseShlLGFyZ3VtZW50cyksZX0saW5pdDpmdW5jdGlvbigpe30sbWl4SW46ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIGUpZS5oYXNPd25Qcm9wZXJ0eSh0KSYmKHRoaXNbdF09ZVt0XSk7ZS5oYXNPd25Qcm9wZXJ0eShcInRvU3RyaW5nXCIpJiYodGhpcy50b1N0cmluZz1lLnRvU3RyaW5nKX0sY2xvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyl9fSxzPXIuV29yZEFycmF5PW8uZXh0ZW5kKHtpbml0OmZ1bmN0aW9uKGUsbil7ZT10aGlzLndvcmRzPWV8fFtdLHRoaXMuc2lnQnl0ZXM9biE9dD9uOjQqZS5sZW5ndGh9LHRvU3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVybihlfHx1KS5zdHJpbmdpZnkodGhpcyl9LGNvbmNhdDpmdW5jdGlvbihlKXt2YXIgdD10aGlzLndvcmRzLG49ZS53b3JkcyxyPXRoaXMuc2lnQnl0ZXM7aWYoZT1lLnNpZ0J5dGVzLHRoaXMuY2xhbXAoKSxyJTQpZm9yKHZhciBpPTA7aTxlO2krKyl0W3IraT4+PjJdfD0obltpPj4+Ml0+Pj4yNC04KihpJTQpJjI1NSk8PDI0LTgqKChyK2kpJTQpO2Vsc2UgaWYoNjU1MzU8bi5sZW5ndGgpZm9yKGk9MDtpPGU7aSs9NCl0W3IraT4+PjJdPW5baT4+PjJdO2Vsc2UgdC5wdXNoLmFwcGx5KHQsbik7cmV0dXJuIHRoaXMuc2lnQnl0ZXMrPWUsdGhpc30sY2xhbXA6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLndvcmRzLG49dGhpcy5zaWdCeXRlczt0W24+Pj4yXSY9NDI5NDk2NzI5NTw8MzItOCoobiU0KSx0Lmxlbmd0aD1lLmNlaWwobi80KX0sY2xvbmU6ZnVuY3Rpb24oKXt2YXIgZT1vLmNsb25lLmNhbGwodGhpcyk7cmV0dXJuIGUud29yZHM9dGhpcy53b3Jkcy5zbGljZSgwKSxlfSxyYW5kb206ZnVuY3Rpb24odCl7Zm9yKHZhciBuPVtdLHI9MDtyPHQ7cis9NCluLnB1c2goNDI5NDk2NzI5NiplLnJhbmRvbSgpfDApO3JldHVybiBuZXcgcy5pbml0KG4sdCl9fSksYT1uLmVuYz17fSx1PWEuSGV4PXtzdHJpbmdpZnk6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS53b3JkcztlPWUuc2lnQnl0ZXM7Zm9yKHZhciBuPVtdLHI9MDtyPGU7cisrKXt2YXIgaT10W3I+Pj4yXT4+PjI0LTgqKHIlNCkmMjU1O24ucHVzaCgoaT4+PjQpLnRvU3RyaW5nKDE2KSksbi5wdXNoKCgxNSZpKS50b1N0cmluZygxNikpfXJldHVybiBuLmpvaW4oXCJcIil9LHBhcnNlOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLmxlbmd0aCxuPVtdLHI9MDtyPHQ7cis9MiluW3I+Pj4zXXw9cGFyc2VJbnQoZS5zdWJzdHIociwyKSwxNik8PDI0LTQqKHIlOCk7cmV0dXJuIG5ldyBzLmluaXQobix0LzIpfX0sYz1hLkxhdGluMT17c3RyaW5naWZ5OmZ1bmN0aW9uKGUpe3ZhciB0PWUud29yZHM7ZT1lLnNpZ0J5dGVzO2Zvcih2YXIgbj1bXSxyPTA7cjxlO3IrKyluLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh0W3I+Pj4yXT4+PjI0LTgqKHIlNCkmMjU1KSk7cmV0dXJuIG4uam9pbihcIlwiKX0scGFyc2U6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWUubGVuZ3RoLG49W10scj0wO3I8dDtyKyspbltyPj4+Ml18PSgyNTUmZS5jaGFyQ29kZUF0KHIpKTw8MjQtOCoociU0KTtyZXR1cm4gbmV3IHMuaW5pdChuLHQpfX0sbD1hLlV0Zjg9e3N0cmluZ2lmeTpmdW5jdGlvbihlKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYy5zdHJpbmdpZnkoZSkpKX1jYXRjaChlKXt0aHJvdyBFcnJvcihcIk1hbGZvcm1lZCBVVEYtOCBkYXRhXCIpfX0scGFyc2U6ZnVuY3Rpb24oZSl7cmV0dXJuIGMucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGUpKSl9fSxoPXIuQnVmZmVyZWRCbG9ja0FsZ29yaXRobT1vLmV4dGVuZCh7cmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLl9kYXRhPW5ldyBzLmluaXQsdGhpcy5fbkRhdGFCeXRlcz0wfSxfYXBwZW5kOmZ1bmN0aW9uKGUpe1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1sLnBhcnNlKGUpKSx0aGlzLl9kYXRhLmNvbmNhdChlKSx0aGlzLl9uRGF0YUJ5dGVzKz1lLnNpZ0J5dGVzfSxfcHJvY2VzczpmdW5jdGlvbih0KXt2YXIgbj10aGlzLl9kYXRhLHI9bi53b3JkcyxpPW4uc2lnQnl0ZXMsbz10aGlzLmJsb2NrU2l6ZSxhPWkvKDQqbyksYT10P2UuY2VpbChhKTplLm1heCgoMHxhKS10aGlzLl9taW5CdWZmZXJTaXplLDApO1xuaWYodD1hKm8saT1lLm1pbig0KnQsaSksdCl7Zm9yKHZhciB1PTA7dTx0O3UrPW8pdGhpcy5fZG9Qcm9jZXNzQmxvY2socix1KTt1PXIuc3BsaWNlKDAsdCksbi5zaWdCeXRlcy09aX1yZXR1cm4gbmV3IHMuaW5pdCh1LGkpfSxjbG9uZTpmdW5jdGlvbigpe3ZhciBlPW8uY2xvbmUuY2FsbCh0aGlzKTtyZXR1cm4gZS5fZGF0YT10aGlzLl9kYXRhLmNsb25lKCksZX0sX21pbkJ1ZmZlclNpemU6MH0pO3IuSGFzaGVyPWguZXh0ZW5kKHtjZmc6by5leHRlbmQoKSxpbml0OmZ1bmN0aW9uKGUpe3RoaXMuY2ZnPXRoaXMuY2ZnLmV4dGVuZChlKSx0aGlzLnJlc2V0KCl9LHJlc2V0OmZ1bmN0aW9uKCl7aC5yZXNldC5jYWxsKHRoaXMpLHRoaXMuX2RvUmVzZXQoKX0sdXBkYXRlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9hcHBlbmQoZSksdGhpcy5fcHJvY2VzcygpLHRoaXN9LGZpbmFsaXplOmZ1bmN0aW9uKGUpe3JldHVybiBlJiZ0aGlzLl9hcHBlbmQoZSksdGhpcy5fZG9GaW5hbGl6ZSgpfSxibG9ja1NpemU6MTYsX2NyZWF0ZUhlbHBlcjpmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCxuKXtyZXR1cm4gbmV3IGUuaW5pdChuKS5maW5hbGl6ZSh0KX19LF9jcmVhdGVIbWFjSGVscGVyOmZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0LG4pe3JldHVybiBuZXcgZi5ITUFDLmluaXQoZSxuKS5maW5hbGl6ZSh0KX19fSk7dmFyIGY9bi5hbGdvPXt9O3JldHVybiBufShNYXRoKTshZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW4scj10LmxpYixpPXIuV29yZEFycmF5LG89ci5IYXNoZXIscj10LmFsZ28scz1bXSxhPVtdLHU9ZnVuY3Rpb24oZSl7cmV0dXJuIDQyOTQ5NjcyOTYqKGUtKDB8ZSkpfDB9LGM9MixsPTA7NjQ+bDspe3ZhciBoO2U6e2g9Yztmb3IodmFyIGY9ZS5zcXJ0KGgpLHA9MjtwPD1mO3ArKylpZighKGglcCkpe2g9ITE7YnJlYWsgZX1oPSEwfWgmJig4PmwmJihzW2xdPXUoZS5wb3coYywuNSkpKSxhW2xdPXUoZS5wb3coYywxLzMpKSxsKyspLGMrK312YXIgZD1bXSxyPXIuU0hBMjU2PW8uZXh0ZW5kKHtfZG9SZXNldDpmdW5jdGlvbigpe3RoaXMuX2hhc2g9bmV3IGkuaW5pdChzLnNsaWNlKDApKX0sX2RvUHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPXRoaXMuX2hhc2gud29yZHMscj1uWzBdLGk9blsxXSxvPW5bMl0scz1uWzNdLHU9bls0XSxjPW5bNV0sbD1uWzZdLGg9bls3XSxmPTA7NjQ+ZjtmKyspe2lmKDE2PmYpZFtmXT0wfGVbdCtmXTtlbHNle3ZhciBwPWRbZi0xNV0sZz1kW2YtMl07ZFtmXT0oKHA8PDI1fHA+Pj43KV4ocDw8MTR8cD4+PjE4KV5wPj4+MykrZFtmLTddKygoZzw8MTV8Zz4+PjE3KV4oZzw8MTN8Zz4+PjE5KV5nPj4+MTApK2RbZi0xNl19cD1oKygodTw8MjZ8dT4+PjYpXih1PDwyMXx1Pj4+MTEpXih1PDw3fHU+Pj4yNSkpKyh1JmNefnUmbCkrYVtmXStkW2ZdLGc9KChyPDwzMHxyPj4+MileKHI8PDE5fHI+Pj4xMyleKHI8PDEwfHI+Pj4yMikpKyhyJmleciZvXmkmbyksaD1sLGw9YyxjPXUsdT1zK3B8MCxzPW8sbz1pLGk9cixyPXArZ3wwfW5bMF09blswXStyfDAsblsxXT1uWzFdK2l8MCxuWzJdPW5bMl0rb3wwLG5bM109blszXStzfDAsbls0XT1uWzRdK3V8MCxuWzVdPW5bNV0rY3wwLG5bNl09bls2XStsfDAsbls3XT1uWzddK2h8MH0sX2RvRmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9kYXRhLG49dC53b3JkcyxyPTgqdGhpcy5fbkRhdGFCeXRlcyxpPTgqdC5zaWdCeXRlcztyZXR1cm4gbltpPj4+NV18PTEyODw8MjQtaSUzMixuWyhpKzY0Pj4+OTw8NCkrMTRdPWUuZmxvb3Ioci80Mjk0OTY3Mjk2KSxuWyhpKzY0Pj4+OTw8NCkrMTVdPXIsdC5zaWdCeXRlcz00Km4ubGVuZ3RoLHRoaXMuX3Byb2Nlc3MoKSx0aGlzLl9oYXNofSxjbG9uZTpmdW5jdGlvbigpe3ZhciBlPW8uY2xvbmUuY2FsbCh0aGlzKTtyZXR1cm4gZS5faGFzaD10aGlzLl9oYXNoLmNsb25lKCksZX19KTt0LlNIQTI1Nj1vLl9jcmVhdGVIZWxwZXIociksdC5IbWFjU0hBMjU2PW8uX2NyZWF0ZUhtYWNIZWxwZXIocil9KE1hdGgpLGZ1bmN0aW9uKCl7dmFyIGU9bix0PWUuZW5jLlV0Zjg7ZS5hbGdvLkhNQUM9ZS5saWIuQmFzZS5leHRlbmQoe2luaXQ6ZnVuY3Rpb24oZSxuKXtlPXRoaXMuX2hhc2hlcj1uZXcgZS5pbml0LFwic3RyaW5nXCI9PXR5cGVvZiBuJiYobj10LnBhcnNlKG4pKTt2YXIgcj1lLmJsb2NrU2l6ZSxpPTQqcjtuLnNpZ0J5dGVzPmkmJihuPWUuZmluYWxpemUobikpLG4uY2xhbXAoKTtmb3IodmFyIG89dGhpcy5fb0tleT1uLmNsb25lKCkscz10aGlzLl9pS2V5PW4uY2xvbmUoKSxhPW8ud29yZHMsdT1zLndvcmRzLGM9MDtjPHI7YysrKWFbY11ePTE1NDk1NTY4MjgsdVtjXV49OTA5NTIyNDg2O28uc2lnQnl0ZXM9cy5zaWdCeXRlcz1pLHRoaXMucmVzZXQoKX0scmVzZXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9oYXNoZXI7ZS5yZXNldCgpLGUudXBkYXRlKHRoaXMuX2lLZXkpfSx1cGRhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2hhc2hlci51cGRhdGUoZSksdGhpc30sZmluYWxpemU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5faGFzaGVyO3JldHVybiBlPXQuZmluYWxpemUoZSksdC5yZXNldCgpLHQuZmluYWxpemUodGhpcy5fb0tleS5jbG9uZSgpLmNvbmNhdChlKSl9fSl9KCksZnVuY3Rpb24oKXt2YXIgZT1uLHQ9ZS5saWIuV29yZEFycmF5O2UuZW5jLkJhc2U2ND17c3RyaW5naWZ5OmZ1bmN0aW9uKGUpe3ZhciB0PWUud29yZHMsbj1lLnNpZ0J5dGVzLHI9dGhpcy5fbWFwO2UuY2xhbXAoKSxlPVtdO2Zvcih2YXIgaT0wO2k8bjtpKz0zKWZvcih2YXIgbz0odFtpPj4+Ml0+Pj4yNC04KihpJTQpJjI1NSk8PDE2fCh0W2krMT4+PjJdPj4+MjQtOCooKGkrMSklNCkmMjU1KTw8OHx0W2krMj4+PjJdPj4+MjQtOCooKGkrMiklNCkmMjU1LHM9MDs0PnMmJmkrLjc1KnM8bjtzKyspZS5wdXNoKHIuY2hhckF0KG8+Pj42KigzLXMpJjYzKSk7aWYodD1yLmNoYXJBdCg2NCkpZm9yKDtlLmxlbmd0aCU0OyllLnB1c2godCk7cmV0dXJuIGUuam9pbihcIlwiKX0scGFyc2U6ZnVuY3Rpb24oZSl7dmFyIG49ZS5sZW5ndGgscj10aGlzLl9tYXAsaT1yLmNoYXJBdCg2NCk7aSYmKGk9ZS5pbmRleE9mKGkpLC0xIT1pJiYobj1pKSk7Zm9yKHZhciBpPVtdLG89MCxzPTA7czxuO3MrKylpZihzJTQpe3ZhciBhPXIuaW5kZXhPZihlLmNoYXJBdChzLTEpKTw8MioocyU0KSx1PXIuaW5kZXhPZihlLmNoYXJBdChzKSk+Pj42LTIqKHMlNCk7aVtvPj4+Ml18PShhfHUpPDwyNC04KihvJTQpLG8rK31yZXR1cm4gdC5jcmVhdGUoaSxvKX0sX21hcDpcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCJ9fSgpLGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSx0LG4scixpLG8scyl7cmV0dXJuIGU9ZSsodCZufH50JnIpK2krcywoZTw8b3xlPj4+MzItbykrdH1mdW5jdGlvbiByKGUsdCxuLHIsaSxvLHMpe3JldHVybiBlPWUrKHQmcnxuJn5yKStpK3MsKGU8PG98ZT4+PjMyLW8pK3R9ZnVuY3Rpb24gaShlLHQsbixyLGksbyxzKXtyZXR1cm4gZT1lKyh0Xm5ecikraStzLChlPDxvfGU+Pj4zMi1vKSt0fWZ1bmN0aW9uIG8oZSx0LG4scixpLG8scyl7cmV0dXJuIGU9ZSsobl4odHx+cikpK2krcywoZTw8b3xlPj4+MzItbykrdH1mb3IodmFyIHM9bixhPXMubGliLHU9YS5Xb3JkQXJyYXksYz1hLkhhc2hlcixhPXMuYWxnbyxsPVtdLGg9MDs2ND5oO2grKylsW2hdPTQyOTQ5NjcyOTYqZS5hYnMoZS5zaW4oaCsxKSl8MDthPWEuTUQ1PWMuZXh0ZW5kKHtfZG9SZXNldDpmdW5jdGlvbigpe3RoaXMuX2hhc2g9bmV3IHUuaW5pdChbMTczMjU4NDE5Myw0MDIzMjMzNDE3LDI1NjIzODMxMDIsMjcxNzMzODc4XSl9LF9kb1Byb2Nlc3NCbG9jazpmdW5jdGlvbihlLG4pe2Zvcih2YXIgcz0wOzE2PnM7cysrKXt2YXIgYT1uK3MsdT1lW2FdO2VbYV09MTY3MTE5MzUmKHU8PDh8dT4+PjI0KXw0Mjc4MjU1MzYwJih1PDwyNHx1Pj4+OCl9dmFyIHM9dGhpcy5faGFzaC53b3JkcyxhPWVbbiswXSx1PWVbbisxXSxjPWVbbisyXSxoPWVbbiszXSxmPWVbbis0XSxwPWVbbis1XSxkPWVbbis2XSxnPWVbbis3XSx5PWVbbis4XSx2PWVbbis5XSxiPWVbbisxMF0sXz1lW24rMTFdLG09ZVtuKzEyXSxrPWVbbisxM10sUD1lW24rMTRdLHc9ZVtuKzE1XSxTPXNbMF0sTz1zWzFdLEM9c1syXSxNPXNbM10sUz10KFMsTyxDLE0sYSw3LGxbMF0pLE09dChNLFMsTyxDLHUsMTIsbFsxXSksQz10KEMsTSxTLE8sYywxNyxsWzJdKSxPPXQoTyxDLE0sUyxoLDIyLGxbM10pLFM9dChTLE8sQyxNLGYsNyxsWzRdKSxNPXQoTSxTLE8sQyxwLDEyLGxbNV0pLEM9dChDLE0sUyxPLGQsMTcsbFs2XSksTz10KE8sQyxNLFMsZywyMixsWzddKSxTPXQoUyxPLEMsTSx5LDcsbFs4XSksTT10KE0sUyxPLEMsdiwxMixsWzldKSxDPXQoQyxNLFMsTyxiLDE3LGxbMTBdKSxPPXQoTyxDLE0sUyxfLDIyLGxbMTFdKSxTPXQoUyxPLEMsTSxtLDcsbFsxMl0pLE09dChNLFMsTyxDLGssMTIsbFsxM10pLEM9dChDLE0sUyxPLFAsMTcsbFsxNF0pLE89dChPLEMsTSxTLHcsMjIsbFsxNV0pLFM9cihTLE8sQyxNLHUsNSxsWzE2XSksTT1yKE0sUyxPLEMsZCw5LGxbMTddKSxDPXIoQyxNLFMsTyxfLDE0LGxbMThdKSxPPXIoTyxDLE0sUyxhLDIwLGxbMTldKSxTPXIoUyxPLEMsTSxwLDUsbFsyMF0pLE09cihNLFMsTyxDLGIsOSxsWzIxXSksQz1yKEMsTSxTLE8sdywxNCxsWzIyXSksTz1yKE8sQyxNLFMsZiwyMCxsWzIzXSksUz1yKFMsTyxDLE0sdiw1LGxbMjRdKSxNPXIoTSxTLE8sQyxQLDksbFsyNV0pLEM9cihDLE0sUyxPLGgsMTQsbFsyNl0pLE89cihPLEMsTSxTLHksMjAsbFsyN10pLFM9cihTLE8sQyxNLGssNSxsWzI4XSksTT1yKE0sUyxPLEMsYyw5LGxbMjldKSxDPXIoQyxNLFMsTyxnLDE0LGxbMzBdKSxPPXIoTyxDLE0sUyxtLDIwLGxbMzFdKSxTPWkoUyxPLEMsTSxwLDQsbFszMl0pLE09aShNLFMsTyxDLHksMTEsbFszM10pLEM9aShDLE0sUyxPLF8sMTYsbFszNF0pLE89aShPLEMsTSxTLFAsMjMsbFszNV0pLFM9aShTLE8sQyxNLHUsNCxsWzM2XSksTT1pKE0sUyxPLEMsZiwxMSxsWzM3XSksQz1pKEMsTSxTLE8sZywxNixsWzM4XSksTz1pKE8sQyxNLFMsYiwyMyxsWzM5XSksUz1pKFMsTyxDLE0sayw0LGxbNDBdKSxNPWkoTSxTLE8sQyxhLDExLGxbNDFdKSxDPWkoQyxNLFMsTyxoLDE2LGxbNDJdKSxPPWkoTyxDLE0sUyxkLDIzLGxbNDNdKSxTPWkoUyxPLEMsTSx2LDQsbFs0NF0pLE09aShNLFMsTyxDLG0sMTEsbFs0NV0pLEM9aShDLE0sUyxPLHcsMTYsbFs0Nl0pLE89aShPLEMsTSxTLGMsMjMsbFs0N10pLFM9byhTLE8sQyxNLGEsNixsWzQ4XSksTT1vKE0sUyxPLEMsZywxMCxsWzQ5XSksQz1vKEMsTSxTLE8sUCwxNSxsWzUwXSksTz1vKE8sQyxNLFMscCwyMSxsWzUxXSksUz1vKFMsTyxDLE0sbSw2LGxbNTJdKSxNPW8oTSxTLE8sQyxoLDEwLGxbNTNdKSxDPW8oQyxNLFMsTyxiLDE1LGxbNTRdKSxPPW8oTyxDLE0sUyx1LDIxLGxbNTVdKSxTPW8oUyxPLEMsTSx5LDYsbFs1Nl0pLE09byhNLFMsTyxDLHcsMTAsbFs1N10pLEM9byhDLE0sUyxPLGQsMTUsbFs1OF0pLE89byhPLEMsTSxTLGssMjEsbFs1OV0pLFM9byhTLE8sQyxNLGYsNixsWzYwXSksTT1vKE0sUyxPLEMsXywxMCxsWzYxXSksQz1vKEMsTSxTLE8sYywxNSxsWzYyXSksTz1vKE8sQyxNLFMsdiwyMSxsWzYzXSk7c1swXT1zWzBdK1N8MCxzWzFdPXNbMV0rT3wwLHNbMl09c1syXStDfDAsc1szXT1zWzNdK018MH0sX2RvRmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9kYXRhLG49dC53b3JkcyxyPTgqdGhpcy5fbkRhdGFCeXRlcyxpPTgqdC5zaWdCeXRlcztuW2k+Pj41XXw9MTI4PDwyNC1pJTMyO3ZhciBvPWUuZmxvb3Ioci80Mjk0OTY3Mjk2KTtmb3IoblsoaSs2ND4+Pjk8PDQpKzE1XT0xNjcxMTkzNSYobzw8OHxvPj4+MjQpfDQyNzgyNTUzNjAmKG88PDI0fG8+Pj44KSxuWyhpKzY0Pj4+OTw8NCkrMTRdPTE2NzExOTM1JihyPDw4fHI+Pj4yNCl8NDI3ODI1NTM2MCYocjw8MjR8cj4+PjgpLHQuc2lnQnl0ZXM9NCoobi5sZW5ndGgrMSksdGhpcy5fcHJvY2VzcygpLHQ9dGhpcy5faGFzaCxuPXQud29yZHMscj0wOzQ+cjtyKyspaT1uW3JdLG5bcl09MTY3MTE5MzUmKGk8PDh8aT4+PjI0KXw0Mjc4MjU1MzYwJihpPDwyNHxpPj4+OCk7cmV0dXJuIHR9LGNsb25lOmZ1bmN0aW9uKCl7dmFyIGU9Yy5jbG9uZS5jYWxsKHRoaXMpO3JldHVybiBlLl9oYXNoPXRoaXMuX2hhc2guY2xvbmUoKSxlfX0pLHMuTUQ1PWMuX2NyZWF0ZUhlbHBlcihhKSxzLkhtYWNNRDU9Yy5fY3JlYXRlSG1hY0hlbHBlcihhKX0oTWF0aCksZnVuY3Rpb24oKXt2YXIgZT1uLHQ9ZS5saWIscj10LkJhc2UsaT10LldvcmRBcnJheSx0PWUuYWxnbyxvPXQuRXZwS0RGPXIuZXh0ZW5kKHtjZmc6ci5leHRlbmQoe2tleVNpemU6NCxoYXNoZXI6dC5NRDUsaXRlcmF0aW9uczoxfSksaW5pdDpmdW5jdGlvbihlKXt0aGlzLmNmZz10aGlzLmNmZy5leHRlbmQoZSl9LGNvbXB1dGU6ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG49dGhpcy5jZmcscj1uLmhhc2hlci5jcmVhdGUoKSxvPWkuY3JlYXRlKCkscz1vLndvcmRzLGE9bi5rZXlTaXplLG49bi5pdGVyYXRpb25zO3MubGVuZ3RoPGE7KXt1JiZyLnVwZGF0ZSh1KTt2YXIgdT1yLnVwZGF0ZShlKS5maW5hbGl6ZSh0KTtyLnJlc2V0KCk7Zm9yKHZhciBjPTE7YzxuO2MrKyl1PXIuZmluYWxpemUodSksci5yZXNldCgpO28uY29uY2F0KHUpfXJldHVybiBvLnNpZ0J5dGVzPTQqYSxvfX0pO2UuRXZwS0RGPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gby5jcmVhdGUobikuY29tcHV0ZShlLHQpfX0oKSxuLmxpYi5DaXBoZXJ8fGZ1bmN0aW9uKGUpe3ZhciB0PW4scj10LmxpYixpPXIuQmFzZSxvPXIuV29yZEFycmF5LHM9ci5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtLGE9dC5lbmMuQmFzZTY0LHU9dC5hbGdvLkV2cEtERixjPXIuQ2lwaGVyPXMuZXh0ZW5kKHtjZmc6aS5leHRlbmQoKSxjcmVhdGVFbmNyeXB0b3I6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5jcmVhdGUodGhpcy5fRU5DX1hGT1JNX01PREUsZSx0KX0sY3JlYXRlRGVjcnlwdG9yOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuY3JlYXRlKHRoaXMuX0RFQ19YRk9STV9NT0RFLGUsdCl9LGluaXQ6ZnVuY3Rpb24oZSx0LG4pe3RoaXMuY2ZnPXRoaXMuY2ZnLmV4dGVuZChuKSx0aGlzLl94Zm9ybU1vZGU9ZSx0aGlzLl9rZXk9dCx0aGlzLnJlc2V0KCl9LHJlc2V0OmZ1bmN0aW9uKCl7cy5yZXNldC5jYWxsKHRoaXMpLHRoaXMuX2RvUmVzZXQoKX0scHJvY2VzczpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fYXBwZW5kKGUpLHRoaXMuX3Byb2Nlc3MoKX0sZmluYWxpemU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJnRoaXMuX2FwcGVuZChlKSx0aGlzLl9kb0ZpbmFsaXplKCl9LGtleVNpemU6NCxpdlNpemU6NCxfRU5DX1hGT1JNX01PREU6MSxfREVDX1hGT1JNX01PREU6MixfY3JlYXRlSGVscGVyOmZ1bmN0aW9uKGUpe3JldHVybntlbmNyeXB0OmZ1bmN0aW9uKHQsbixyKXtyZXR1cm4oXCJzdHJpbmdcIj09dHlwZW9mIG4/ZzpkKS5lbmNyeXB0KGUsdCxuLHIpfSxkZWNyeXB0OmZ1bmN0aW9uKHQsbixyKXtyZXR1cm4oXCJzdHJpbmdcIj09dHlwZW9mIG4/ZzpkKS5kZWNyeXB0KGUsdCxuLHIpfX19fSk7ci5TdHJlYW1DaXBoZXI9Yy5leHRlbmQoe19kb0ZpbmFsaXplOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3Byb2Nlc3MoITApfSxibG9ja1NpemU6MX0pO3ZhciBsPXQubW9kZT17fSxoPWZ1bmN0aW9uKHQsbixyKXt2YXIgaT10aGlzLl9pdjtpP3RoaXMuX2l2PWU6aT10aGlzLl9wcmV2QmxvY2s7Zm9yKHZhciBvPTA7bzxyO28rKyl0W24rb11ePWlbb119LGY9KHIuQmxvY2tDaXBoZXJNb2RlPWkuZXh0ZW5kKHtjcmVhdGVFbmNyeXB0b3I6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5FbmNyeXB0b3IuY3JlYXRlKGUsdCl9LGNyZWF0ZURlY3J5cHRvcjpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLkRlY3J5cHRvci5jcmVhdGUoZSx0KX0saW5pdDpmdW5jdGlvbihlLHQpe3RoaXMuX2NpcGhlcj1lLHRoaXMuX2l2PXR9fSkpLmV4dGVuZCgpO2YuRW5jcnlwdG9yPWYuZXh0ZW5kKHtwcm9jZXNzQmxvY2s6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLl9jaXBoZXIscj1uLmJsb2NrU2l6ZTtoLmNhbGwodGhpcyxlLHQsciksbi5lbmNyeXB0QmxvY2soZSx0KSx0aGlzLl9wcmV2QmxvY2s9ZS5zbGljZSh0LHQrcil9fSksZi5EZWNyeXB0b3I9Zi5leHRlbmQoe3Byb2Nlc3NCbG9jazpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuX2NpcGhlcixyPW4uYmxvY2tTaXplLGk9ZS5zbGljZSh0LHQrcik7bi5kZWNyeXB0QmxvY2soZSx0KSxoLmNhbGwodGhpcyxlLHQsciksdGhpcy5fcHJldkJsb2NrPWl9fSksbD1sLkNCQz1mLGY9KHQucGFkPXt9KS5Qa2NzNz17cGFkOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPTQqdCxuPW4tZS5zaWdCeXRlcyVuLHI9bjw8MjR8bjw8MTZ8bjw8OHxuLGk9W10scz0wO3M8bjtzKz00KWkucHVzaChyKTtuPW8uY3JlYXRlKGksbiksZS5jb25jYXQobil9LHVucGFkOmZ1bmN0aW9uKGUpe2Uuc2lnQnl0ZXMtPTI1NSZlLndvcmRzW2Uuc2lnQnl0ZXMtMT4+PjJdfX0sci5CbG9ja0NpcGhlcj1jLmV4dGVuZCh7Y2ZnOmMuY2ZnLmV4dGVuZCh7bW9kZTpsLHBhZGRpbmc6Zn0pLHJlc2V0OmZ1bmN0aW9uKCl7Yy5yZXNldC5jYWxsKHRoaXMpO3ZhciBlPXRoaXMuY2ZnLHQ9ZS5pdixlPWUubW9kZTtpZih0aGlzLl94Zm9ybU1vZGU9PXRoaXMuX0VOQ19YRk9STV9NT0RFKXZhciBuPWUuY3JlYXRlRW5jcnlwdG9yO2Vsc2Ugbj1lLmNyZWF0ZURlY3J5cHRvcix0aGlzLl9taW5CdWZmZXJTaXplPTE7dGhpcy5fbW9kZT1uLmNhbGwoZSx0aGlzLHQmJnQud29yZHMpfSxfZG9Qcm9jZXNzQmxvY2s6ZnVuY3Rpb24oZSx0KXt0aGlzLl9tb2RlLnByb2Nlc3NCbG9jayhlLHQpfSxfZG9GaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuY2ZnLnBhZGRpbmc7aWYodGhpcy5feGZvcm1Nb2RlPT10aGlzLl9FTkNfWEZPUk1fTU9ERSl7ZS5wYWQodGhpcy5fZGF0YSx0aGlzLmJsb2NrU2l6ZSk7dmFyIHQ9dGhpcy5fcHJvY2VzcyghMCl9ZWxzZSB0PXRoaXMuX3Byb2Nlc3MoITApLGUudW5wYWQodCk7cmV0dXJuIHR9LGJsb2NrU2l6ZTo0fSk7dmFyIHA9ci5DaXBoZXJQYXJhbXM9aS5leHRlbmQoe2luaXQ6ZnVuY3Rpb24oZSl7dGhpcy5taXhJbihlKX0sdG9TdHJpbmc6ZnVuY3Rpb24oZSl7cmV0dXJuKGV8fHRoaXMuZm9ybWF0dGVyKS5zdHJpbmdpZnkodGhpcyl9fSksbD0odC5mb3JtYXQ9e30pLk9wZW5TU0w9e3N0cmluZ2lmeTpmdW5jdGlvbihlKXt2YXIgdD1lLmNpcGhlcnRleHQ7cmV0dXJuIGU9ZS5zYWx0LChlP28uY3JlYXRlKFsxMzk4ODkzNjg0LDE3MDEwNzY4MzFdKS5jb25jYXQoZSkuY29uY2F0KHQpOnQpLnRvU3RyaW5nKGEpfSxwYXJzZTpmdW5jdGlvbihlKXtlPWEucGFyc2UoZSk7dmFyIHQ9ZS53b3JkcztpZigxMzk4ODkzNjg0PT10WzBdJiYxNzAxMDc2ODMxPT10WzFdKXt2YXIgbj1vLmNyZWF0ZSh0LnNsaWNlKDIsNCkpO3Quc3BsaWNlKDAsNCksZS5zaWdCeXRlcy09MTZ9cmV0dXJuIHAuY3JlYXRlKHtjaXBoZXJ0ZXh0OmUsc2FsdDpufSl9fSxkPXIuU2VyaWFsaXphYmxlQ2lwaGVyPWkuZXh0ZW5kKHtjZmc6aS5leHRlbmQoe2Zvcm1hdDpsfSksZW5jcnlwdDpmdW5jdGlvbihlLHQsbixyKXtyPXRoaXMuY2ZnLmV4dGVuZChyKTt2YXIgaT1lLmNyZWF0ZUVuY3J5cHRvcihuLHIpO3JldHVybiB0PWkuZmluYWxpemUodCksaT1pLmNmZyxwLmNyZWF0ZSh7Y2lwaGVydGV4dDp0LGtleTpuLGl2OmkuaXYsYWxnb3JpdGhtOmUsbW9kZTppLm1vZGUscGFkZGluZzppLnBhZGRpbmcsYmxvY2tTaXplOmUuYmxvY2tTaXplLGZvcm1hdHRlcjpyLmZvcm1hdH0pfSxkZWNyeXB0OmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiByPXRoaXMuY2ZnLmV4dGVuZChyKSx0PXRoaXMuX3BhcnNlKHQsci5mb3JtYXQpLGUuY3JlYXRlRGVjcnlwdG9yKG4scikuZmluYWxpemUodC5jaXBoZXJ0ZXh0KX0sX3BhcnNlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGU/dC5wYXJzZShlLHRoaXMpOmV9fSksdD0odC5rZGY9e30pLk9wZW5TU0w9e2V4ZWN1dGU6ZnVuY3Rpb24oZSx0LG4scil7cmV0dXJuIHJ8fChyPW8ucmFuZG9tKDgpKSxlPXUuY3JlYXRlKHtrZXlTaXplOnQrbn0pLmNvbXB1dGUoZSxyKSxuPW8uY3JlYXRlKGUud29yZHMuc2xpY2UodCksNCpuKSxlLnNpZ0J5dGVzPTQqdCxwLmNyZWF0ZSh7a2V5OmUsaXY6bixzYWx0OnJ9KX19LGc9ci5QYXNzd29yZEJhc2VkQ2lwaGVyPWQuZXh0ZW5kKHtjZmc6ZC5jZmcuZXh0ZW5kKHtrZGY6dH0pLGVuY3J5cHQ6ZnVuY3Rpb24oZSx0LG4scil7cmV0dXJuIHI9dGhpcy5jZmcuZXh0ZW5kKHIpLG49ci5rZGYuZXhlY3V0ZShuLGUua2V5U2l6ZSxlLml2U2l6ZSksci5pdj1uLml2LGU9ZC5lbmNyeXB0LmNhbGwodGhpcyxlLHQsbi5rZXksciksZS5taXhJbihuKSxlfSxkZWNyeXB0OmZ1bmN0aW9uKGUsdCxuLHIpe3JldHVybiByPXRoaXMuY2ZnLmV4dGVuZChyKSx0PXRoaXMuX3BhcnNlKHQsci5mb3JtYXQpLG49ci5rZGYuZXhlY3V0ZShuLGUua2V5U2l6ZSxlLml2U2l6ZSx0LnNhbHQpLHIuaXY9bi5pdixkLmRlY3J5cHQuY2FsbCh0aGlzLGUsdCxuLmtleSxyKX19KX0oKSxmdW5jdGlvbigpe2Zvcih2YXIgZT1uLHQ9ZS5saWIuQmxvY2tDaXBoZXIscj1lLmFsZ28saT1bXSxvPVtdLHM9W10sYT1bXSx1PVtdLGM9W10sbD1bXSxoPVtdLGY9W10scD1bXSxkPVtdLGc9MDsyNTY+ZztnKyspZFtnXT0xMjg+Zz9nPDwxOmc8PDFeMjgzO2Zvcih2YXIgeT0wLHY9MCxnPTA7MjU2Pmc7ZysrKXt2YXIgYj12XnY8PDFedjw8Ml52PDwzXnY8PDQsYj1iPj4+OF4yNTUmYl45OTtpW3ldPWIsb1tiXT15O3ZhciBfPWRbeV0sbT1kW19dLGs9ZFttXSxQPTI1NypkW2JdXjE2ODQzMDA4KmI7c1t5XT1QPDwyNHxQPj4+OCxhW3ldPVA8PDE2fFA+Pj4xNix1W3ldPVA8PDh8UD4+PjI0LGNbeV09UCxQPTE2ODQzMDA5KmteNjU1MzcqbV4yNTcqX14xNjg0MzAwOCp5LGxbYl09UDw8MjR8UD4+PjgsaFtiXT1QPDwxNnxQPj4+MTYsZltiXT1QPDw4fFA+Pj4yNCxwW2JdPVAseT8oeT1fXmRbZFtkW2teX11dXSx2Xj1kW2Rbdl1dKTp5PXY9MX12YXIgdz1bMCwxLDIsNCw4LDE2LDMyLDY0LDEyOCwyNyw1NF0scj1yLkFFUz10LmV4dGVuZCh7X2RvUmVzZXQ6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcy5fa2V5LHQ9ZS53b3JkcyxuPWUuc2lnQnl0ZXMvNCxlPTQqKCh0aGlzLl9uUm91bmRzPW4rNikrMSkscj10aGlzLl9rZXlTY2hlZHVsZT1bXSxvPTA7bzxlO28rKylpZihvPG4pcltvXT10W29dO2Vsc2V7dmFyIHM9cltvLTFdO28lbj82PG4mJjQ9PW8lbiYmKHM9aVtzPj4+MjRdPDwyNHxpW3M+Pj4xNiYyNTVdPDwxNnxpW3M+Pj44JjI1NV08PDh8aVsyNTUmc10pOihzPXM8PDh8cz4+PjI0LHM9aVtzPj4+MjRdPDwyNHxpW3M+Pj4xNiYyNTVdPDwxNnxpW3M+Pj44JjI1NV08PDh8aVsyNTUmc10sc149d1tvL258MF08PDI0KSxyW29dPXJbby1uXV5zfWZvcih0PXRoaXMuX2ludktleVNjaGVkdWxlPVtdLG49MDtuPGU7bisrKW89ZS1uLHM9biU0P3Jbb106cltvLTRdLHRbbl09ND5ufHw0Pj1vP3M6bFtpW3M+Pj4yNF1dXmhbaVtzPj4+MTYmMjU1XV1eZltpW3M+Pj44JjI1NV1dXnBbaVsyNTUmc11dfSxlbmNyeXB0QmxvY2s6ZnVuY3Rpb24oZSx0KXt0aGlzLl9kb0NyeXB0QmxvY2soZSx0LHRoaXMuX2tleVNjaGVkdWxlLHMsYSx1LGMsaSl9LGRlY3J5cHRCbG9jazpmdW5jdGlvbihlLHQpe3ZhciBuPWVbdCsxXTtlW3QrMV09ZVt0KzNdLGVbdCszXT1uLHRoaXMuX2RvQ3J5cHRCbG9jayhlLHQsdGhpcy5faW52S2V5U2NoZWR1bGUsbCxoLGYscCxvKSxuPWVbdCsxXSxlW3QrMV09ZVt0KzNdLGVbdCszXT1ufSxfZG9DcnlwdEJsb2NrOmZ1bmN0aW9uKGUsdCxuLHIsaSxvLHMsYSl7Zm9yKHZhciB1PXRoaXMuX25Sb3VuZHMsYz1lW3RdXm5bMF0sbD1lW3QrMV1eblsxXSxoPWVbdCsyXV5uWzJdLGY9ZVt0KzNdXm5bM10scD00LGQ9MTtkPHU7ZCsrKXZhciBnPXJbYz4+PjI0XV5pW2w+Pj4xNiYyNTVdXm9baD4+PjgmMjU1XV5zWzI1NSZmXV5uW3ArK10seT1yW2w+Pj4yNF1eaVtoPj4+MTYmMjU1XV5vW2Y+Pj44JjI1NV1ec1syNTUmY11ebltwKytdLHY9cltoPj4+MjRdXmlbZj4+PjE2JjI1NV1eb1tjPj4+OCYyNTVdXnNbMjU1JmxdXm5bcCsrXSxmPXJbZj4+PjI0XV5pW2M+Pj4xNiYyNTVdXm9bbD4+PjgmMjU1XV5zWzI1NSZoXV5uW3ArK10sYz1nLGw9eSxoPXY7Zz0oYVtjPj4+MjRdPDwyNHxhW2w+Pj4xNiYyNTVdPDwxNnxhW2g+Pj44JjI1NV08PDh8YVsyNTUmZl0pXm5bcCsrXSx5PShhW2w+Pj4yNF08PDI0fGFbaD4+PjE2JjI1NV08PDE2fGFbZj4+PjgmMjU1XTw8OHxhWzI1NSZjXSlebltwKytdLHY9KGFbaD4+PjI0XTw8MjR8YVtmPj4+MTYmMjU1XTw8MTZ8YVtjPj4+OCYyNTVdPDw4fGFbMjU1JmxdKV5uW3ArK10sZj0oYVtmPj4+MjRdPDwyNHxhW2M+Pj4xNiYyNTVdPDwxNnxhW2w+Pj44JjI1NV08PDh8YVsyNTUmaF0pXm5bcCsrXSxlW3RdPWcsZVt0KzFdPXksZVt0KzJdPXYsZVt0KzNdPWZ9LGtleVNpemU6OH0pO2UuQUVTPXQuX2NyZWF0ZUhlbHBlcihyKX0oKSxuLm1vZGUuRUNCPWZ1bmN0aW9uKCl7dmFyIGU9bi5saWIuQmxvY2tDaXBoZXJNb2RlLmV4dGVuZCgpO3JldHVybiBlLkVuY3J5cHRvcj1lLmV4dGVuZCh7cHJvY2Vzc0Jsb2NrOmZ1bmN0aW9uKGUsdCl7dGhpcy5fY2lwaGVyLmVuY3J5cHRCbG9jayhlLHQpfX0pLGUuRGVjcnlwdG9yPWUuZXh0ZW5kKHtwcm9jZXNzQmxvY2s6ZnVuY3Rpb24oZSx0KXt0aGlzLl9jaXBoZXIuZGVjcnlwdEJsb2NrKGUsdCl9fSksZX0oKSxlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmRlZmF1bHQ9e1BOTmV0d29ya1VwQ2F0ZWdvcnk6XCJQTk5ldHdvcmtVcENhdGVnb3J5XCIsUE5OZXR3b3JrRG93bkNhdGVnb3J5OlwiUE5OZXR3b3JrRG93bkNhdGVnb3J5XCIsUE5OZXR3b3JrSXNzdWVzQ2F0ZWdvcnk6XCJQTk5ldHdvcmtJc3N1ZXNDYXRlZ29yeVwiLFBOVGltZW91dENhdGVnb3J5OlwiUE5UaW1lb3V0Q2F0ZWdvcnlcIixQTkJhZFJlcXVlc3RDYXRlZ29yeTpcIlBOQmFkUmVxdWVzdENhdGVnb3J5XCIsUE5BY2Nlc3NEZW5pZWRDYXRlZ29yeTpcIlBOQWNjZXNzRGVuaWVkQ2F0ZWdvcnlcIixQTlVua25vd25DYXRlZ29yeTpcIlBOVW5rbm93bkNhdGVnb3J5XCIsUE5SZWNvbm5lY3RlZENhdGVnb3J5OlwiUE5SZWNvbm5lY3RlZENhdGVnb3J5XCIsUE5Db25uZWN0ZWRDYXRlZ29yeTpcIlBOQ29ubmVjdGVkQ2F0ZWdvcnlcIn0sZS5leHBvcnRzPXQuZGVmYXVsdH0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxyLmtleSxyKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixyKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxyJiZlKHQsciksdH19KCkscz1uKDExKSxhPShyKHMpLG4oMTIpKSx1PShyKGEpLG4oMTgpKSxjPShyKHUpLG4oMTkpKSxsPXIoYyksaD1uKDIyKSxmPXIoaCkscD0obigxMyksbigxNikpLGQ9cihwKSxnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXt2YXIgbj10LnN1YnNjcmliZUVuZHBvaW50LHI9dC5sZWF2ZUVuZHBvaW50LG89dC5oZWFydGJlYXRFbmRwb2ludCxzPXQuc2V0U3RhdGVFbmRwb2ludCxhPXQudGltZUVuZHBvaW50LHU9dC5jb25maWcsYz10LmNyeXB0byxoPXQubGlzdGVuZXJNYW5hZ2VyO2kodGhpcyxlKSx0aGlzLl9saXN0ZW5lck1hbmFnZXI9aCx0aGlzLl9jb25maWc9dSx0aGlzLl9sZWF2ZUVuZHBvaW50PXIsdGhpcy5faGVhcnRiZWF0RW5kcG9pbnQ9byx0aGlzLl9zZXRTdGF0ZUVuZHBvaW50PXMsdGhpcy5fc3Vic2NyaWJlRW5kcG9pbnQ9bix0aGlzLl9jcnlwdG89Yyx0aGlzLl9jaGFubmVscz17fSx0aGlzLl9wcmVzZW5jZUNoYW5uZWxzPXt9LHRoaXMuX2NoYW5uZWxHcm91cHM9e30sdGhpcy5fcHJlc2VuY2VDaGFubmVsR3JvdXBzPXt9LHRoaXMuX3BlbmRpbmdDaGFubmVsU3Vic2NyaXB0aW9ucz1bXSx0aGlzLl9wZW5kaW5nQ2hhbm5lbEdyb3VwU3Vic2NyaXB0aW9ucz1bXSx0aGlzLl90aW1ldG9rZW49MCx0aGlzLl9zdWJzY3JpcHRpb25TdGF0dXNBbm5vdW5jZWQ9ITEsdGhpcy5fcmVjb25uZWN0aW9uTWFuYWdlcj1uZXcgbC5kZWZhdWx0KHt0aW1lRW5kcG9pbnQ6YX0pfXJldHVybiBvKGUsW3trZXk6XCJhZGFwdFN0YXRlQ2hhbmdlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLHI9ZS5zdGF0ZSxpPWUuY2hhbm5lbHMsbz12b2lkIDA9PT1pP1tdOmkscz1lLmNoYW5uZWxHcm91cHMsYT12b2lkIDA9PT1zP1tdOnM7by5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UgaW4gbi5fY2hhbm5lbHMmJihuLl9jaGFubmVsc1tlXS5zdGF0ZT1yKX0pLGEuZm9yRWFjaChmdW5jdGlvbihlKXtlIGluIG4uX2NoYW5uZWxHcm91cHMmJihuLl9jaGFubmVsR3JvdXBzW2VdLnN0YXRlPXIpfSksdGhpcy5fc2V0U3RhdGVFbmRwb2ludCh7c3RhdGU6cixjaGFubmVsczpvLGNoYW5uZWxHcm91cHM6YX0sdCl9fSx7a2V5OlwiYWRhcHRTdWJzY3JpYmVDaGFuZ2VcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLG49ZS50aW1ldG9rZW4scj1lLmNoYW5uZWxzLGk9dm9pZCAwPT09cj9bXTpyLG89ZS5jaGFubmVsR3JvdXBzLHM9dm9pZCAwPT09bz9bXTpvLGE9ZS53aXRoUHJlc2VuY2UsdT12b2lkIDAhPT1hJiZhO24mJih0aGlzLl90aW1ldG9rZW49biksaS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuX2NoYW5uZWxzW2VdPXtzdGF0ZTp7fX0sdSYmKHQuX3ByZXNlbmNlQ2hhbm5lbHNbZV09e30pLHQuX3BlbmRpbmdDaGFubmVsU3Vic2NyaXB0aW9ucy5wdXNoKGUpfSkscy5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QuX2NoYW5uZWxHcm91cHNbZV09e3N0YXRlOnt9fSx1JiYodC5fcHJlc2VuY2VDaGFubmVsR3JvdXBzW2VdPXt9KSx0Ll9wZW5kaW5nQ2hhbm5lbEdyb3VwU3Vic2NyaXB0aW9ucy5wdXNoKGUpfSksdGhpcy5fc3Vic2NyaXB0aW9uU3RhdHVzQW5ub3VuY2VkPSExLHRoaXMucmVjb25uZWN0KCl9fSx7a2V5OlwiYWRhcHRVbnN1YnNjcmliZUNoYW5nZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsbj1lLmNoYW5uZWxzLHI9dm9pZCAwPT09bj9bXTpuLGk9ZS5jaGFubmVsR3JvdXBzLG89dm9pZCAwPT09aT9bXTppO3IuZm9yRWFjaChmdW5jdGlvbihlKXtlIGluIHQuX2NoYW5uZWxzJiZkZWxldGUgdC5fY2hhbm5lbHNbZV0sZSBpbiB0Ll9wcmVzZW5jZUNoYW5uZWxzJiZkZWxldGUgdC5fcHJlc2VuY2VDaGFubmVsc1tlXX0pLG8uZm9yRWFjaChmdW5jdGlvbihlKXtlIGluIHQuX2NoYW5uZWxHcm91cHMmJmRlbGV0ZSB0Ll9jaGFubmVsR3JvdXBzW2VdLGUgaW4gdC5fcHJlc2VuY2VDaGFubmVsR3JvdXBzJiZkZWxldGUgdC5fY2hhbm5lbEdyb3Vwc1tlXX0pLHRoaXMuX2NvbmZpZy5zdXBwcmVzc0xlYXZlRXZlbnRzPT09ITEmJnRoaXMuX2xlYXZlRW5kcG9pbnQoe2NoYW5uZWxzOnIsY2hhbm5lbEdyb3VwczpvfSxmdW5jdGlvbihlKXtlLmFmZmVjdGVkQ2hhbm5lbHM9cixlLmFmZmVjdGVkQ2hhbm5lbEdyb3Vwcz1vLHQuX2xpc3RlbmVyTWFuYWdlci5hbm5vdW5jZVN0YXR1cyhlKX0pLHRoaXMucmVjb25uZWN0KCl9fSx7a2V5OlwidW5zdWJzY3JpYmVBbGxcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuYWRhcHRVbnN1YnNjcmliZUNoYW5nZSh7Y2hhbm5lbHM6dGhpcy5nZXRTdWJzY3JpYmVkQ2hhbm5lbHMoKSxjaGFubmVsR3JvdXBzOnRoaXMuZ2V0U3Vic2NyaWJlZENoYW5uZWxHcm91cHMoKX0pfX0se2tleTpcImdldFN1YnNjcmliZWRDaGFubmVsc1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoYW5uZWxzKX19LHtrZXk6XCJnZXRTdWJzY3JpYmVkQ2hhbm5lbEdyb3Vwc1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoYW5uZWxHcm91cHMpfX0se2tleTpcInJlY29ubmVjdFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5fc3RhcnRTdWJzY3JpYmVMb29wKCksdGhpcy5fcmVnaXN0ZXJIZWFydGJlYXRUaW1lcigpfX0se2tleTpcImRpc2Nvbm5lY3RcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuX3N0b3BTdWJzY3JpYmVMb29wKCksdGhpcy5fc3RvcEhlYXJ0YmVhdFRpbWVyKCl9fSx7a2V5OlwiX3JlZ2lzdGVySGVhcnRiZWF0VGltZXJcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuX3N0b3BIZWFydGJlYXRUaW1lcigpLHRoaXMuX3BlcmZvcm1IZWFydGJlYXRMb29wKCksdGhpcy5faGVhcnRiZWF0VGltZXI9c2V0SW50ZXJ2YWwodGhpcy5fcGVyZm9ybUhlYXJ0YmVhdExvb3AuYmluZCh0aGlzKSwxZTMqdGhpcy5fY29uZmlnLmdldEhlYXJ0YmVhdEludGVydmFsKCkpfX0se2tleTpcIl9zdG9wSGVhcnRiZWF0VGltZXJcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuX2hlYXJ0YmVhdFRpbWVyJiYoY2xlYXJJbnRlcnZhbCh0aGlzLl9oZWFydGJlYXRUaW1lciksdGhpcy5faGVhcnRiZWF0VGltZXI9bnVsbCl9fSx7a2V5OlwiX3BlcmZvcm1IZWFydGJlYXRMb29wXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9T2JqZWN0LmtleXModGhpcy5fY2hhbm5lbHMpLG49T2JqZWN0LmtleXModGhpcy5fY2hhbm5lbEdyb3Vwcykscj17fTtpZigwIT09dC5sZW5ndGh8fDAhPT1uLmxlbmd0aCl7dC5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBuPWUuX2NoYW5uZWxzW3RdLnN0YXRlO09iamVjdC5rZXlzKG4pLmxlbmd0aCYmKHJbdF09bil9KSxuLmZvckVhY2goZnVuY3Rpb24odCl7dmFyIG49ZS5fY2hhbm5lbEdyb3Vwc1t0XS5zdGF0ZTtPYmplY3Qua2V5cyhuKS5sZW5ndGgmJihyW3RdPW4pfSk7dmFyIGk9ZnVuY3Rpb24odCl7dC5lcnJvciYmZS5fY29uZmlnLmFubm91bmNlRmFpbGVkSGVhcnRiZWF0cyYmZS5fbGlzdGVuZXJNYW5hZ2VyLmFubm91bmNlU3RhdHVzKHQpLCF0LmVycm9yJiZlLl9jb25maWcuYW5ub3VuY2VTdWNjZXNzZnVsSGVhcnRiZWF0cyYmZS5fbGlzdGVuZXJNYW5hZ2VyLmFubm91bmNlU3RhdHVzKHQpfTt0aGlzLl9oZWFydGJlYXRFbmRwb2ludCh7Y2hhbm5lbHM6dCxjaGFubmVsR3JvdXBzOm4sc3RhdGU6cn0saS5iaW5kKHRoaXMpKX19fSx7a2V5OlwiX3N0YXJ0U3Vic2NyaWJlTG9vcFwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5fc3RvcFN1YnNjcmliZUxvb3AoKTt2YXIgZT1bXSx0PVtdO2lmKE9iamVjdC5rZXlzKHRoaXMuX2NoYW5uZWxzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLnB1c2godCl9KSxPYmplY3Qua2V5cyh0aGlzLl9wcmVzZW5jZUNoYW5uZWxzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLnB1c2godCtcIi1wbnByZXNcIil9KSxPYmplY3Qua2V5cyh0aGlzLl9jaGFubmVsR3JvdXBzKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiB0LnB1c2goZSl9KSxPYmplY3Qua2V5cyh0aGlzLl9wcmVzZW5jZUNoYW5uZWxHcm91cHMpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIHQucHVzaChlK1wiLXBucHJlc1wiKX0pLDAhPT1lLmxlbmd0aHx8MCE9PXQubGVuZ3RoKXt2YXIgbj17Y2hhbm5lbHM6ZSxjaGFubmVsR3JvdXBzOnQsdGltZXRva2VuOnRoaXMuX3RpbWV0b2tlbixmaWx0ZXJFeHByZXNzaW9uOnRoaXMuX2NvbmZpZy5maWx0ZXJFeHByZXNzaW9uLHJlZ2lvbjp0aGlzLl9yZWdpb259O3RoaXMuX3N1YnNjcmliZUNhbGw9dGhpcy5fc3Vic2NyaWJlRW5kcG9pbnQobix0aGlzLl9wcm9jZXNzU3Vic2NyaWJlUmVzcG9uc2UuYmluZCh0aGlzKSl9fX0se2tleTpcIl9wcm9jZXNzU3Vic2NyaWJlUmVzcG9uc2VcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7aWYoZS5lcnJvcilyZXR1cm4gdm9pZChlLmNhdGVnb3J5PT09ZC5kZWZhdWx0LlBOVGltZW91dENhdGVnb3J5P3RoaXMuX3N0YXJ0U3Vic2NyaWJlTG9vcCgpOmUuY2F0ZWdvcnk9PT1kLmRlZmF1bHQuUE5OZXR3b3JrSXNzdWVzQ2F0ZWdvcnk/KHRoaXMuZGlzY29ubmVjdCgpLHRoaXMuX3JlY29ubmVjdGlvbk1hbmFnZXIub25SZWNvbm5lY3Rpb24oZnVuY3Rpb24oKXtuLnJlY29ubmVjdCgpLG4uX3N1YnNjcmlwdGlvblN0YXR1c0Fubm91bmNlZD0hMDt2YXIgdD17Y2F0ZWdvcnk6ZC5kZWZhdWx0LlBOUmVjb25uZWN0ZWRDYXRlZ29yeSxvcGVyYXRpb246ZS5vcGVyYXRpb259O24uX2xpc3RlbmVyTWFuYWdlci5hbm5vdW5jZVN0YXR1cyh0KX0pLHRoaXMuX3JlY29ubmVjdGlvbk1hbmFnZXIuc3RhcnRQb2xsaW5nKCksdGhpcy5fbGlzdGVuZXJNYW5hZ2VyLmFubm91bmNlU3RhdHVzKGUpKTp0aGlzLl9saXN0ZW5lck1hbmFnZXIuYW5ub3VuY2VTdGF0dXMoZSkpO2lmKCF0aGlzLl9zdWJzY3JpcHRpb25TdGF0dXNBbm5vdW5jZWQpe3ZhciByPXt9O3IuY2F0ZWdvcnk9ZC5kZWZhdWx0LlBOQ29ubmVjdGVkQ2F0ZWdvcnksci5vcGVyYXRpb249ZS5vcGVyYXRpb24sci5hZmZlY3RlZENoYW5uZWxzPXRoaXMuX3BlbmRpbmdDaGFubmVsU3Vic2NyaXB0aW9ucyxyLmFmZmVjdGVkQ2hhbm5lbEdyb3Vwcz10aGlzLl9wZW5kaW5nQ2hhbm5lbEdyb3VwU3Vic2NyaXB0aW9ucyx0aGlzLl9zdWJzY3JpcHRpb25TdGF0dXNBbm5vdW5jZWQ9ITAsdGhpcy5fbGlzdGVuZXJNYW5hZ2VyLmFubm91bmNlU3RhdHVzKHIpLHRoaXMuX3BlbmRpbmdDaGFubmVsU3Vic2NyaXB0aW9ucz1bXSx0aGlzLl9wZW5kaW5nQ2hhbm5lbEdyb3VwU3Vic2NyaXB0aW9ucz1bXX10Lm1lc3NhZ2VzLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jaGFubmVsLHI9ZS5zdWJzY3JpcHRpb25NYXRjaCxpPWUucHVibGlzaE1ldGFEYXRhO2lmKHQ9PT1yJiYocj1udWxsKSxmLmRlZmF1bHQuZW5kc1dpdGgoZS5jaGFubmVsLFwiLXBucHJlc1wiKSl7dmFyIG89e307by5jaGFubmVsPW51bGwsby5zdWJzY3JpcHRpb249bnVsbCxvLmFjdHVhbENoYW5uZWw9bnVsbCE9cj90Om51bGwsby5zdWJzY3JpYmVkQ2hhbm5lbD1udWxsIT1yP3I6dCx0JiYoby5jaGFubmVsPXQuc3Vic3RyaW5nKDAsdC5sYXN0SW5kZXhPZihcIi1wbnByZXNcIikpKSxyJiYoby5zdWJzY3JpcHRpb249ci5zdWJzdHJpbmcoMCxyLmxhc3RJbmRleE9mKFwiLXBucHJlc1wiKSkpLG8uYWN0aW9uPWUucGF5bG9hZC5hY3Rpb24sby5zdGF0ZT1lLnBheWxvYWQuZGF0YSxvLnRpbWV0b2tlbj1pLnB1Ymxpc2hUaW1ldG9rZW4sby5vY2N1cGFuY3k9ZS5wYXlsb2FkLm9jY3VwYW5jeSxvLnV1aWQ9ZS5wYXlsb2FkLnV1aWQsby50aW1lc3RhbXA9ZS5wYXlsb2FkLnRpbWVzdGFtcCxuLl9saXN0ZW5lck1hbmFnZXIuYW5ub3VuY2VQcmVzZW5jZShvKX1lbHNle3ZhciBzPXt9O3MuY2hhbm5lbD1udWxsLHMuc3Vic2NyaXB0aW9uPW51bGwscy5hY3R1YWxDaGFubmVsPW51bGwhPXI/dDpudWxsLHMuc3Vic2NyaWJlZENoYW5uZWw9bnVsbCE9cj9yOnQscy5jaGFubmVsPXQscy5zdWJzY3JpcHRpb249cixzLnRpbWV0b2tlbj1pLnB1Ymxpc2hUaW1ldG9rZW4sbi5fY29uZmlnLmNpcGhlcktleT9zLm1lc3NhZ2U9bi5fY3J5cHRvLmRlY3J5cHQoZS5wYXlsb2FkKTpzLm1lc3NhZ2U9ZS5wYXlsb2FkLG4uX2xpc3RlbmVyTWFuYWdlci5hbm5vdW5jZU1lc3NhZ2Uocyl9fSksdGhpcy5fcmVnaW9uPXQubWV0YWRhdGEucmVnaW9uLHRoaXMuX3RpbWV0b2tlbj10Lm1ldGFkYXRhLnRpbWV0b2tlbix0aGlzLl9zdGFydFN1YnNjcmliZUxvb3AoKX19LHtrZXk6XCJfc3RvcFN1YnNjcmliZUxvb3BcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuX3N1YnNjcmliZUNhbGwmJih0aGlzLl9zdWJzY3JpYmVDYWxsLmFib3J0KCksdGhpcy5fc3Vic2NyaWJlQ2FsbD1udWxsKX19XSksZX0oKTt0LmRlZmF1bHQ9ZyxlLmV4cG9ydHM9dC5kZWZhdWx0fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaShlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIua2V5LHIpfX1yZXR1cm4gZnVuY3Rpb24odCxuLHIpe3JldHVybiBuJiZlKHQucHJvdG90eXBlLG4pLHImJmUodCxyKSx0fX0oKSxzPShuKDEzKSxuKDE2KSksYT1yKHMpLHU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7aSh0aGlzLGUpLHRoaXMuX2xpc3RlbmVycz1bXX1yZXR1cm4gbyhlLFt7a2V5OlwiYWRkTGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLl9saXN0ZW5lcnMucHVzaChlKX19LHtrZXk6XCJyZW1vdmVMaXN0ZW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PVtdO3RoaXMuX2xpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKG4pe24hPT1lJiZ0LnB1c2gobil9KSx0aGlzLl9saXN0ZW5lcnM9dH19LHtrZXk6XCJyZW1vdmVBbGxMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuX2xpc3RlbmVycz1bXX19LHtrZXk6XCJhbm5vdW5jZVByZXNlbmNlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24odCl7dC5wcmVzZW5jZSYmdC5wcmVzZW5jZShlKX0pfX0se2tleTpcImFubm91bmNlU3RhdHVzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24odCl7dC5zdGF0dXMmJnQuc3RhdHVzKGUpfSl9fSx7a2V5OlwiYW5ub3VuY2VNZXNzYWdlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24odCl7dC5tZXNzYWdlJiZ0Lm1lc3NhZ2UoZSl9KX19LHtrZXk6XCJhbm5vdW5jZU5ldHdvcmtVcFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9e307ZS5jYXRlZ29yeT1hLmRlZmF1bHQuUE5OZXR3b3JrVXBDYXRlZ29yeSx0aGlzLmFubm91bmNlU3RhdHVzKGUpfX0se2tleTpcImFubm91bmNlTmV0d29ya0Rvd25cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXt9O2UuY2F0ZWdvcnk9YS5kZWZhdWx0LlBOTmV0d29ya0Rvd25DYXRlZ29yeSx0aGlzLmFubm91bmNlU3RhdHVzKGUpfX1dKSxlfSgpO3QuZGVmYXVsdD11LGUuZXhwb3J0cz10LmRlZmF1bHR9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIHI9dFtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsci5rZXkscil9fXJldHVybiBmdW5jdGlvbih0LG4scil7cmV0dXJuIG4mJmUodC5wcm90b3R5cGUsbiksciYmZSh0LHIpLHR9fSgpLHM9bigyMCksYT0ocihzKSxuKDEzKSxmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7dmFyIG49dC50aW1lRW5kcG9pbnQ7aSh0aGlzLGUpLHRoaXMuX3RpbWVFbmRwb2ludD1ufXJldHVybiBvKGUsW3trZXk6XCJvblJlY29ubmVjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuX3JlY29ubmVjdGlvbkNhbGxiYWNrPWV9fSx7a2V5Olwic3RhcnRQb2xsaW5nXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLl90aW1lVGltZXI9c2V0SW50ZXJ2YWwodGhpcy5fcGVyZm9ybVRpbWVMb29wLmJpbmQodGhpcyksM2UzKX19LHtrZXk6XCJfcGVyZm9ybVRpbWVMb29wXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMuX3RpbWVFbmRwb2ludChmdW5jdGlvbih0KXt0LmVycm9yfHwoY2xlYXJJbnRlcnZhbChlLl90aW1lVGltZXIpLGUuX3JlY29ubmVjdGlvbkNhbGxiYWNrKCkpfSl9fV0pLGV9KCkpO3QuZGVmYXVsdD1hLGUuZXhwb3J0cz10LmRlZmF1bHR9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKCl7cmV0dXJuIGYuZGVmYXVsdC5QTlRpbWVPcGVyYXRpb259ZnVuY3Rpb24gbygpe3JldHVyblwiL3RpbWUvMFwifWZ1bmN0aW9uIHMoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gYSgpe3JldHVybnt9fWZ1bmN0aW9uIHUoKXtyZXR1cm4hMX1mdW5jdGlvbiBjKGUsdCl7cmV0dXJue3RpbWV0b2tlbjp0WzBdfX1mdW5jdGlvbiBsKCl7fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC5nZXRVUkw9byx0LmdldFJlcXVlc3RUaW1lb3V0PXMsdC5wcmVwYXJlUGFyYW1zPWEsdC5pc0F1dGhTdXBwb3J0ZWQ9dSx0LmhhbmRsZVJlc3BvbnNlPWMsdC52YWxpZGF0ZVBhcmFtcz1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZGVmYXVsdD17UE5UaW1lT3BlcmF0aW9uOlwiUE5UaW1lT3BlcmF0aW9uXCIsUE5IaXN0b3J5T3BlcmF0aW9uOlwiUE5IaXN0b3J5T3BlcmF0aW9uXCIsUE5TdWJzY3JpYmVPcGVyYXRpb246XCJQTlN1YnNjcmliZU9wZXJhdGlvblwiLFBOVW5zdWJzY3JpYmVPcGVyYXRpb246XCJQTlVuc3Vic2NyaWJlT3BlcmF0aW9uXCIsUE5QdWJsaXNoT3BlcmF0aW9uOlwiUE5QdWJsaXNoT3BlcmF0aW9uXCIsUE5QdXNoTm90aWZpY2F0aW9uRW5hYmxlZENoYW5uZWxzT3BlcmF0aW9uOlwiUE5QdXNoTm90aWZpY2F0aW9uRW5hYmxlZENoYW5uZWxzT3BlcmF0aW9uXCIsUE5SZW1vdmVBbGxQdXNoTm90aWZpY2F0aW9uc09wZXJhdGlvbjpcIlBOUmVtb3ZlQWxsUHVzaE5vdGlmaWNhdGlvbnNPcGVyYXRpb25cIixQTldoZXJlTm93T3BlcmF0aW9uOlwiUE5XaGVyZU5vd09wZXJhdGlvblwiLFBOU2V0U3RhdGVPcGVyYXRpb246XCJQTlNldFN0YXRlT3BlcmF0aW9uXCIsUE5IZXJlTm93T3BlcmF0aW9uOlwiUE5IZXJlTm93T3BlcmF0aW9uXCIsUE5HZXRTdGF0ZU9wZXJhdGlvbjpcIlBOR2V0U3RhdGVPcGVyYXRpb25cIixQTkhlYXJ0YmVhdE9wZXJhdGlvbjpcIlBOSGVhcnRiZWF0T3BlcmF0aW9uXCIsUE5DaGFubmVsR3JvdXBzT3BlcmF0aW9uOlwiUE5DaGFubmVsR3JvdXBzT3BlcmF0aW9uXCIsUE5SZW1vdmVHcm91cE9wZXJhdGlvbjpcIlBOUmVtb3ZlR3JvdXBPcGVyYXRpb25cIixQTkNoYW5uZWxzRm9yR3JvdXBPcGVyYXRpb246XCJQTkNoYW5uZWxzRm9yR3JvdXBPcGVyYXRpb25cIixQTkFkZENoYW5uZWxzVG9Hcm91cE9wZXJhdGlvbjpcIlBOQWRkQ2hhbm5lbHNUb0dyb3VwT3BlcmF0aW9uXCIsUE5SZW1vdmVDaGFubmVsc0Zyb21Hcm91cE9wZXJhdGlvbjpcIlBOUmVtb3ZlQ2hhbm5lbHNGcm9tR3JvdXBPcGVyYXRpb25cIixQTkFjY2Vzc01hbmFnZXJHcmFudDpcIlBOQWNjZXNzTWFuYWdlckdyYW50XCIsUE5BY2Nlc3NNYW5hZ2VyQXVkaXQ6XCJQTkFjY2Vzc01hbmFnZXJBdWRpdFwifSxlLmV4cG9ydHM9dC5kZWZhdWx0fSxmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChlKS5yZXBsYWNlKC9bIScoKSp+XS9nLGZ1bmN0aW9uKGUpe3JldHVyblwiJVwiK2UuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX0pfWZ1bmN0aW9uIHIoZSl7dmFyIHQ9W107cmV0dXJuIE9iamVjdC5rZXlzKGUpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIHQucHVzaChlKX0pLHR9ZnVuY3Rpb24gaShlKXtyZXR1cm4gcihlKS5zb3J0KCl9ZnVuY3Rpb24gbyhlKXt2YXIgdD1pKGUpO3JldHVybiB0Lm1hcChmdW5jdGlvbih0KXtyZXR1cm4gdCtcIj1cIituKGVbdF0pfSkuam9pbihcIiZcIil9ZS5leHBvcnRzPXtzaWduUGFtRnJvbVBhcmFtczpvLGVuZHNXaXRoOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuaW5kZXhPZih0LHRoaXMubGVuZ3RoLXQubGVuZ3RoKSE9PS0xfX19LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKGUsdCl7cmV0dXJuIGUudHlwZT10LGV9ZnVuY3Rpb24gbyhlKXtyZXR1cm4gaSh7bWVzc2FnZTplfSxcInZhbGlkYXRpb25FcnJvclwiKX1mdW5jdGlvbiBzKGUpe3ZhciB0PVwiUHViTnViLUpTLVwiK2Uuc2RrRmFtaWx5O3JldHVybiBlLnBhcnRuZXJJZCYmKHQrPVwiLVwiK2UucGFydG5lcklkKSx0Kz1cIi9cIitlLmdldFZlcnNpb24oKX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmRlZmF1bHQ9ZnVuY3Rpb24oZSx0KXt2YXIgbj1lLm5ldHdvcmtpbmcscj1lLmNvbmZpZyxpPWUuY3J5cHRvLGE9bnVsbCxjPXt9O3QuZ2V0T3BlcmF0aW9uKCk9PT1wLmRlZmF1bHQuUE5UaW1lT3BlcmF0aW9ufHx0LmdldE9wZXJhdGlvbigpPT09cC5kZWZhdWx0LlBOQ2hhbm5lbEdyb3Vwc09wZXJhdGlvbj9hPWFyZ3VtZW50cy5sZW5ndGg8PTI/dm9pZCAwOmFyZ3VtZW50c1syXTooYz1hcmd1bWVudHMubGVuZ3RoPD0yP3ZvaWQgMDphcmd1bWVudHNbMl0sYT1hcmd1bWVudHMubGVuZ3RoPD0zP3ZvaWQgMDphcmd1bWVudHNbM10pO3ZhciBoPXQudmFsaWRhdGVQYXJhbXMoZSxjKTtpZihoKXJldHVybiB2b2lkIGEobyhoKSk7dmFyIGY9dC5wcmVwYXJlUGFyYW1zKGUsYyk7aWYoZi51dWlkPXIuVVVJRCxmLnBuc2RrPXMociksci51c2VJbnN0YW5jZUlkJiYoZi5pbnN0YW5jZWlkPXIuaW5zdGFuY2VJZCksci51c2VSZXF1ZXN0SWQmJihmLnJlcXVlc3RpZD11LmRlZmF1bHQudjQoKSksdC5pc0F1dGhTdXBwb3J0ZWQoKSYmci5nZXRBdXRoS2V5KCkmJihmLmF1dGg9ci5nZXRBdXRoS2V5KCkpLHQuZ2V0T3BlcmF0aW9uKCk9PT1wLmRlZmF1bHQuUE5BY2Nlc3NNYW5hZ2VyR3JhbnQpe3ZhciBkPXIuc3Vic2NyaWJlS2V5K1wiXFxuXCIrci5wdWJsaXNoS2V5K1wiXFxuZ3JhbnRcXG5cIjtkKz1sLmRlZmF1bHQuc2lnblBhbUZyb21QYXJhbXMoZiksZi5zaWduYXR1cmU9aS5ITUFDU0hBMjU2KGQpfWlmKHQuZ2V0T3BlcmF0aW9uKCk9PT1wLmRlZmF1bHQuUE5BY2Nlc3NNYW5hZ2VyQXVkaXQpe3ZhciBnPXIuc3Vic2NyaWJlS2V5K1wiXFxuXCIrci5wdWJsaXNoS2V5K1wiXFxuYXVkaXRcXG5cIjtnKz1sLmRlZmF1bHQuc2lnblBhbUZyb21QYXJhbXMoZiksZi5zaWduYXR1cmU9aS5ITUFDU0hBMjU2KGcpfXZhciB5PWZ1bmN0aW9uKG4scil7aWYoYSl7aWYobi5lcnJvcilyZXR1cm4gYShuKTthKG4sdC5oYW5kbGVSZXNwb25zZShlLHIsYykpfX0sdj12b2lkIDA7aWYodC51c2VQb3N0JiZ0LnVzZVBvc3QoZSxjKSl7dmFyIGI9dC5wb3N0VVJMKGUsYyksXz17dXJsOmIsb3BlcmF0aW9uOnQuZ2V0T3BlcmF0aW9uKCksdGltZW91dDp0LmdldFJlcXVlc3RUaW1lb3V0KGUpfSxtPXQucG9zdFBheWxvYWQoZSxjKTt2PW4uUE9TVChmLG0sXyx5KX1lbHNle3ZhciBrPXQuZ2V0VVJMKGUsYyksUD17dXJsOmssb3BlcmF0aW9uOnQuZ2V0T3BlcmF0aW9uKCksdGltZW91dDp0LmdldFJlcXVlc3RUaW1lb3V0KGUpfTt2PW4uR0VUKGYsUCx5KX1yZXR1cm4gdC5nZXRPcGVyYXRpb24oKT09PXAuZGVmYXVsdC5QTlN1YnNjcmliZU9wZXJhdGlvbj92OnZvaWQgMH07dmFyIGE9bigyKSx1PXIoYSksYz0obigxMyksbigyMikpLGw9cihjKSxoPW4oMTIpLGY9KHIoaCksbigyMSkpLHA9cihmKTtlLmV4cG9ydHM9dC5kZWZhdWx0fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5BZGRDaGFubmVsc1RvR3JvdXBPcGVyYXRpb259ZnVuY3Rpb24gbyhlLHQpe3ZhciBuPXQuY2hhbm5lbHMscj10LmNoYW5uZWxHcm91cCxpPWUuY29uZmlnO3JldHVybiByP24mJjAhPT1uLmxlbmd0aD9pLnN1YnNjcmliZUtleT92b2lkIDA6XCJNaXNzaW5nIFN1YnNjcmliZSBLZXlcIjpcIk1pc3NpbmcgQ2hhbm5lbHNcIjpcIk1pc3NpbmcgQ2hhbm5lbCBHcm91cFwifWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj10LmNoYW5uZWxHcm91cCxyPWUuY29uZmlnO3JldHVyblwiL3YxL2NoYW5uZWwtcmVnaXN0cmF0aW9uL3N1Yi1rZXkvXCIrci5zdWJzY3JpYmVLZXkrXCIvY2hhbm5lbC1ncm91cC9cIitufWZ1bmN0aW9uIGEoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gdSgpe3JldHVybiEwfWZ1bmN0aW9uIGMoZSx0KXt2YXIgbj10LmNoYW5uZWxzLHI9dm9pZCAwPT09bj9bXTpuO3JldHVybnthZGQ6ci5qb2luKFwiLFwiKX19ZnVuY3Rpb24gbCgpe3JldHVybnt9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5nZXRSZXF1ZXN0VGltZW91dD1hLHQuaXNBdXRoU3VwcG9ydGVkPXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5SZW1vdmVDaGFubmVsc0Zyb21Hcm91cE9wZXJhdGlvbn1mdW5jdGlvbiBvKGUsdCl7dmFyIG49dC5jaGFubmVscyxyPXQuY2hhbm5lbEdyb3VwLGk9ZS5jb25maWc7cmV0dXJuIHI/biYmMCE9PW4ubGVuZ3RoP2kuc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBDaGFubmVsc1wiOlwiTWlzc2luZyBDaGFubmVsIEdyb3VwXCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPXQuY2hhbm5lbEdyb3VwLHI9ZS5jb25maWc7cmV0dXJuXCIvdjEvY2hhbm5lbC1yZWdpc3RyYXRpb24vc3ViLWtleS9cIityLnN1YnNjcmliZUtleStcIi9jaGFubmVsLWdyb3VwL1wiK259ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQuY2hhbm5lbHMscj12b2lkIDA9PT1uP1tdOm47cmV0dXJue3JlbW92ZTpyLmpvaW4oXCIsXCIpfX1mdW5jdGlvbiBsKCl7cmV0dXJue319T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5nZXRPcGVyYXRpb249aSx0LnZhbGlkYXRlUGFyYW1zPW8sdC5nZXRVUkw9cyx0LmdldFJlcXVlc3RUaW1lb3V0PWEsdC5pc0F1dGhTdXBwb3J0ZWQ9dSx0LnByZXBhcmVQYXJhbXM9Yyx0LmhhbmRsZVJlc3BvbnNlPWw7dmFyIGg9KG4oMTMpLG4oMjEpKSxmPXIoaCl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKCl7cmV0dXJuIGYuZGVmYXVsdC5QTlJlbW92ZUdyb3VwT3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSx0KXt2YXIgbj10LmNoYW5uZWxHcm91cCxyPWUuY29uZmlnO3JldHVybiBuP3Iuc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBDaGFubmVsIEdyb3VwXCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPXQuY2hhbm5lbEdyb3VwLHI9ZS5jb25maWc7cmV0dXJuXCIvdjEvY2hhbm5lbC1yZWdpc3RyYXRpb24vc3ViLWtleS9cIityLnN1YnNjcmliZUtleStcIi9jaGFubmVsLWdyb3VwL1wiK24rXCIvcmVtb3ZlXCJ9ZnVuY3Rpb24gYSgpe3JldHVybiEwfWZ1bmN0aW9uIHUoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gYygpe3JldHVybnt9fWZ1bmN0aW9uIGwoKXtyZXR1cm57fX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuaXNBdXRoU3VwcG9ydGVkPWEsdC5nZXRSZXF1ZXN0VGltZW91dD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoKXtyZXR1cm4gZi5kZWZhdWx0LlBOQ2hhbm5lbEdyb3Vwc09wZXJhdGlvbn1mdW5jdGlvbiBvKGUpe3ZhciB0PWUuY29uZmlnO2lmKCF0LnN1YnNjcmliZUtleSlyZXR1cm5cIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwifWZ1bmN0aW9uIHMoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuXCIvdjEvY2hhbm5lbC1yZWdpc3RyYXRpb24vc3ViLWtleS9cIit0LnN1YnNjcmliZUtleStcIi9jaGFubmVsLWdyb3VwXCJ9ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYygpe3JldHVybnt9fWZ1bmN0aW9uIGwoZSx0KXtyZXR1cm57Z3JvdXBzOnQucGF5bG9hZC5ncm91cHN9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5nZXRSZXF1ZXN0VGltZW91dD1hLHQuaXNBdXRoU3VwcG9ydGVkPXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5DaGFubmVsc0Zvckdyb3VwT3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSx0KXt2YXIgbj10LmNoYW5uZWxHcm91cCxyPWUuY29uZmlnO3JldHVybiBuP3Iuc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBDaGFubmVsIEdyb3VwXCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPXQuY2hhbm5lbEdyb3VwLHI9ZS5jb25maWc7cmV0dXJuXCIvdjEvY2hhbm5lbC1yZWdpc3RyYXRpb24vc3ViLWtleS9cIityLnN1YnNjcmliZUtleStcIi9jaGFubmVsLWdyb3VwL1wiK259ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYygpe3JldHVybnt9fWZ1bmN0aW9uIGwoZSx0KXtyZXR1cm57Y2hhbm5lbHM6dC5wYXlsb2FkLmNoYW5uZWxzfX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9YSx0LmlzQXV0aFN1cHBvcnRlZD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoKXtyZXR1cm4gZi5kZWZhdWx0LlBOUHVzaE5vdGlmaWNhdGlvbkVuYWJsZWRDaGFubmVsc09wZXJhdGlvbn1mdW5jdGlvbiBvKGUsdCl7dmFyIG49dC5kZXZpY2Uscj10LnB1c2hHYXRld2F5LGk9dC5jaGFubmVscyxvPWUuY29uZmlnO3JldHVybiBuP3I/aSYmMCE9PWkubGVuZ3RoP28uc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBDaGFubmVsc1wiOlwiTWlzc2luZyBHVyBUeXBlIChwdXNoR2F0ZXdheTogZ2NtIG9yIGFwbnMpXCI6XCJNaXNzaW5nIERldmljZSBJRCAoZGV2aWNlKVwifWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj10LmRldmljZSxyPWUuY29uZmlnO3JldHVyblwiL3YxL3B1c2gvc3ViLWtleS9cIityLnN1YnNjcmliZUtleStcIi9kZXZpY2VzL1wiK259ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQucHVzaEdhdGV3YXkscj10LmNoYW5uZWxzLGk9dm9pZCAwPT09cj9bXTpyO3JldHVybnt0eXBlOm4sYWRkOmkuam9pbihcIixcIil9fWZ1bmN0aW9uIGwoKXtyZXR1cm57fX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9YSx0LmlzQXV0aFN1cHBvcnRlZD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoKXtyZXR1cm4gZi5kZWZhdWx0LlBOUHVzaE5vdGlmaWNhdGlvbkVuYWJsZWRDaGFubmVsc09wZXJhdGlvbn1mdW5jdGlvbiBvKGUsdCl7dmFyIG49dC5kZXZpY2Uscj10LnB1c2hHYXRld2F5LGk9dC5jaGFubmVscyxvPWUuY29uZmlnO3JldHVybiBuP3I/aSYmMCE9PWkubGVuZ3RoP28uc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBDaGFubmVsc1wiOlwiTWlzc2luZyBHVyBUeXBlIChwdXNoR2F0ZXdheTogZ2NtIG9yIGFwbnMpXCI6XCJNaXNzaW5nIERldmljZSBJRCAoZGV2aWNlKVwifWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj10LmRldmljZSxyPWUuY29uZmlnO3JldHVyblwiL3YxL3B1c2gvc3ViLWtleS9cIityLnN1YnNjcmliZUtleStcIi9kZXZpY2VzL1wiK259ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQucHVzaEdhdGV3YXkscj10LmNoYW5uZWxzLGk9dm9pZCAwPT09cj9bXTpyO3JldHVybnt0eXBlOm4scmVtb3ZlOmkuam9pbihcIixcIil9fWZ1bmN0aW9uIGwoKXtyZXR1cm57fX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9YSx0LmlzQXV0aFN1cHBvcnRlZD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntcbmRlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5QdXNoTm90aWZpY2F0aW9uRW5hYmxlZENoYW5uZWxzT3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSx0KXt2YXIgbj10LmRldmljZSxyPXQucHVzaEdhdGV3YXksaT1lLmNvbmZpZztyZXR1cm4gbj9yP2kuc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBHVyBUeXBlIChwdXNoR2F0ZXdheTogZ2NtIG9yIGFwbnMpXCI6XCJNaXNzaW5nIERldmljZSBJRCAoZGV2aWNlKVwifWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj10LmRldmljZSxyPWUuY29uZmlnO3JldHVyblwiL3YxL3B1c2gvc3ViLWtleS9cIityLnN1YnNjcmliZUtleStcIi9kZXZpY2VzL1wiK259ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQucHVzaEdhdGV3YXk7cmV0dXJue3R5cGU6bn19ZnVuY3Rpb24gbChlLHQpe3JldHVybntjaGFubmVsczp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9YSx0LmlzQXV0aFN1cHBvcnRlZD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoKXtyZXR1cm4gZi5kZWZhdWx0LlBOUmVtb3ZlQWxsUHVzaE5vdGlmaWNhdGlvbnNPcGVyYXRpb259ZnVuY3Rpb24gbyhlLHQpe3ZhciBuPXQuZGV2aWNlLHI9dC5wdXNoR2F0ZXdheSxpPWUuY29uZmlnO3JldHVybiBuP3I/aS5zdWJzY3JpYmVLZXk/dm9pZCAwOlwiTWlzc2luZyBTdWJzY3JpYmUgS2V5XCI6XCJNaXNzaW5nIEdXIFR5cGUgKHB1c2hHYXRld2F5OiBnY20gb3IgYXBucylcIjpcIk1pc3NpbmcgRGV2aWNlIElEIChkZXZpY2UpXCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPXQuZGV2aWNlLHI9ZS5jb25maWc7cmV0dXJuXCIvdjEvcHVzaC9zdWIta2V5L1wiK3Iuc3Vic2NyaWJlS2V5K1wiL2RldmljZXMvXCIrbitcIi9yZW1vdmVcIn1mdW5jdGlvbiBhKGUpe3ZhciB0PWUuY29uZmlnO3JldHVybiB0LmdldFRyYW5zYWN0aW9uVGltZW91dCgpfWZ1bmN0aW9uIHUoKXtyZXR1cm4hMH1mdW5jdGlvbiBjKGUsdCl7dmFyIG49dC5wdXNoR2F0ZXdheTtyZXR1cm57dHlwZTpufX1mdW5jdGlvbiBsKCl7cmV0dXJue319T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5nZXRPcGVyYXRpb249aSx0LnZhbGlkYXRlUGFyYW1zPW8sdC5nZXRVUkw9cyx0LmdldFJlcXVlc3RUaW1lb3V0PWEsdC5pc0F1dGhTdXBwb3J0ZWQ9dSx0LnByZXBhcmVQYXJhbXM9Yyx0LmhhbmRsZVJlc3BvbnNlPWw7dmFyIGg9KG4oMTMpLG4oMjEpKSxmPXIoaCl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKCl7cmV0dXJuIGYuZGVmYXVsdC5QTlVuc3Vic2NyaWJlT3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSl7dmFyIHQ9ZS5jb25maWc7aWYoIXQuc3Vic2NyaWJlS2V5KXJldHVyblwiTWlzc2luZyBTdWJzY3JpYmUgS2V5XCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPWUuY29uZmlnLHI9dC5jaGFubmVscyxpPXZvaWQgMD09PXI/W106cixvPWkubGVuZ3RoPjA/aS5qb2luKFwiLFwiKTpcIixcIjtyZXR1cm5cIi92Mi9wcmVzZW5jZS9zdWIta2V5L1wiK24uc3Vic2NyaWJlS2V5K1wiL2NoYW5uZWwvXCIrZW5jb2RlVVJJQ29tcG9uZW50KG8pK1wiL2xlYXZlXCJ9ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQuY2hhbm5lbEdyb3VwcyxyPXZvaWQgMD09PW4/W106bixpPXt9O3JldHVybiByLmxlbmd0aD4wJiYoaVtcImNoYW5uZWwtZ3JvdXBcIl09ci5qb2luKFwiLFwiKSksaX1mdW5jdGlvbiBsKCl7cmV0dXJue319T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5nZXRPcGVyYXRpb249aSx0LnZhbGlkYXRlUGFyYW1zPW8sdC5nZXRVUkw9cyx0LmdldFJlcXVlc3RUaW1lb3V0PWEsdC5pc0F1dGhTdXBwb3J0ZWQ9dSx0LnByZXBhcmVQYXJhbXM9Yyx0LmhhbmRsZVJlc3BvbnNlPWw7dmFyIGg9KG4oMTMpLG4oMjEpKSxmPXIoaCl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKCl7cmV0dXJuIGYuZGVmYXVsdC5QTldoZXJlTm93T3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSl7dmFyIHQ9ZS5jb25maWc7aWYoIXQuc3Vic2NyaWJlS2V5KXJldHVyblwiTWlzc2luZyBTdWJzY3JpYmUgS2V5XCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPWUuY29uZmlnLHI9dC51dWlkLGk9dm9pZCAwPT09cj9uLlVVSUQ6cjtyZXR1cm5cIi92Mi9wcmVzZW5jZS9zdWIta2V5L1wiK24uc3Vic2NyaWJlS2V5K1wiL3V1aWQvXCIraX1mdW5jdGlvbiBhKGUpe3ZhciB0PWUuY29uZmlnO3JldHVybiB0LmdldFRyYW5zYWN0aW9uVGltZW91dCgpfWZ1bmN0aW9uIHUoKXtyZXR1cm4hMH1mdW5jdGlvbiBjKCl7cmV0dXJue319ZnVuY3Rpb24gbChlLHQpe3JldHVybntjaGFubmVsczp0LnBheWxvYWQuY2hhbm5lbHN9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5nZXRSZXF1ZXN0VGltZW91dD1hLHQuaXNBdXRoU3VwcG9ydGVkPXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5IZWFydGJlYXRPcGVyYXRpb259ZnVuY3Rpb24gbyhlKXt2YXIgdD1lLmNvbmZpZztpZighdC5zdWJzY3JpYmVLZXkpcmV0dXJuXCJNaXNzaW5nIFN1YnNjcmliZSBLZXlcIn1mdW5jdGlvbiBzKGUsdCl7dmFyIG49ZS5jb25maWcscj10LmNoYW5uZWxzLGk9dm9pZCAwPT09cj9bXTpyLG89aS5sZW5ndGg+MD9pLmpvaW4oXCIsXCIpOlwiLFwiO3JldHVyblwiL3YyL3ByZXNlbmNlL3N1Yi1rZXkvXCIrbi5zdWJzY3JpYmVLZXkrXCIvY2hhbm5lbC9cIitlbmNvZGVVUklDb21wb25lbnQobykrXCIvaGVhcnRiZWF0XCJ9ZnVuY3Rpb24gYSgpe3JldHVybiEwfWZ1bmN0aW9uIHUoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQuY2hhbm5lbEdyb3VwcyxyPXZvaWQgMD09PW4/W106bixpPXQuc3RhdGUsbz12b2lkIDA9PT1pP3t9Omkscz1lLmNvbmZpZyxhPXt9O3JldHVybiByLmxlbmd0aD4wJiYoYVtcImNoYW5uZWwtZ3JvdXBcIl09ci5qb2luKFwiLFwiKSksYS5zdGF0ZT1KU09OLnN0cmluZ2lmeShvKSxhLmhlYXJ0YmVhdD1zLmdldFByZXNlbmNlVGltZW91dCgpLGF9ZnVuY3Rpb24gbCgpe3JldHVybnt9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5pc0F1dGhTdXBwb3J0ZWQ9YSx0LmdldFJlcXVlc3RUaW1lb3V0PXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5HZXRTdGF0ZU9wZXJhdGlvbn1mdW5jdGlvbiBvKGUpe3ZhciB0PWUuY29uZmlnO2lmKCF0LnN1YnNjcmliZUtleSlyZXR1cm5cIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwifWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj1lLmNvbmZpZyxyPXQudXVpZCxpPXZvaWQgMD09PXI/bi5VVUlEOnIsbz10LmNoYW5uZWxzLHM9dm9pZCAwPT09bz9bXTpvLGE9cy5sZW5ndGg+MD9zLmpvaW4oXCIsXCIpOlwiLFwiO3JldHVyblwiL3YyL3ByZXNlbmNlL3N1Yi1rZXkvXCIrbi5zdWJzY3JpYmVLZXkrXCIvY2hhbm5lbC9cIithK1wiL3V1aWQvXCIraX1mdW5jdGlvbiBhKGUpe3ZhciB0PWUuY29uZmlnO3JldHVybiB0LmdldFRyYW5zYWN0aW9uVGltZW91dCgpfWZ1bmN0aW9uIHUoKXtyZXR1cm4hMH1mdW5jdGlvbiBjKGUsdCl7dmFyIG49dC5jaGFubmVsR3JvdXBzLHI9dm9pZCAwPT09bj9bXTpuLGk9e307cmV0dXJuIHIubGVuZ3RoPjAmJihpW1wiY2hhbm5lbC1ncm91cFwiXT1yLmpvaW4oXCIsXCIpKSxpfWZ1bmN0aW9uIGwoZSx0LG4pe3ZhciByPW4uY2hhbm5lbHMsaT12b2lkIDA9PT1yP1tdOnIsbz1uLmNoYW5uZWxHcm91cHMscz12b2lkIDA9PT1vP1tdOm8sYT17fTtyZXR1cm4gMT09PWkubGVuZ3RoJiYwPT09cy5sZW5ndGg/YVtpWzBdXT10LnBheWxvYWQ6YT10LnBheWxvYWQse2NoYW5uZWxzOmF9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5nZXRSZXF1ZXN0VGltZW91dD1hLHQuaXNBdXRoU3VwcG9ydGVkPXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5TZXRTdGF0ZU9wZXJhdGlvbn1mdW5jdGlvbiBvKGUsdCl7dmFyIG49ZS5jb25maWcscj10LnN0YXRlO3JldHVybiByP24uc3Vic2NyaWJlS2V5P3ZvaWQgMDpcIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwiOlwiTWlzc2luZyBTdGF0ZVwifWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj1lLmNvbmZpZyxyPXQuY2hhbm5lbHMsaT12b2lkIDA9PT1yP1tdOnIsbz1pLmxlbmd0aD4wP2kuam9pbihcIixcIik6XCIsXCI7cmV0dXJuXCIvdjIvcHJlc2VuY2Uvc3ViLWtleS9cIituLnN1YnNjcmliZUtleStcIi9jaGFubmVsL1wiK28rXCIvdXVpZC9cIituLlVVSUQrXCIvZGF0YVwifWZ1bmN0aW9uIGEoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gdSgpe3JldHVybiEwfWZ1bmN0aW9uIGMoZSx0KXt2YXIgbj10LnN0YXRlLHI9dC5jaGFubmVsR3JvdXBzLGk9dm9pZCAwPT09cj9bXTpyLG89e307cmV0dXJuIG8uc3RhdGU9SlNPTi5zdHJpbmdpZnkobiksaS5sZW5ndGg+MCYmKG9bXCJjaGFubmVsLWdyb3VwXCJdPWkuam9pbihcIixcIikpLG99ZnVuY3Rpb24gbChlLHQpe3JldHVybntzdGF0ZTp0LnBheWxvYWR9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5nZXRSZXF1ZXN0VGltZW91dD1hLHQuaXNBdXRoU3VwcG9ydGVkPXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaSgpe3JldHVybiBmLmRlZmF1bHQuUE5IZXJlTm93T3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSl7dmFyIHQ9ZS5jb25maWc7aWYoIXQuc3Vic2NyaWJlS2V5KXJldHVyblwiTWlzc2luZyBTdWJzY3JpYmUgS2V5XCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPWUuY29uZmlnLHI9dC5jaGFubmVscyxpPXZvaWQgMD09PXI/W106cixvPXQuY2hhbm5lbEdyb3VwcyxzPXZvaWQgMD09PW8/W106byxhPVwiL3YyL3ByZXNlbmNlL3N1Yi1rZXkvXCIrbi5zdWJzY3JpYmVLZXk7aWYoaS5sZW5ndGg+MHx8cy5sZW5ndGg+MCl7dmFyIHU9aS5sZW5ndGg+MD9pLmpvaW4oXCIsXCIpOlwiLFwiO2ErPVwiL2NoYW5uZWwvXCIrZW5jb2RlVVJJQ29tcG9uZW50KHUpfXJldHVybiBhfWZ1bmN0aW9uIGEoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gdSgpe3JldHVybiEwfWZ1bmN0aW9uIGMoZSx0KXt2YXIgbj10LmNoYW5uZWxHcm91cHMscj12b2lkIDA9PT1uP1tdOm4saT10LmluY2x1ZGVVVUlEcyxvPXZvaWQgMD09PWl8fGkscz10LmluY2x1ZGVTdGF0ZSxhPXZvaWQgMCE9PXMmJnMsdT17fTtyZXR1cm4gb3x8KHUuZGlzYWJsZV91dWlkcz0xKSxhJiYodS5zdGF0ZT0xKSxyLmxlbmd0aD4wJiYodVtcImNoYW5uZWwtZ3JvdXBcIl09ci5qb2luKFwiLFwiKSksdX1mdW5jdGlvbiBsKGUsdCxuKXt2YXIgcj1uLmNoYW5uZWxzLGk9dm9pZCAwPT09cj9bXTpyLG89bi5jaGFubmVsR3JvdXBzLHM9dm9pZCAwPT09bz9bXTpvLGE9bi5pbmNsdWRlVVVJRHMsdT12b2lkIDA9PT1hfHxhLGM9bi5pbmNsdWRlU3RhdGUsbD12b2lkIDAhPT1jJiZjLGg9ZnVuY3Rpb24oKXt2YXIgZT17fSxuPVtdO3JldHVybiBlLnRvdGFsQ2hhbm5lbHM9MSxlLnRvdGFsT2NjdXBhbmN5PXQub2NjdXBhbmN5LGUuY2hhbm5lbHM9e30sZS5jaGFubmVsc1tpWzBdXT17b2NjdXBhbnRzOm4sbmFtZTppWzBdLG9jY3VwYW5jeTp0Lm9jY3VwYW5jeX0sdSYmdC51dWlkcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2w/bi5wdXNoKHtzdGF0ZTplLnN0YXRlLHV1aWQ6ZS51dWlkfSk6bi5wdXNoKHtzdGF0ZTpudWxsLHV1aWQ6ZX0pfSksZX0sZj1mdW5jdGlvbigpe3ZhciBlPXt9O3JldHVybiBlLnRvdGFsQ2hhbm5lbHM9dC5wYXlsb2FkLnRvdGFsX2NoYW5uZWxzLGUudG90YWxPY2N1cGFuY3k9dC5wYXlsb2FkLnRvdGFsX29jY3VwYW5jeSxlLmNoYW5uZWxzPXt9LE9iamVjdC5rZXlzKHQucGF5bG9hZC5jaGFubmVscykuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgcj10LnBheWxvYWQuY2hhbm5lbHNbbl0saT1bXTtyZXR1cm4gZS5jaGFubmVsc1tuXT17b2NjdXBhbnRzOmksbmFtZTpuLG9jY3VwYW5jeTpyLm9jY3VwYW5jeX0sdSYmci51dWlkcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2w/aS5wdXNoKHtzdGF0ZTplLnN0YXRlLHV1aWQ6ZS51dWlkfSk6aS5wdXNoKHtzdGF0ZTpudWxsLHV1aWQ6ZX0pfSksZX0pLGV9LHA9dm9pZCAwO3JldHVybiBwPWkubGVuZ3RoPjF8fHMubGVuZ3RoPjB8fDA9PT1zLmxlbmd0aCYmMD09PWkubGVuZ3RoP2YoKTpoKCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdC5nZXRPcGVyYXRpb249aSx0LnZhbGlkYXRlUGFyYW1zPW8sdC5nZXRVUkw9cyx0LmdldFJlcXVlc3RUaW1lb3V0PWEsdC5pc0F1dGhTdXBwb3J0ZWQ9dSx0LnByZXBhcmVQYXJhbXM9Yyx0LmhhbmRsZVJlc3BvbnNlPWw7dmFyIGg9KG4oMTMpLG4oMjEpKSxmPXIoaCl9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBpKCl7cmV0dXJuIGYuZGVmYXVsdC5QTkFjY2Vzc01hbmFnZXJBdWRpdH1mdW5jdGlvbiBvKGUpe3ZhciB0PWUuY29uZmlnO2lmKCF0LnN1YnNjcmliZUtleSlyZXR1cm5cIk1pc3NpbmcgU3Vic2NyaWJlIEtleVwifWZ1bmN0aW9uIHMoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuXCIvdjEvYXV0aC9hdWRpdC9zdWIta2V5L1wiK3Quc3Vic2NyaWJlS2V5fWZ1bmN0aW9uIGEoZSl7dmFyIHQ9ZS5jb25maWc7cmV0dXJuIHQuZ2V0VHJhbnNhY3Rpb25UaW1lb3V0KCl9ZnVuY3Rpb24gdSgpe3JldHVybiExfWZ1bmN0aW9uIGMoZSx0KXt2YXIgbj10LmNoYW5uZWwscj10LmNoYW5uZWxHcm91cCxpPXQuYXV0aEtleXMsbz12b2lkIDA9PT1pP1tdOmkscz17fTtyZXR1cm4gcy50aW1lc3RhbXA9TWF0aC5mbG9vcigobmV3IERhdGUpLmdldFRpbWUoKS8xZTMpLG4mJihzLmNoYW5uZWw9biksciYmKHNbXCJjaGFubmVsLWdyb3VwXCJdPXIpLG8ubGVuZ3RoPjAmJihzLmF1dGg9by5qb2luKFwiLFwiKSksc31mdW5jdGlvbiBsKGUsdCl7cmV0dXJuIHQucGF5bG9hZH1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9YSx0LmlzQXV0aFN1cHBvcnRlZD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoKXtyZXR1cm4gZi5kZWZhdWx0LlBOQWNjZXNzTWFuYWdlckdyYW50fWZ1bmN0aW9uIG8oZSl7dmFyIHQ9ZS5jb25maWc7aWYoIXQuc3Vic2NyaWJlS2V5KXJldHVyblwiTWlzc2luZyBTdWJzY3JpYmUgS2V5XCJ9ZnVuY3Rpb24gcyhlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm5cIi92MS9hdXRoL2dyYW50L3N1Yi1rZXkvXCIrdC5zdWJzY3JpYmVLZXl9ZnVuY3Rpb24gYShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITF9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPXQuY2hhbm5lbHMscj12b2lkIDA9PT1uP1tdOm4saT10LmNoYW5uZWxHcm91cHMsbz12b2lkIDA9PT1pP1tdOmkscz10LnR0bCxhPXQucmVhZCx1PXZvaWQgMCE9PWEmJmEsYz10LndyaXRlLGw9dm9pZCAwIT09YyYmYyxoPXQubWFuYWdlLGY9dm9pZCAwIT09aCYmaCxwPXQuYXV0aEtleXMsZD12b2lkIDA9PT1wP1tdOnAsZz17fTtyZXR1cm4gZy5yPXU/XCIxXCI6XCIwXCIsZy53PWw/XCIxXCI6XCIwXCIsZy5tPWY/XCIxXCI6XCIwXCIsZy50aW1lc3RhbXA9TWF0aC5mbG9vcigobmV3IERhdGUpLmdldFRpbWUoKS8xZTMpLHIubGVuZ3RoPjAmJihnLmNoYW5uZWw9ci5qb2luKFwiLFwiKSksby5sZW5ndGg+MCYmKGdbXCJjaGFubmVsLWdyb3VwXCJdPW8uam9pbihcIixcIikpLGQubGVuZ3RoPjAmJihnLmF1dGg9ZC5qb2luKFwiLFwiKSksKHN8fDA9PT1zKSYmKGcudHRsPXMpLGd9ZnVuY3Rpb24gbCgpe3JldHVybnt9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZ2V0T3BlcmF0aW9uPWksdC52YWxpZGF0ZVBhcmFtcz1vLHQuZ2V0VVJMPXMsdC5nZXRSZXF1ZXN0VGltZW91dD1hLHQuaXNBdXRoU3VwcG9ydGVkPXUsdC5wcmVwYXJlUGFyYW1zPWMsdC5oYW5kbGVSZXNwb25zZT1sO3ZhciBoPShuKDEzKSxuKDIxKSksZj1yKGgpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19ZnVuY3Rpb24gaShlLHQpe3ZhciBuPWUuY3J5cHRvLHI9ZS5jb25maWcsaT1KU09OLnN0cmluZ2lmeSh0KTtyZXR1cm4gci5jaXBoZXJLZXkmJihpPW4uZW5jcnlwdChpKSxpPUpTT04uc3RyaW5naWZ5KGkpKSxpfWZ1bmN0aW9uIG8oKXtyZXR1cm4gdi5kZWZhdWx0LlBOUHVibGlzaE9wZXJhdGlvbn1mdW5jdGlvbiBzKGUsdCl7dmFyIG49ZS5jb25maWcscj10Lm1lc3NhZ2UsaT10LmNoYW5uZWw7cmV0dXJuIGk/cj9uLnN1YnNjcmliZUtleT92b2lkIDA6XCJNaXNzaW5nIFN1YnNjcmliZSBLZXlcIjpcIk1pc3NpbmcgTWVzc2FnZVwiOlwiTWlzc2luZyBDaGFubmVsXCJ9ZnVuY3Rpb24gYShlLHQpe3ZhciBuPXQuc2VuZEJ5UG9zdCxyPXZvaWQgMCE9PW4mJm47cmV0dXJuIHJ9ZnVuY3Rpb24gdShlLHQpe3ZhciBuPWUuY29uZmlnLHI9dC5jaGFubmVsLG89dC5tZXNzYWdlLHM9aShlLG8pO3JldHVyblwiL3B1Ymxpc2gvXCIrbi5wdWJsaXNoS2V5K1wiL1wiK24uc3Vic2NyaWJlS2V5K1wiLzAvXCIrZW5jb2RlVVJJQ29tcG9uZW50KHIpK1wiLzAvXCIrZW5jb2RlVVJJQ29tcG9uZW50KHMpfWZ1bmN0aW9uIGMoZSx0KXt2YXIgbj1lLmNvbmZpZyxyPXQuY2hhbm5lbDtyZXR1cm5cIi9wdWJsaXNoL1wiK24ucHVibGlzaEtleStcIi9cIituLnN1YnNjcmliZUtleStcIi8wL1wiK2VuY29kZVVSSUNvbXBvbmVudChyKStcIi8wXCJ9ZnVuY3Rpb24gbChlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiBoKCl7cmV0dXJuITB9ZnVuY3Rpb24gZihlLHQpe3ZhciBuPXQubWVzc2FnZTtyZXR1cm4gaShlLG4pfWZ1bmN0aW9uIHAoZSx0KXt2YXIgbj10Lm1ldGEscj10LnJlcGxpY2F0ZSxpPXZvaWQgMD09PXJ8fHIsbz10LnN0b3JlSW5IaXN0b3J5LHM9e307cmV0dXJuIG51bGwhPW8mJihvP3Muc3RvcmU9XCIxXCI6cy5zdG9yZT1cIjBcIiksaT09PSExJiYocy5ub3JlcD1cInRydWVcIiksbiYmXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygbj9cInVuZGVmaW5lZFwiOmcobikpJiYocy5tZXRhPUpTT04uc3RyaW5naWZ5KG4pKSxzfWZ1bmN0aW9uIGQoZSx0KXtyZXR1cm57dGltZXRva2VuOnRbMl19fU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBnPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9O3QuZ2V0T3BlcmF0aW9uPW8sdC52YWxpZGF0ZVBhcmFtcz1zLHQudXNlUG9zdD1hLHQuZ2V0VVJMPXUsdC5wb3N0VVJMPWMsdC5nZXRSZXF1ZXN0VGltZW91dD1sLHQuaXNBdXRoU3VwcG9ydGVkPWgsdC5wb3N0UGF5bG9hZD1mLHQucHJlcGFyZVBhcmFtcz1wLHQuaGFuZGxlUmVzcG9uc2U9ZDt2YXIgeT0obigxMyksbigyMSkpLHY9cih5KX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoZSx0KXt2YXIgbj1lLmNvbmZpZyxyPWUuY3J5cHRvO2lmKCFuLmNpcGhlcktleSlyZXR1cm4gdDt0cnl7cmV0dXJuIHIuZGVjcnlwdCh0KX1jYXRjaChlKXtyZXR1cm4gdH19ZnVuY3Rpb24gbygpe3JldHVybiBwLmRlZmF1bHQuUE5IaXN0b3J5T3BlcmF0aW9ufWZ1bmN0aW9uIHMoZSx0KXt2YXIgbj10LmNoYW5uZWwscj1lLmNvbmZpZztyZXR1cm4gbj9yLnN1YnNjcmliZUtleT92b2lkIDA6XCJNaXNzaW5nIFN1YnNjcmliZSBLZXlcIjpcIk1pc3NpbmcgY2hhbm5lbFwifWZ1bmN0aW9uIGEoZSx0KXt2YXIgbj10LmNoYW5uZWwscj1lLmNvbmZpZztyZXR1cm5cIi92Mi9oaXN0b3J5L3N1Yi1rZXkvXCIrci5zdWJzY3JpYmVLZXkrXCIvY2hhbm5lbC9cIitlbmNvZGVVUklDb21wb25lbnQobil9ZnVuY3Rpb24gdShlKXt2YXIgdD1lLmNvbmZpZztyZXR1cm4gdC5nZXRUcmFuc2FjdGlvblRpbWVvdXQoKX1mdW5jdGlvbiBjKCl7cmV0dXJuITB9ZnVuY3Rpb24gbChlLHQpe3ZhciBuPXQuc3RhcnQscj10LmVuZCxpPXQuaW5jbHVkZVRpbWV0b2tlbixvPXQucmV2ZXJzZSxzPXQuY291bnQsYT12b2lkIDA9PT1zPzEwMDpzLHU9e307cmV0dXJuIHUuY291bnQ9YSxuJiYodS5zdGFydD1uKSxyJiYodS5lbmQ9ciksbnVsbCE9aSYmKHUuaW5jbHVkZV90b2tlbj1pLnRvU3RyaW5nKCkpLG51bGwhPW8mJih1LnJldmVyc2U9by50b1N0cmluZygpKSx1fWZ1bmN0aW9uIGgoZSx0KXt2YXIgbj17bWVzc2FnZXM6W10sc3RhcnRUaW1lVG9rZW46cGFyc2VJbnQodFsxXSwxMCksZW5kVGltZVRva2VuOnBhcnNlSW50KHRbMl0sMTApfTtyZXR1cm4gdFswXS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciByPXt0aW1ldG9rZW46bnVsbCxlbnRyeTpudWxsfTt0LnRpbWV0b2tlbj8oci50aW1ldG9rZW49dC50aW1ldG9rZW4sci5lbnRyeT1pKGUsdC5tZXNzYWdlKSk6ci5lbnRyeT1pKGUsdCksbi5tZXNzYWdlcy5wdXNoKHIpfSksbn1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1vLHQudmFsaWRhdGVQYXJhbXM9cyx0LmdldFVSTD1hLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9dSx0LmlzQXV0aFN1cHBvcnRlZD1jLHQucHJlcGFyZVBhcmFtcz1sLHQuaGFuZGxlUmVzcG9uc2U9aDt2YXIgZj0obigxMyksbigyMSkpLHA9cihmKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fWZ1bmN0aW9uIGkoKXtyZXR1cm4gZi5kZWZhdWx0LlBOU3Vic2NyaWJlT3BlcmF0aW9ufWZ1bmN0aW9uIG8oZSl7dmFyIHQ9ZS5jb25maWc7aWYoIXQuc3Vic2NyaWJlS2V5KXJldHVyblwiTWlzc2luZyBTdWJzY3JpYmUgS2V5XCJ9ZnVuY3Rpb24gcyhlLHQpe3ZhciBuPWUuY29uZmlnLHI9dC5jaGFubmVscyxpPXZvaWQgMD09PXI/W106cixvPWkubGVuZ3RoPjA/aS5qb2luKFwiLFwiKTpcIixcIjtyZXR1cm5cIi92Mi9zdWJzY3JpYmUvXCIrbi5zdWJzY3JpYmVLZXkrXCIvXCIrZW5jb2RlVVJJQ29tcG9uZW50KG8pK1wiLzBcIn1mdW5jdGlvbiBhKGUpe3ZhciB0PWUuY29uZmlnO3JldHVybiB0LmdldFN1YnNjcmliZVRpbWVvdXQoKX1mdW5jdGlvbiB1KCl7cmV0dXJuITB9ZnVuY3Rpb24gYyhlLHQpe3ZhciBuPWUuY29uZmlnLHI9dC5jaGFubmVsR3JvdXBzLGk9dm9pZCAwPT09cj9bXTpyLG89dC50aW1ldG9rZW4scz10LmZpbHRlckV4cHJlc3Npb24sYT10LnJlZ2lvbix1PXtoZWFydGJlYXQ6bi5nZXRQcmVzZW5jZVRpbWVvdXQoKX07cmV0dXJuIGkubGVuZ3RoPjAmJih1W1wiY2hhbm5lbC1ncm91cFwiXT1pLmpvaW4oXCIsXCIpKSxzJiZzLmxlbmd0aD4wJiYodVtcImZpbHRlci1leHByXCJdPXMpLG8mJih1LnR0PW8pLGEmJih1LnRyPWEpLHV9ZnVuY3Rpb24gbChlLHQpe3ZhciBuPVtdO3QubS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciB0PXtwdWJsaXNoVGltZXRva2VuOmUucC50LHJlZ2lvbjplLnAucn0scj17c2hhcmQ6cGFyc2VJbnQoZS5hLDEwKSxzdWJzY3JpcHRpb25NYXRjaDplLmIsY2hhbm5lbDplLmMscGF5bG9hZDplLmQsZmxhZ3M6ZS5mLGlzc3VpbmdDbGllbnRJZDplLmksc3Vic2NyaWJlS2V5OmUuayxvcmlnaW5hdGlvblRpbWV0b2tlbjplLm8scHVibGlzaE1ldGFEYXRhOnR9O24ucHVzaChyKX0pO3ZhciByPXt0aW1ldG9rZW46dC50LnQscmVnaW9uOnQudC5yfTtyZXR1cm57bWVzc2FnZXM6bixtZXRhZGF0YTpyfX1PYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx0LmdldE9wZXJhdGlvbj1pLHQudmFsaWRhdGVQYXJhbXM9byx0LmdldFVSTD1zLHQuZ2V0UmVxdWVzdFRpbWVvdXQ9YSx0LmlzQXV0aFN1cHBvcnRlZD11LHQucHJlcGFyZVBhcmFtcz1jLHQuaGFuZGxlUmVzcG9uc2U9bDt2YXIgaD0obigxMyksbigyMSkpLGY9cihoKX1dKX0pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncHVibnViJyk7IFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcblxubGV0IFJsdG0gPSByZXF1aXJlKCdybHRtJyk7XG5sZXQgd2F0ZXJmYWxsID0gcmVxdWlyZSgnYXN5bmMvd2F0ZXJmYWxsJyk7XG5cbmxldCBwbHVnaW5zID0gW107IFxuXG5sZXQgdXVpZCA9IG51bGw7XG5sZXQgbWUgPSBmYWxzZTtcbmxldCBnbG9iYWxDaGF0ID0gZmFsc2U7XG5cblxuZnVuY3Rpb24gYWRkQ2hpbGQob2IsIGNoaWxkTmFtZSwgY2hpbGRPYikge1xuICAgb2JbY2hpbGROYW1lXSA9IGNoaWxkT2I7XG4gICBjaGlsZE9iLnBhcmVudCA9IG9iO1xufVxuXG52YXIgdXNlcnMgPSB7fTtcblxuZnVuY3Rpb24gbG9hZENsYXNzUGx1Z2lucyhvYmopIHtcblxuICAgIGxldCBjbGFzc05hbWUgPSBvYmouY29uc3RydWN0b3IubmFtZTtcblxuICAgIGZvcihsZXQgaSBpbiBwbHVnaW5zKSB7XG4gICAgICAgIC8vIGRvIHBsdWdpbiBlcnJvciBjaGVja2luZyBoZXJlXG5cbiAgICAgICAgaWYocGx1Z2luc1tpXS5leHRlbmRzICYmIHBsdWdpbnNbaV0uZXh0ZW5kc1tjbGFzc05hbWVdKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFkZCBwcm9wZXJ0aWVzIGZyb20gcGx1Z2luIG9iamVjdCB0byBjbGFzcyB1bmRlciBwbHVnaW4gbmFtZXNwYWNlXG4gICAgICAgICAgICBhZGRDaGlsZChvYmosIHBsdWdpbnNbaV0ubmFtZXNwYWNlLCBwbHVnaW5zW2ldLmV4dGVuZHNbY2xhc3NOYW1lXSk7ICAgXG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgYSByZXNlcnZlZCBmdW5jdGlvbiBpbiBwbHVnaW5zIHRoYXQgcnVuIGF0IHN0YXJ0IG9mIGNsYXNzICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihvYmpbcGx1Z2luc1tpXS5uYW1lc3BhY2VdLmNvbnN0cnVjdCkge1xuICAgICAgICAgICAgICAgIG9ialtwbHVnaW5zW2ldLm5hbWVzcGFjZV0uY29uc3RydWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxubGV0IHJ1blBsdWdpblF1ZXVlID0gZnVuY3Rpb24obG9jYXRpb24sIGV2ZW50LCBmaXJzdCwgbGFzdCkge1xuICAgIFxuICAgIGxldCBwbHVnaW5fcXVldWUgPSBbXTtcblxuICAgIHBsdWdpbl9xdWV1ZS5wdXNoKGZpcnN0KTtcblxuICAgIGZvcihsZXQgaSBpbiBwbHVnaW5zKSB7XG4gICAgICAgIGlmKHBsdWdpbnNbaV0ubWlkZGxld2FyZSAmJiBwbHVnaW5zW2ldLm1pZGRsZXdhcmVbbG9jYXRpb25dICYmIHBsdWdpbnNbaV0ubWlkZGxld2FyZVtsb2NhdGlvbl1bZXZlbnRdKSB7XG4gICAgICAgICAgICBwbHVnaW5fcXVldWUucHVzaChwbHVnaW5zW2ldLm1pZGRsZXdhcmVbbG9jYXRpb25dW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3YXRlcmZhbGwocGx1Z2luX3F1ZXVlLCBsYXN0KTtcblxufVxuXG5jbGFzcyBDaGF0IHtcblxuICAgIGNvbnN0cnVjdG9yKGNoYW5uZWwpIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnbmV3IENoYXQnLCBjaGFubmVsKVxuXG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG5cbiAgICAgICAgLy8ga2V5L3ZhbHVlIG9mIHVzZXIgc2luIGNoYW5uZWxcbiAgICAgICAgLy8gdXNlcnMgPSB7fTtcblxuICAgICAgICAvLyBvdXIgZXZlbnRzIHB1Ymxpc2hlZCBvdmVyIHRoaXMgZXZlbnQgZW1pdHRlclxuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBSTFRNIHdpdGggcHVibnViIGtleXNcbiAgICAgICAgdGhpcy5ybHRtID0gbmV3IFJsdG0oe1xuICAgICAgICAgICAgcHVibGlzaEtleTogJ3B1Yi1jLWY3ZDdiZTkwLTg5NWEtNGIyNC1iZjk5LTU5NzdjMjJjNjZjOScsXG4gICAgICAgICAgICBzdWJzY3JpYmVLZXk6ICdzdWItYy1iZDAxM2YyNC05YTI0LTExZTYtYTY4MS0wMmVlMmRkYWI3ZmUnLFxuICAgICAgICAgICAgdXVpZDogdXVpZFxuICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLnJsdG0uYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgc3RhdHVzOiAoc3RhdHVzRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzRXZlbnQuY2F0ZWdvcnkgPT09IFwiUE5Db25uZWN0ZWRDYXRlZ29yeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdyZWFkeScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IChtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQgPSBtLm1lc3NhZ2VbMF07XG4gICAgICAgICAgICAgICAgbGV0IHBheWxvYWQgPSBtLm1lc3NhZ2VbMV07XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5jaGF0ID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGlmKHBheWxvYWQuc2VuZGVyICYmIHVzZXJzW3BheWxvYWQuc2VuZGVyXSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnNlbmRlciA9IHVzZXJzW3BheWxvYWQuc2VuZGVyXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChldmVudCwgcGF5bG9hZCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3N1YnNjcmliaW5nIHRvJywgdGhpcy5jaGFubmVsKTtcblxuICAgICAgICB0aGlzLnJsdG0uc3Vic2NyaWJlKHsgXG4gICAgICAgICAgICBjaGFubmVsczogW3RoaXMuY2hhbm5lbF0sXG4gICAgICAgICAgICB3aXRoUHJlc2VuY2U6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9hZENsYXNzUGx1Z2lucyh0aGlzKTtcblxuICAgIH1cblxuICAgIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhldmVudCwgZGF0YSlcblxuICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfTtcblxuICAgICAgICBwYXlsb2FkLnNlbmRlciA9IG1lLmRhdGEudXVpZDtcblxuICAgICAgICBydW5QbHVnaW5RdWV1ZSgncHVibGlzaCcsIGV2ZW50LCAobmV4dCkgPT4ge1xuICAgICAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcbiAgICAgICAgfSwgKGVyciwgcGF5bG9hZCkgPT4ge1xuXG4gICAgICAgICAgICBkZWxldGUgcGF5bG9hZC5jaGF0O1xuXG4gICAgICAgICAgICB0aGlzLnJsdG0ucHVibGlzaCh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogW2V2ZW50LCBwYXlsb2FkXSxcbiAgICAgICAgICAgICAgICBjaGFubmVsOiB0aGlzLmNoYW5uZWxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgYnJvYWRjYXN0KGV2ZW50LCBwYXlsb2FkKSB7XG5cbiAgICAgICAgcnVuUGx1Z2luUXVldWUoZXZlbnQsIHBheWxvYWQsIChuZXh0KSA9PiB7XG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9LCAoZXJyLCBwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KGV2ZW50LCBwYXlsb2FkKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxufTtcblxuY2xhc3MgR2xvYmFsQ2hhdCBleHRlbmRzIENoYXQge1xuICAgIGNvbnN0cnVjdG9yKGNoYW5uZWwpIHtcblxuICAgICAgICBzdXBlcihjaGFubmVsKTtcblxuXG4gICAgICAgIHRoaXMucmx0bS5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBwcmVzZW5jZTogKHByZXNlbmNlRXZlbnQpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZXNlbmNlRXZlbnQpXG5cbiAgICAgICAgICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogdXNlcnNbcHJlc2VuY2VFdmVudC51dWlkXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcHJlc2VuY2VFdmVudFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHByZXNlbmNlRXZlbnQuYWN0aW9uID09IFwiam9pblwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJlc2VuY2VFdmVudClcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnam9pbicsIHByZXNlbmNlRXZlbnQudXVpZCwgcHJlc2VuY2VFdmVudC5zdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIXVzZXJzW3ByZXNlbmNlRXZlbnQudXVpZF0gJiYgcHJlc2VuY2VFdmVudC5zdGF0ZSAmJiBwcmVzZW5jZUV2ZW50LnN0YXRlLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnNbcHJlc2VuY2VFdmVudC51dWlkXSA9IG5ldyBVc2VyKHByZXNlbmNlRXZlbnQudXVpZCwgcHJlc2VuY2VFdmVudC5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdCgnam9pbicsIHBheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihwcmVzZW5jZUV2ZW50LmFjdGlvbiA9PSBcImxlYXZlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHVzZXJzW3ByZXNlbmNlRXZlbnQudXVpZF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KCdsZWF2ZScsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihwcmVzZW5jZUV2ZW50LmFjdGlvbiA9PSBcInRpbWVvdXRcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgaWRsZT9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QoJ3RpbWVvdXQnLCBwYXlsb2FkKTsgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihwcmVzZW5jZUV2ZW50LmFjdGlvbiA9PSBcInN0YXRlLWNoYW5nZVwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YXRlIGNoYW5nZScsIHByZXNlbmNlRXZlbnQudXVpZCwgcHJlc2VuY2VFdmVudC5zdGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodXNlcnNbcHJlc2VuY2VFdmVudC51dWlkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnNbcHJlc2VuY2VFdmVudC51dWlkXS51cGRhdGUocHJlc2VuY2VFdmVudC5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgYnJvYWRjYXN0IGV2ZXJ5IGNoYW5nZSBpbmRpdmlkdWFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb2JhYmx5IGRvZXNuJ3Qgd29yayBhbnltb3JlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF1c2Vyc1twcmVzZW5jZUV2ZW50LnV1aWRdICYmIHByZXNlbmNlRXZlbnQuc3RhdGUgJiYgcHJlc2VuY2VFdmVudC5zdGF0ZS5faW5pdGlhbGl6ZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJzW3ByZXNlbmNlRXZlbnQudXVpZF0gPSBuZXcgVXNlcihwcmVzZW5jZUV2ZW50LnV1aWQsIHByZXNlbmNlRXZlbnQuc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC51c2VyID0gdXNlcnNbcHJlc2VuY2VFdmVudC51dWlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdCgnam9pbicsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgdXNlcnMgb25saW5lIG5vd1xuICAgICAgICB0aGlzLnJsdG0uaGVyZU5vdyh7XG4gICAgICAgICAgICBjaGFubmVsczogW3RoaXMuY2hhbm5lbF0sXG4gICAgICAgICAgICBpbmNsdWRlVVVJRHM6IHRydWUsXG4gICAgICAgICAgICBpbmNsdWRlU3RhdGU6IHRydWVcbiAgICAgICAgfSwgKHN0YXR1cywgcmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgaWYoIXN0YXR1cy5lcnJvcikge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHJlc3VsdCBvZiB3aG8ncyBvbmxpbmVcbiAgICAgICAgICAgICAgICBsZXQgb2NjdXBhbnRzID0gcmVzcG9uc2UuY2hhbm5lbHNbdGhpcy5jaGFubmVsXS5vY2N1cGFudHM7XG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZXZlcnkgb2NjdXBhbnQsIGNyZWF0ZSBhIG1vZGVsIHVzZXJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgaW4gb2NjdXBhbnRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodXNlcnNbb2NjdXBhbnRzW2ldLnV1aWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2Vyc1tvY2N1cGFudHNbaV0udXVpZF0udXBkYXRlKG9jY3VwYW50c1tpXS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgYnJvYWRjYXN0IGV2ZXJ5IGNoYW5nZSBpbmRpdmlkdWFsbHlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXVzZXJzW29jY3VwYW50c1tpXS51dWlkXSAmJiBvY2N1cGFudHNbaV0uc3RhdGUgJiYgb2NjdXBhbnRzW2ldLnN0YXRlLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJzW29jY3VwYW50c1tpXS51dWlkXSA9IG5ldyBVc2VyKG9jY3VwYW50c1tpXS51dWlkLCBvY2N1cGFudHNbaV0uc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdCgnam9pbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IHVzZXJzW29jY3VwYW50c1tpXS51dWlkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXQ6IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgXG5cbiAgICB9XG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcblxuICAgICAgICB0aGlzLnJsdG0uc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgY2hhbm5lbHM6IFt0aGlzLmNoYW5uZWxdXG4gICAgICAgIH0sIChzdGF0dXMsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5jbGFzcyBHcm91cENoYXQgZXh0ZW5kcyBDaGF0IHtcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsKSB7XG5cbiAgICAgICAgY2hhbm5lbCA9IGNoYW5uZWwgfHwgW2dsb2JhbENoYXQuY2hhbm5lbCwgJ2dyb3VwJywgbmV3IERhdGUoKS5nZXRUaW1lKCldLmpvaW4oJy4nKTtcblxuICAgICAgICBzdXBlcihjaGFubmVsKTtcblxuICAgICAgICB0aGlzLnJsdG0uYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgcHJlc2VuY2U6IChwcmVzZW5jZUV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcmVzZW5jZUV2ZW50KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJzKVxuXG4gICAgICAgICAgICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHVzZXJzW3ByZXNlbmNlRXZlbnQudXVpZF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHByZXNlbmNlRXZlbnRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihwcmVzZW5jZUV2ZW50LmFjdGlvbiA9PSBcImpvaW5cIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdCgnam9pbicsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihwcmVzZW5jZUV2ZW50LmFjdGlvbiA9PSBcImxlYXZlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QoJ2xlYXZlJywgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHByZXNlbmNlRXZlbnQuYWN0aW9uID09IFwidGltZW91dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KCd0aW1lb3V0JywgcGF5bG9hZCk7ICBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2V0IHVzZXJzIG9ubGluZSBub3dcbiAgICAgICAgdGhpcy5ybHRtLmhlcmVOb3coe1xuICAgICAgICAgICAgY2hhbm5lbHM6IFt0aGlzLmNoYW5uZWxdLFxuICAgICAgICAgICAgaW5jbHVkZVVVSURzOiB0cnVlLFxuICAgICAgICAgICAgaW5jbHVkZVN0YXRlOiB0cnVlXG4gICAgICAgIH0sIChzdGF0dXMsIHJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFzdGF0dXMuZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcnMpXG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIHJlc3VsdCBvZiB3aG8ncyBvbmxpbmVcbiAgICAgICAgICAgICAgICBsZXQgb2NjdXBhbnRzID0gcmVzcG9uc2UuY2hhbm5lbHNbdGhpcy5jaGFubmVsXS5vY2N1cGFudHM7XG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZXZlcnkgb2NjdXBhbnQsIGNyZWF0ZSBhIG1vZGVsIHVzZXJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgaW4gb2NjdXBhbnRzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QoJ2pvaW4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiB1c2Vyc1tvY2N1cGFudHNbaV0udXVpZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0OiB0aGlzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5jbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih1dWlkLCBzdGF0ZSkge1xuXG4gICAgICAgIC8vIHRoaXMgaXMgcHVibGljIGRhdGEgZXhwb3NlZCB0byB0aGUgbmV0d29ya1xuICAgICAgICAvLyB3ZSBjYW4ndCBKU09OIHN0cmluZ2lmeSB0aGUgb2JqZWN0IHdpdGhvdXQgY2lyY3VsYXIgcmVmZXJlbmNlICAgICAgICBcbiAgICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICAgICAgdXVpZDogdXVpZCxcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSB8fCB7fVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXNlciBjYW4gYmUgY3JlYXRlZCBiZWZvcmUgbmV0d29yayBzeW5jIGhhcyBiZWd1blxuICAgICAgICAvLyB0aGlzIHByb3BlcnR5IGxldHMgdXMga25vdyB3aGVuIHRoYXQgaGFzIGhhcHBlbmVkXG4gICAgICAgIHRoaXMuZGF0YS5zdGF0ZS5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZmVlZCA9IG5ldyBDaGF0KFtnbG9iYWxDaGF0LmNoYW5uZWwsICdmZWVkJywgdXVpZF0uam9pbignLicpKTtcbiAgICAgICAgdGhpcy5kaXJlY3QgPSBuZXcgQ2hhdChbZ2xvYmFsQ2hhdC5jaGFubmVsLCAncHJpdmF0ZScsIHV1aWRdLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5mZWVkKVxuICAgICAgICBcbiAgICAgICAgLy8gb3VyIHBlcnNvbmFsIGV2ZW50IGVtaXR0ZXJcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBcbiAgICB9XG4gICAgc2V0KHByb3BlcnR5LCB2YWx1ZSkge1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYSBwdWJsaWMgc2V0dGVyIHRoYXQgc2V0cyBsb2NhbGx5IGFuZCBwdWJsaXNoZXMgYW4gZXZlbnRcbiAgICAgICAgdGhpcy5kYXRhLnN0YXRlW3Byb3BlcnR5XSA9IHZhbHVlO1xuXG4gICAgICAgIC8vIHB1Ymxpc2ggZGF0YSB0byB0aGUgbmV0d29ya1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc3RhdGUtdXBkYXRlJywge1xuICAgICAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIHVwZGF0ZShzdGF0ZSkge1xuICAgICAgICBcbiAgICAgICAgLy8gc2hvcnRoYW5kIGxvb3AgZm9yIHVwZGF0aW5nIG11bHRpcGxlIHByb3BlcnRpZXMgd2l0aCBzZXRcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgc3RhdGVba2V5XSk7XG4gICAgICAgIH1cblxuICAgIH1cbn07XG5cbmNsYXNzIE1lIGV4dGVuZHMgVXNlciB7XG4gICAgY29uc3RydWN0b3IodXVpZCwgc3RhdGUpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCduZXcgbWUnLCB1dWlkLCBzdGF0ZSk7XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgVXNlciBjb25zdHJ1Y3RvclxuICAgICAgICBzdXBlcih1dWlkLCBzdGF0ZSk7XG4gICAgICAgIFxuICAgICAgICAvLyBsb2FkIE1lIHBsdWdpbnNcbiAgICAgICAgbG9hZENsYXNzUGx1Z2lucyh0aGlzKTtcblxuICAgIH1cbiAgICBzZXQocHJvcGVydHksIHZhbHVlKSB7XG5cbiAgICAgICAgLy8gc2V0IHRoZSBwcm9wZXJ0eSB1c2luZyBVc2VyIG1ldGhvZFxuICAgICAgICBzdXBlci5zZXQocHJvcGVydHksIHZhbHVlKTtcblxuICAgICAgICBnbG9iYWxDaGF0LnNldFN0YXRlKHRoaXMuZGF0YS5zdGF0ZSk7XG5cbiAgICB9XG4gICAgdXBkYXRlKHN0YXRlKSB7XG5cbiAgICAgICAgc3VwZXIudXBkYXRlKHN0YXRlKTtcblxuICAgICAgICBnbG9iYWxDaGF0LnNldFN0YXRlKHRoaXMuZGF0YS5zdGF0ZSk7XG5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbmZpZyhjb25maWcsIHBsdWdzKSB7XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG5cbiAgICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhbm5lbCA9IHRoaXMuY29uZmlnLmdsb2JhbENoYW5uZWwgfHwgJ29mYy1nbG9iYWwnO1xuXG4gICAgICAgIHBsdWdpbnMgPSBwbHVncztcblxuICAgICAgICB0aGlzLnBsdWdpbiA9IHt9O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcbiAgICBpZGVudGlmeShpZCwgc3RhdGUpIHtcblxuICAgICAgICB1dWlkID0gaWQ7XG5cbiAgICAgICAgZ2xvYmFsQ2hhdCA9IG5ldyBHbG9iYWxDaGF0KHRoaXMuY29uZmlnLmdsb2JhbENoYW5uZWwpO1xuXG4gICAgICAgIG1lID0gbmV3IE1lKHV1aWQsIHN0YXRlKTtcblxuICAgICAgICByZXR1cm4gbWU7XG4gICAgfSxcbiAgICBnZXRHbG9iYWxDaGF0KCkge1xuICAgICAgICByZXR1cm4gZ2xvYmFsQ2hhdFxuICAgIH0sXG4gICAgQ2hhdDogQ2hhdCxcbiAgICBHbG9iYWxDaGF0OiBHbG9iYWxDaGF0LFxuICAgIEdyb3VwQ2hhdDogR3JvdXBDaGF0LFxuICAgIFVzZXI6IFVzZXIsXG4gICAgTWU6IE1lLFxuICAgIHBsdWdpbjoge31cbn07XG4iLCJ3aW5kb3cuT0NGID0gd2luZG93Lk9DRiB8fCByZXF1aXJlKCcuL3NyYy9pbmRleC5qcycpO1xuIl19
