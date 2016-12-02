(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cloudboost", [], factory);
	else if(typeof exports === 'object')
		exports["cloudboost"] = factory();
	else
		root["cloudboost"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	var _PrivateMethods = __webpack_require__(3);

	var _PrivateMethods2 = _interopRequireDefault(_PrivateMethods);

	var _CloudApp = __webpack_require__(43);

	var _CloudApp2 = _interopRequireDefault(_CloudApp);

	var _Column = __webpack_require__(44);

	var _Column2 = _interopRequireDefault(_Column);

	var _CloudTable = __webpack_require__(45);

	var _CloudTable2 = _interopRequireDefault(_CloudTable);

	var _ACL = __webpack_require__(46);

	var _ACL2 = _interopRequireDefault(_ACL);

	var _CloudGeoPoint = __webpack_require__(47);

	var _CloudGeoPoint2 = _interopRequireDefault(_CloudGeoPoint);

	var _CloudObject = __webpack_require__(48);

	var _CloudObject2 = _interopRequireDefault(_CloudObject);

	var _CloudFile = __webpack_require__(49);

	var _CloudFile2 = _interopRequireDefault(_CloudFile);

	var _CloudQueue = __webpack_require__(50);

	var _CloudQueue2 = _interopRequireDefault(_CloudQueue);

	var _CloudRole = __webpack_require__(51);

	var _CloudRole2 = _interopRequireDefault(_CloudRole);

	var _CloudUser = __webpack_require__(52);

	var _CloudUser2 = _interopRequireDefault(_CloudUser);

	var _CloudCache = __webpack_require__(53);

	var _CloudCache2 = _interopRequireDefault(_CloudCache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_CB2.default);

	window.CB = _CB2.default;
	exports.default = _CB2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CB_Class = function CB_Class() {
	    _classCallCheck(this, CB_Class);

	    this._isNode = false;
	    this.Socket = null;
	    this.io = null; //socket.io library is saved here.
	    this.apiUrl = 'https://api.cloudboost.io';
	    if (typeof process !== "undefined" && process.versions && process.versions.node) {
	        this._isNode = true;
	    } else {
	        this._isNode = false;
	    }
	};

	var CB = new CB_Class();
	/*
	 Parse codes:
	 */
	CB._ajaxIE8 = function (method, url, data) {
	    var promise = new CB.Promise();
	    var xdr = new XDomainRequest();
	    xdr.onload = function () {
	        var response;
	        try {
	            response = JSON.parse(xdr.responseText);
	        } catch (e) {
	            promise.reject(e);
	        }
	        if (response) {
	            promise.resolve(response);
	        }
	    };
	    xdr.onerror = xdr.ontimeout = function () {
	        // Let's fake a real error message.
	        var fakeResponse = {
	            responseText: JSON.stringify({
	                code: 500,
	                error: "IE's XDomainRequest does not supply error info."
	            })
	        };
	        promise.reject(fakeResponse);
	    };
	    xdr.onprogress = function () {};
	    xdr.open(method, url);
	    xdr.send(data);
	    return promise;
	};
	CB._loadXml = function () {
	    var xmlhttp;
	    var req = typeof require === 'function' ? require : null;
	    // Load references to other dependencies
	    if (typeof XMLHttpRequest !== 'undefined') {
	        xmlhttp = XMLHttpRequest;
	    } else if (false) {
	        xmlhttp = req('xmlhttprequest').XMLHttpRequest;
	    }
	    xmlhttp = new xmlhttp();
	    return xmlhttp;
	};
	CB.Promise = function () {
	    this._resolved = false;
	    this._rejected = false;
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];

	    this._isPromisesAPlusCompliant = false;
	    this.is = function (promise) {
	        return promise && promise.then && Object.prototype.toString.call(promise.then) === "[object Function]";
	    };
	    this.as = function () {
	        var promise = new CB.Promise();
	        promise.resolve.apply(promise, arguments);
	        return promise;
	    };
	    this.error = function () {
	        var promise = new CB.Promise();
	        promise.reject.apply(promise, arguments);
	        return promise;
	    };
	    this.when = function (promises) {
	        // Allow passing in Promises as separate arguments instead of an Array.
	        var objects;
	        if (promises && (typeof promises.length === "undefined" || promises.length === null)) {
	            objects = arguments;
	        } else {
	            objects = promises;
	        }

	        var total = objects.length;
	        var hadError = false;
	        var results = [];
	        var errors = [];
	        results.length = objects.length;
	        errors.length = objects.length;

	        if (total === 0) {
	            return CB.Promise.as.apply(this, results);
	        }

	        var promise = new CB.Promise();

	        var resolveOne = function resolveOne() {
	            total = total - 1;
	            if (total === 0) {
	                if (hadError) {
	                    promise.reject(errors);
	                } else {
	                    promise.resolve.apply(promise, results);
	                }
	            }
	        };

	        objects.forEach(function (object, i) {
	            if (CB.Promise.is(object)) {
	                object.then(function (result) {
	                    results[i] = result;
	                    resolveOne();
	                }, function (error) {
	                    errors[i] = error;
	                    hadError = true;
	                    resolveOne();
	                });
	            } else {
	                results[i] = object;
	                resolveOne();
	            }
	        });

	        return promise;
	    };
	    this._continueWhile = function (predicate, asyncFunction) {
	        if (predicate()) {
	            return asyncFunction().then(function () {
	                return CB.Promise._continueWhile(predicate, asyncFunction);
	            });
	        }
	        return CB.Promise.as();
	    };
	};

	CB.Promise.is = function (promise) {
	    return promise && promise.then && Object.prototype.toString.call(promise.then) === "[object Function]";
	};
	/**
	 * Marks this promise as fulfilled, firing any callbacks waiting on it.
	 * @param {Object} result the result to pass to the callbacks.
	 */
	CB.Promise.prototype["resolve"] = function (result) {
	    if (this._resolved || this._rejected) {
	        throw "A promise was resolved even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
	    }
	    this._resolved = true;
	    this._result = arguments;
	    var results = arguments;
	    this._resolvedCallbacks.forEach(function (resolvedCallback) {
	        resolvedCallback.apply(this, results);
	    });
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	};

	/**
	 * Marks this promise as fulfilled, firing any callbacks waiting on it.
	 * @param {Object} error the error to pass to the callbacks.
	 */
	CB.Promise.prototype["reject"] = function (error) {
	    if (this._resolved || this._rejected) {
	        throw "A promise was rejected even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
	    }
	    this._rejected = true;
	    this._error = error;
	    this._rejectedCallbacks.forEach(function (rejectedCallback) {
	        rejectedCallback(error);
	    });
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	};

	/**
	 * Adds callbacks to be called when this promise is fulfilled. Returns a new
	 * Promise that will be fulfilled when the callback is complete. It allows
	 * chaining. If the callback itself returns a Promise, then the one returned
	 * by "then" will not be fulfilled until that one returned by the callback
	 * is fulfilled.
	 * @param {Function} resolvedCallback Function that is called when this
	 * Promise is resolved. Once the callback is complete, then the Promise
	 * returned by "then" will also be fulfilled.
	 * @param {Function} rejectedCallback Function that is called when this
	 * Promise is rejected with an error. Once the callback is complete, then
	 * the promise returned by "then" with be resolved successfully. If
	 * rejectedCallback is null, or it returns a rejected Promise, then the
	 * Promise returned by "then" will be rejected with that error.
	 * @return {CB.Promise} A new Promise that will be fulfilled after this
	 * Promise is fulfilled and either callback has completed. If the callback
	 * returned a Promise, then this Promise will not be fulfilled until that
	 * one is.
	 */
	CB.Promise.prototype["then"] = function (resolvedCallback, rejectedCallback) {
	    var promise = new CB.Promise();

	    var wrappedResolvedCallback = function wrappedResolvedCallback() {
	        var result = arguments;
	        if (resolvedCallback) {
	            if (CB.Promise._isPromisesAPlusCompliant) {
	                try {
	                    result = [resolvedCallback.apply(this, result)];
	                } catch (e) {
	                    result = [CB.Promise.error(e)];
	                }
	            } else {
	                result = [resolvedCallback.apply(this, result)];
	            }
	        }
	        if (result.length === 1 && CB.Promise.is(result[0])) {
	            result[0].then(function () {
	                promise.resolve.apply(promise, arguments);
	            }, function (error) {
	                promise.reject(error);
	            });
	        } else {
	            promise.resolve.apply(promise, result);
	        }
	    };

	    var wrappedRejectedCallback = function wrappedRejectedCallback(error) {
	        var result = [];
	        if (rejectedCallback) {
	            if (CB.Promise._isPromisesAPlusCompliant) {
	                try {
	                    result = [rejectedCallback(error)];
	                } catch (e) {
	                    result = [CB.Promise.error(e)];
	                }
	            } else {
	                result = [rejectedCallback(error)];
	            }
	            if (result.length === 1 && CB.Promise.is(result[0])) {
	                result[0].then(function () {
	                    promise.resolve.apply(promise, arguments);
	                }, function (error) {
	                    promise.reject(error);
	                });
	            } else {
	                if (CB.Promise._isPromisesAPlusCompliant) {
	                    promise.resolve.apply(promise, result);
	                } else {
	                    promise.reject(result[0]);
	                }
	            }
	        } else {
	            promise.reject(error);
	        }
	    };

	    var runLater = function runLater(func) {
	        func.call();
	    };
	    if (CB.Promise._isPromisesAPlusCompliant) {
	        if (typeof window !== 'undefined' && window.setTimeout) {
	            runLater = function runLater(func) {
	                window.setTimeout(func, 0);
	            };
	        } else if (typeof process !== 'undefined' && process.nextTick) {
	            runLater = function runLater(func) {
	                process.nextTick(func);
	            };
	        }
	    }

	    var self = this;
	    if (this._resolved) {
	        runLater(function () {
	            wrappedResolvedCallback.apply(self, self._result);
	        });
	    } else if (this._rejected) {
	        runLater(function () {
	            wrappedRejectedCallback(self._error);
	        });
	    } else {
	        this._resolvedCallbacks.push(wrappedResolvedCallback);
	        this._rejectedCallbacks.push(wrappedRejectedCallback);
	    }

	    return promise;
	};

	/**
	 * Add handlers to be called when the promise
	 * is either resolved or rejected
	 */
	CB.Promise.prototype["always"] = function (callback) {
	    return this.then(callback, callback);
	};

	/**
	 * Add handlers to be called when the Promise object is resolved
	 */
	CB.Promise.prototype["done"] = function (callback) {
	    return this.then(callback);
	};

	/**
	 * Add handlers to be called when the Promise object is rejected
	 */
	CB.Promise.prototype["fail"] = function (callback) {
	    return this.then(null, callback);
	};

	/**
	 * Run the given callbacks after this promise is fulfilled.
	 * @param optionsOrCallback {} A Backbone-style options callback, or a
	 * callback function. If this is an options object and contains a "model"
	 * attributes, that will be passed to error callbacks as the first argument.
	 * @param model {} If truthy, this will be passed as the first result of
	 * error callbacks. This is for Backbone-compatability.
	 * @return {CB.Promise} A promise that will be resolved after the
	 * callbacks are run, with the same result as this.
	 */
	CB.clone = function (obj) {
	    if (!Object.prototype.toString.call(obj) === "[object Object]") return obj;
	    return Object.prototype.toString.call(obj) === "[object Array]" ? obj.slice() : new Object(obj);
	};

	CB.Promise.prototype["_thenRunCallbacks"] = function (optionsOrCallback, model) {
	    var options;
	    if (Object.prototype.toString.call(optionsOrCallback) === "[object Function]") {
	        var callback = optionsOrCallback;
	        options = {
	            success: function success(result) {
	                callback(result, null);
	            },
	            error: function error(_error) {
	                callback(null, _error);
	            }
	        };
	    } else {
	        options = CB.clone(optionsOrCallback);
	    }
	    options = options || {};

	    return this.then(function (result) {
	        if (options.success) {
	            options.success.apply(this, arguments);
	        } else if (model) {
	            // When there's no callback, a sync event should be triggered.
	            model.trigger('sync', model, result, options);
	        }
	        return CB.Promise.as.apply(CB.Promise, arguments);
	    }, function (error) {
	        if (options.error) {
	            if (!(typeof model === "undefined" ? "undefined" : _typeof(model)) === "undefined") {
	                options.error(model, error);
	            } else {
	                options.error(error);
	            }
	        } else if (model) {
	            // When there's no error callback, an error event should be triggered.
	            model.trigger('error', model, error, options);
	        }
	        // By explicitly returning a rejected Promise, this will work with
	        // either jQuery or Promises/A semantics.
	        return CB.Promise.error(error);
	    });
	};

	/**
	 * Returns a new promise that is fulfilled when all of the input promises
	 * are resolved. If any promise in the list fails, then the returned promise
	 * will fail with the last error. If they all succeed, then the returned
	 * promise will succeed, with the results being the results of all the input
	 * promises. For example: <pre>
	 *   var p1 = Parse.Promise.as(1);
	 *   var p2 = Parse.Promise.as(2);
	 *   var p3 = Parse.Promise.as(3);
	 *
	 *   Parse.Promise.when(p1, p2, p3).then(function(r1, r2, r3) {
	     *     console.log(r1);  // prints 1
	     *     console.log(r2);  // prints 2
	     *     console.log(r3);  // prints 3
	     *   });</pre>
	 *
	 * The input promises can also be specified as an array: <pre>
	 *   var promises = [p1, p2, p3];
	 *   Parse.Promise.when(promises).then(function(r1, r2, r3) {
	     *     console.log(r1);  // prints 1
	     *     console.log(r2);  // prints 2
	     *     console.log(r3);  // prints 3
	     *   });
	 * </pre>
	 * @method when
	 * @param {Array} promises a list of promises to wait for.
	 * @static
	 * @return {Parse.Promise} the new promise.
	 */
	CB.Promise["all"] = function (promises) {
	    var objects;
	    if (Array.isArray(promises)) {
	        objects = promises;
	    } else {
	        objects = arguments;
	    }

	    var total = objects.length;
	    var hadError = false;
	    var results = [];
	    var errors = [];
	    results.length = objects.length;
	    errors.length = objects.length;

	    if (total === 0) {
	        return CB.Promise.as.apply(this, results);
	    }

	    var promise = new CB.Promise();

	    var resolveOne = function resolveOne() {
	        total--;
	        if (total <= 0) {
	            if (hadError) {
	                promise.reject(errors);
	            } else {
	                promise.resolve(results);
	            }
	        }
	    };

	    var chain = function chain(object, index) {
	        if (CB.Promise.is(object)) {
	            object.then(function (result) {
	                results[index] = result;
	                resolveOne();
	            }, function (error) {
	                errors[index] = error;
	                hadError = true;
	                resolveOne();
	            });
	        } else {
	            results[i] = object;
	            resolveOne();
	        }
	    };
	    for (var i = 0; i < objects.length; i++) {
	        chain(objects[i], i);
	    }

	    return promise;
	};

	CB.Events = {
	    trigger: function trigger(events) {
	        var event, node, calls, tail, args, all, rest;
	        if (!(calls = this._callbacks)) {
	            return this;
	        }
	        all = calls.all;
	        events = events.split(eventSplitter);
	        rest = slice.call(arguments, 1);

	        // For each event, walk through the linked list of callbacks twice,
	        // first to trigger the event, then to trigger any `"all"` callbacks.
	        event = events.shift();
	        while (event) {
	            node = calls[event];
	            if (node) {
	                tail = node.tail;
	                while ((node = node.next) !== tail) {
	                    node.callback.apply(node.context || this, rest);
	                }
	            }
	            node = all;
	            if (node) {
	                tail = node.tail;
	                args = [event].concat(rest);
	                while ((node = node.next) !== tail) {
	                    node.callback.apply(node.context || this, args);
	                }
	            }
	            event = events.shift();
	        }

	        return this;
	    }
	};
	/**
	 * Adds a callback function that should be called regardless of whether
	 * this promise failed or succeeded. The callback will be given either the
	 * array of results for its first argument, or the error as its second,
	 * depending on whether this Promise was rejected or resolved. Returns a
	 * new Promise, like "then" would.
	 * @param {Function} continuation the callback.
	 */
	CB.Promise.prototype["_continueWith"] = function (continuation) {
	    return this.then(function () {
	        return continuation(arguments, null);
	    }, function (error) {
	        return continuation(null, error);
	    });
	};

	exports.default = CB;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* PRIVATE METHODS */
	_CB2.default.toJSON = function (thisObj) {

	    if (thisObj.constructor === Array) {
	        for (var i = 0; i < thisObj.length; i++) {
	            thisObj[i] = _CB2.default.toJSON(thisObj[i]);
	        }
	        return thisObj;
	    }

	    var id = null;
	    var columnName = null;
	    var tableName = null;
	    var latitude = null;
	    var longitude = null;

	    if (thisObj instanceof _CB2.default.CloudGeoPoint) {
	        latitude = thisObj.document.latitude;
	        longitude = thisObj.document.longitude;
	    }

	    if (thisObj instanceof _CB2.default.CloudFile) id = thisObj.document._id;

	    if (thisObj instanceof _CB2.default.Column) columnName = thisObj.document.name;

	    if (thisObj instanceof _CB2.default.CloudQueue) tableName = thisObj.document.name;

	    if (thisObj instanceof _CB2.default.CloudTable) tableName = thisObj.document.name;

	    if (thisObj instanceof _CB2.default.CloudCache) tableName = thisObj.document.name;

	    var obj = _CB2.default._clone(thisObj, id, longitude, latitude, tableName, columnName);

	    if (!obj instanceof _CB2.default.CloudObject || !obj instanceof _CB2.default.CloudFile || !obj instanceof _CB2.default.CloudGeoPoint || !obj instanceof _CB2.default.CloudTable || !obj instanceof _CB2.default.Column || !obj instanceof _CB2.default.QueueMessage || !obj instanceof _CB2.default.CloudQueue || !obj instanceof _CB2.default.CloudCache) {
	        throw "Data passed is not an instance of CloudObject or CloudFile or CloudGeoPoint";
	    }

	    if (obj instanceof _CB2.default.Column) return obj.document;

	    if (obj instanceof _CB2.default.CloudGeoPoint) return obj.document;

	    var doc = obj.document;

	    for (var key in doc) {
	        if (doc[key] instanceof _CB2.default.CloudObject || doc[key] instanceof _CB2.default.CloudFile || doc[key] instanceof _CB2.default.CloudGeoPoint || doc[key] instanceof _CB2.default.Column || doc[key] instanceof _CB2.default.QueueMessage || doc[key] instanceof _CB2.default.CloudQueue || doc[key] instanceof _CB2.default.CloudCache) {
	            //if something is a relation.
	            doc[key] = _CB2.default.toJSON(doc[key]); //serialize this object.
	        } else if (key === 'ACL') {
	            //if this is an ACL, then. Convert this from CB.ACL object to JSON - to strip all the ACL Methods.
	            var acl = doc[key].document;
	            doc[key] = acl;
	        } else if (doc[key] instanceof Array) {
	            //if this is an array.
	            //then check if this is an array of CloudObjects, if yes, then serialize every CloudObject.
	            if (doc[key][0] && (doc[key][0] instanceof _CB2.default.CloudObject || doc[key][0] instanceof _CB2.default.CloudFile || doc[key][0] instanceof _CB2.default.CloudGeoPoint || doc[key][0] instanceof _CB2.default.Column || doc[key][0] instanceof _CB2.default.QueueMessage || doc[key][0] instanceof _CB2.default.CloudQueue || doc[key][0] instanceof _CB2.default.CloudCache)) {
	                var arr = [];
	                for (var i = 0; i < doc[key].length; i++) {
	                    arr.push(_CB2.default.toJSON(doc[key][i]));
	                }
	                doc[key] = arr;
	            }
	        }
	    }

	    return doc;
	};

	_CB2.default.fromJSON = function (data, thisObj) {

	    //prevObj : is a copy of object before update.
	    //this is to deserialize JSON to a document which can be shoved into CloudObject. :)
	    //if data is a list it will return a list of Cl oudObjects.
	    if (!data || data === "") return null;

	    if (data instanceof Array) {

	        if (data[0] && data[0] instanceof Object) {

	            var arr = [];

	            for (var i = 0; i < data.length; i++) {
	                obj = _CB2.default.fromJSON(data[i]);
	                arr.push(obj);
	            }

	            return arr;
	        } else {
	            //this is just a normal array, not an array of CloudObjects.
	            return data;
	        }
	    } else if (data instanceof Object && data._type) {

	        //if this is a CloudObject.
	        var document = {};
	        //different types of classes.

	        for (var key in data) {
	            if (data[key] instanceof Array) {
	                document[key] = _CB2.default.fromJSON(data[key]);
	            } else if (data[key] instanceof Object) {
	                if (key === 'ACL') {
	                    //this is an ACL.
	                    document[key] = new _CB2.default.ACL();
	                    document[key].document = data[key];
	                } else if (data[key]._type) {
	                    if (thisObj) document[key] = _CB2.default.fromJSON(data[key], thisObj.get(key));else document[key] = _CB2.default.fromJSON(data[key]);
	                } else {
	                    document[key] = data[key];
	                }
	            } else {
	                document[key] = data[key];
	            }
	        }

	        if (!thisObj) {
	            var id = null;
	            var latitude = null;
	            var longitude = null;
	            var name = null;
	            if (document._type === "file") id = document._id;
	            if (document._type === "point") {
	                latitude = document.latitude;
	                longitude = document.longitude;
	            }
	            if (document._type === "table") {
	                name = document.name;
	            }
	            if (document._type === "column") {
	                name = document.name;
	            }
	            if (document._type === "queue") {
	                name = document.name;
	            }
	            if (document._type === "cache") {
	                name = document.name;
	            }
	            var obj = _CB2.default._getObjectByType(document._type, id, longitude, latitude, name);
	            obj.document = document;

	            thisObj = obj;
	        } else {
	            thisObj.document = document;
	        }

	        if (thisObj instanceof _CB2.default.CloudObject || thisObj instanceof _CB2.default.CloudUser || thisObj instanceof _CB2.default.CloudRole || thisObj instanceof _CB2.default.CloudQueue || thisObj instanceof _CB2.default.QueueMessage || thisObj instanceof _CB2.default.CloudFile || thisObj instanceof _CB2.default.CloudCache) {
	            //activate ACL.
	            if (thisObj.document["ACL"]) thisObj.document["ACL"].parent = thisObj;
	        }

	        return thisObj;
	    } else {
	        //if this is plain json.
	        return data;
	    }
	};

	_CB2.default._getObjectByType = function (type, id, longitude, latitude, name) {

	    var obj = null;

	    if (type === 'custom') {
	        obj = new _CB2.default.CloudObject();
	    }

	    if (type === 'queue') {
	        //tablename is queue name in this instance.
	        obj = new _CB2.default.CloudQueue(name);
	    }

	    if (type === 'queue-message') {
	        obj = new _CB2.default.QueueMessage();
	    }

	    if (type === 'cache') {
	        obj = new _CB2.default.CloudCache(name);
	    }

	    if (type === 'role') {
	        obj = new _CB2.default.CloudRole();
	    }

	    if (type === 'user') {
	        obj = new _CB2.default.CloudUser();
	    }

	    if (type === 'file') {
	        obj = new _CB2.default.CloudFile(id);
	    }

	    if (type === 'point') {
	        obj = new _CB2.default.CloudGeoPoint(0, 0);
	        obj.document.latitude = Number(latitude);
	        obj.document.longitude = Number(longitude);
	    }

	    if (type === 'table') {
	        obj = new _CB2.default.CloudTable(name);
	    }

	    if (type === 'column') {
	        obj = new _CB2.default.Column(name);
	    }

	    return obj;
	};

	_CB2.default._validate = function () {
	    if (!_CB2.default.appId) {
	        throw "AppID is null. Please use CB.CloudApp.init to initialize your app.";
	    }

	    if (!_CB2.default.appKey) {
	        throw "AppKey is null. Please use CB.CloudApp.init to initialize your app.";
	    }
	};

	function _all(arrayOfPromises) {
	    //this is simplilar to Q.all for jQuery promises.
	    return jQuery.when.apply(jQuery, arrayOfPromises).then(function () {
	        return Array.prototype.slice.call(arguments, 0);
	    });
	};

	if (_CB2.default._isNode) {
	    module.exports = {};
	    module.exports = _CB2.default;
	}

	_CB2.default._clone = function (obj, id, longitude, latitude, tableName, columnName) {
	    var n_obj = {};
	    if (obj.document._type && obj.document._type != 'point') {
	        n_obj = _CB2.default._getObjectByType(obj.document._type, id, longitude, latitude, tableName, columnName);
	        var doc = obj.document;
	        var doc2 = {};
	        for (var key in doc) {
	            if (doc[key] instanceof _CB2.default.CloudFile) doc2[key] = _CB2.default._clone(doc[key], doc[key].document._id);else if (doc[key] instanceof _CB2.default.CloudObject) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.CloudQueue) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.QueueMessage) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.CloudGeoPoint) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.CloudCache) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else doc2[key] = doc[key];
	        }
	    } else if (obj instanceof _CB2.default.CloudGeoPoint) {
	        n_obj = new _CB2.default.CloudGeoPoint(obj.get('longitude'), obj.get('latitude'));
	        return n_obj;
	    }

	    n_obj.document = doc2;

	    return n_obj;
	};

	_CB2.default._request = function (method, url, params, isServiceUrl, isFile, progressCallback) {

	    _CB2.default._validate();

	    if (!params) params = {};

	    // params.sdk = "JavaScript";

	    if (!_CB2.default.CloudApp._isConnected) throw "Your CloudApp is disconnected. Please use CB.CloudApp.connect() and try again.";

	    var def = new _CB2.default.Promise();
	    var xmlhttp = _CB2.default._loadXml();
	    if (_CB2.default._isNode) {
	        var LocalStorage = __webpack_require__(4).LocalStorage;
	        localStorage = new LocalStorage('./scratch');
	    }
	    xmlhttp.open(method, url, true);
	    if (!isFile) {
	        xmlhttp.setRequestHeader('Content-Type', 'text/plain');
	    }

	    if (progressCallback) {
	        if (typeof xmlhttp.upload !== "undefined") {
	            xmlhttp.upload.addEventListener("progress", function (evt) {
	                if (evt.lengthComputable) {
	                    var percentComplete = evt.loaded / evt.total;
	                    progressCallback(percentComplete);
	                }
	            }, false);
	        }
	    }

	    if (!isServiceUrl) {
	        var ssid = _CB2.default._getSessionId();
	        if (ssid != null) xmlhttp.setRequestHeader('sessionID', ssid);
	    }
	    if (_CB2.default._isNode) {
	        xmlhttp.setRequestHeader("User-Agent", "CB/" + _CB2.default.version + " (NodeJS " + process.versions.node + ")");

	        if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === "object") {
	            params = JSON.stringify(params);
	        }
	    }
	    if (params) xmlhttp.send(params);else xmlhttp.send();
	    xmlhttp.onreadystatechange = function () {
	        if (xmlhttp.readyState == xmlhttp.DONE) {
	            if (xmlhttp.status == 200) {
	                if (!isServiceUrl) {
	                    var sessionID = xmlhttp.getResponseHeader('sessionID');
	                    if (sessionID) localStorage.setItem('sessionID', sessionID);else localStorage.removeItem('sessionID');
	                }
	                def.resolve(xmlhttp.responseText);
	            } else {
	                def.reject(xmlhttp.responseText);
	            }
	        }
	    };
	    return def;
	};

	_CB2.default._getSessionId = function () {
	    return localStorage.getItem('sessionID');
	};

	_CB2.default._columnValidation = function (column, cloudtable) {
	    var defaultColumn = ['id', 'createdAt', 'updatedAt', 'ACL'];
	    if (cloudtable.document.type == 'user') {
	        defaultColumn.concat(['username', 'email', 'password', 'roles']);
	    } else if (cloudtable.document.type == 'role') {
	        defaultColumn.push('name');
	    }

	    var index = defaultColumn.indexOf(column.name.toLowerCase());
	    if (index === -1) return true;else return false;
	};

	_CB2.default._tableValidation = function (tableName) {

	    if (!tableName) //if table name is empty
	        throw "table name cannot be empty";

	    if (!isNaN(tableName[0])) throw "table name should not start with a number";

	    if (!tableName.match(/^\S+$/)) throw "table name should not contain spaces";

	    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
	    if (pattern.test(tableName)) throw "table not shoul not contain special characters";
	};

	_CB2.default._modified = function (thisObj, columnName) {
	    thisObj.document._isModified = true;
	    if (thisObj.document._modifiedColumns) {
	        if (thisObj.document._modifiedColumns.indexOf(columnName) === -1) {
	            thisObj.document._modifiedColumns.push(columnName);
	        }
	    } else {
	        thisObj.document._modifiedColumns = [];
	        thisObj.document._modifiedColumns.push(columnName);
	    }
	};

	function trimStart(character, string) {
	    var startIndex = 0;

	    while (string[startIndex] === character) {
	        startIndex++;
	    }

	    return string.substr(startIndex);
	}

	_CB2.default._columnNameValidation = function (columnName) {
	    if (!columnName) //if table name is empty
	        throw "table name cannot be empty";

	    if (!isNaN(columnName[0])) throw "column name should not start with a number";

	    if (!columnName.match(/^\S+$/)) throw "column name should not contain spaces";

	    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
	    if (pattern.test(columnName)) throw "column name not should not contain special characters";
	};

	_CB2.default._columnDataTypeValidation = function (dataType) {

	    if (!dataType) throw "data type cannot be empty";

	    var dataTypeList = ['Text', 'Email', 'URL', 'Number', 'Boolean', 'DateTime', 'GeoPoint', 'File', 'List', 'Relation', 'Object', 'EncryptedText'];
	    var index = dataTypeList.indexOf(dataType);
	    if (index < 0) throw "invalid data type";
	};

	_CB2.default._defaultColumns = function (type) {
	    var id = new _CB2.default.Column('id');
	    id.dataType = 'Id';
	    id.required = true;
	    id.unique = true;
	    id.document.isDeletable = false;
	    id.document.isEditable = false;

	    var expires = new _CB2.default.Column('expires');
	    expires.dataType = 'DateTime';
	    expires.document.isDeletable = false;
	    expires.document.isEditable = false;

	    var createdAt = new _CB2.default.Column('createdAt');
	    createdAt.dataType = 'DateTime';
	    createdAt.required = true;
	    createdAt.document.isDeletable = false;
	    createdAt.document.isEditable = false;

	    var updatedAt = new _CB2.default.Column('updatedAt');
	    updatedAt.dataType = 'DateTime';
	    updatedAt.required = true;
	    updatedAt.document.isDeletable = false;
	    updatedAt.document.isEditable = false;

	    var ACL = new _CB2.default.Column('ACL');
	    ACL.dataType = 'ACL';
	    ACL.required = true;
	    ACL.document.isDeletable = false;
	    ACL.document.isEditable = false;

	    var col = [id, expires, updatedAt, createdAt, ACL];
	    if (type === "custom") {
	        return col;
	    } else if (type === "user") {
	        var username = new _CB2.default.Column('username');
	        username.dataType = 'Text';
	        username.required = false;
	        username.unique = true;
	        username.document.isDeletable = false;
	        username.document.isEditable = false;

	        var email = new _CB2.default.Column('email');
	        email.dataType = 'Email';
	        email.unique = true;
	        email.document.isDeletable = false;
	        email.document.isEditable = false;

	        var password = new _CB2.default.Column('password');
	        password.dataType = 'EncryptedText';
	        password.required = false;
	        password.document.isDeletable = false;
	        password.document.isEditable = false;

	        var roles = new _CB2.default.Column('roles');
	        roles.dataType = 'List';
	        roles.relatedTo = 'Role';
	        roles.relatedToType = 'role';
	        roles.document.relationType = 'table';
	        roles.document.isDeletable = false;
	        roles.document.isEditable = false;

	        var socialAuth = new _CB2.default.Column('socialAuth');
	        socialAuth.dataType = 'List';
	        socialAuth.relatedTo = 'Object';
	        socialAuth.required = false;
	        socialAuth.document.isDeletable = false;
	        socialAuth.document.isEditable = false;

	        var verified = new _CB2.default.Column('verified');
	        verified.dataType = 'Boolean';
	        verified.required = false;
	        verified.document.isDeletable = false;
	        verified.document.isEditable = false;

	        col.push(username);
	        col.push(roles);
	        col.push(password);
	        col.push(email);
	        col.push(socialAuth);
	        col.push(verified);
	        return col;
	    } else if (type === "role") {
	        var name = new _CB2.default.Column('name');
	        name.dataType = 'Text';
	        name.unique = true;
	        name.required = true;
	        name.document.isDeletable = false;
	        name.document.isEditable = false;
	        col.push(name);
	        return col;
	    } else if (type === "device") {
	        var channels = new _CB2.default.Column('channels');
	        channels.dataType = 'List';
	        channels.relatedTo = 'Text';
	        channels.document.isDeletable = false;
	        channels.document.isEditable = false;

	        var deviceToken = new _CB2.default.Column('deviceToken');
	        deviceToken.dataType = 'Text';
	        deviceToken.unique = true;
	        deviceToken.document.isDeletable = false;
	        deviceToken.document.isEditable = false;

	        var deviceOS = new _CB2.default.Column('deviceOS');
	        deviceOS.dataType = 'Text';
	        deviceOS.document.isDeletable = false;
	        deviceOS.document.isEditable = false;

	        var timezone = new _CB2.default.Column('timezone');
	        timezone.dataType = 'Text';
	        timezone.document.isDeletable = false;
	        timezone.document.isEditable = false;

	        var metadata = new _CB2.default.Column('metadata');
	        metadata.dataType = 'Object';
	        metadata.document.isDeletable = false;
	        metadata.document.isEditable = false;

	        col.push(channels);
	        col.push(deviceToken);
	        col.push(deviceOS);
	        col.push(timezone);
	        col.push(metadata);
	        return col;
	    }
	};

	_CB2.default._fileCheck = function (obj) {

	    //obj is an instance of CloudObject.
	    var deferred = new _CB2.default.Promise();
	    var promises = [];
	    for (var key in obj.document) {
	        if (obj.document[key] instanceof Array && obj.document[key][0] instanceof _CB2.default.CloudFile) {
	            for (var i = 0; i < obj.document[key].length; i++) {
	                if (!obj.document[key][i].id) promises.push(obj.document[key][i].save());
	            }
	        } else if (obj.document[key] instanceof Object && obj.document[key] instanceof _CB2.default.CloudFile) {
	            if (!obj.document[key].id) promises.push(obj.document[key].save());
	        }
	    }
	    if (promises.length > 0) {
	        _CB2.default.Promise.all(promises).then(function () {
	            var res = arguments;
	            var j = 0;
	            for (var key in obj.document) {
	                if (obj.document[key] instanceof Array && obj.document[key][0] instanceof _CB2.default.CloudFile) {
	                    for (var i = 0; i < obj.document[key].length; i++) {
	                        if (!obj.document[key][i].id) {
	                            obj.document[key][i] = res[j];
	                            j = j + 1;
	                        }
	                    }
	                } else if (obj.document[key] instanceof Object && obj.document[key] instanceof _CB2.default.CloudFile) {
	                    if (!obj.document[key].id) {
	                        obj.document[key] = res[j];
	                        j = j + 1;
	                    }
	                }
	            }
	            deferred.resolve(obj);
	        }, function (err) {
	            deferred.reject(err);
	        });
	    } else {
	        deferred.resolve(obj);
	    }
	    return deferred;
	};

	_CB2.default._bulkObjFileCheck = function (array) {
	    var deferred = new _CB2.default.Promise();
	    var promises = [];
	    for (var i = 0; i < array.length; i++) {
	        promises.push(_CB2.default._fileCheck(array[i]));
	    }
	    _CB2.default.Promise.all(promises).then(function () {
	        deferred.resolve(arguments);
	    }, function (err) {
	        deferred.reject(err);
	    });
	    return deferred;
	};

	_CB2.default._generateHash = function () {
	    var hash = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for (i = 0; i < 8; i++) {
	        hash = hash + possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    return hash;
	};

	_CB2.default._isJsonString = function (str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	};

	_CB2.default._isJsonObject = function (obj) {
	    try {
	        JSON.stringify(obj);
	    } catch (e) {
	        return false;
	    }
	    return true;
	};

	//Description : This fucntion get the content of the cookie .
	//Params : @name : Name of the cookie.
	//Returns : content as string.  
	_CB2.default._getCookie = function (name) {
	    if (typeof Storage !== "undefined") {
	        // Code for localStorage/sessionStorage.
	        if (new Date(localStorage.getItem(name + "_expires")) > new Date()) {
	            return localStorage.getItem(name);
	        } else {
	            _CB2.default._deleteCookie(name);
	        }
	    } else {
	        // Sorry! No Web Storage support..       
	        if (typeof document !== 'undefined') {
	            var name = name + "=";
	            var ca = document.cookie.split(';');
	            for (var i = 0; i < ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0) == ' ') {
	                    c = c.substring(1);
	                }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	            }
	            return "";
	        }
	    }
	};

	//Description : Deletes the cookie
	//Params : @name : Name of the cookie.
	//Returns : void
	_CB2.default._deleteCookie = function (name) {
	    //save the user to the cookie. 
	    if (typeof Storage !== "undefined") {
	        // Code for localStorage/sessionStorage.
	        localStorage.removeItem(name);
	        localStorage.removeItem(name + "_expires");
	    } else {
	        if (typeof document !== 'undefined') {
	            var d = new Date();
	            d.setTime(d.getTime() + 0 * 0 * 0 * 0 * 0);
	            var expires = "expires=" + d.toUTCString();
	            document.cookie = name + "=" + +"; " + expires;
	        }
	    }
	};

	//Description : Creates cookie. 
	//Params : @name : Name of the cookie.
	//         @content : Content as string / JSON / int / etc. 
	//         @expires : Expiration time in millisecinds.
	//Returns : content as string.  
	_CB2.default._createCookie = function (name, content, expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires);
	    if (typeof Storage !== "undefined") {
	        // Code for localStorage/sessionStorage.
	        localStorage.setItem(name, content.toString());
	        localStorage.setItem(name + "_expires", d);
	    } else {
	        if (typeof document !== 'undefined') {

	            var expires = "expires=" + d.toUTCString();
	            document.cookie = +name + "=" + content.toString() + "; " + expires;
	        }
	    }
	};

	//Description : returns query string. 
	//Params : @key : key         
	//Returns : query string.  
	_CB2.default._getQuerystringByKey = function (key) {
	    key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	//Set sessionId if cbtoken is found in url
	if (typeof location !== 'undefined' && location.search) {
	    var cbtoken = _CB2.default._getQuerystringByKey("cbtoken");
	    if (cbtoken && cbtoken !== "") {
	        localStorage.setItem('sessionID', cbtoken);
	    }
	}

	//Description : returns browser name 
	//Params : null       
	//Returns : browser name. 
	_CB2.default._getThisBrowserName = function () {

	    // check if library is used as a Node.js module
	    if (typeof window !== 'undefined') {

	        // store navigator properties to use later
	        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
	        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
	        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

	        var is = {};

	        // is current browser chrome?
	        is.chrome = function () {
	            return (/chrome|chromium/i.test(userAgent) && /google inc/.test(vendor)
	            );
	        };

	        // is current browser firefox?
	        is.firefox = function () {
	            return (/firefox/i.test(userAgent)
	            );
	        };

	        // is current browser edge?
	        is.edge = function () {
	            return (/edge/i.test(userAgent)
	            );
	        };

	        // is current browser internet explorer?
	        // parameter is optional
	        is.ie = function (version) {
	            if (!version) {
	                return (/msie/i.test(userAgent) || "ActiveXObject" in window
	                );
	            }
	            if (version >= 11) {
	                return "ActiveXObject" in window;
	            }
	            return new RegExp('msie ' + version).test(userAgent);
	        };

	        // is current browser opera?
	        is.opera = function () {
	            return (/^Opera\//.test(userAgent) || // Opera 12 and older versions
	                /\x20OPR\//.test(userAgent)
	            ); // Opera 15+
	        };

	        // is current browser safari?
	        is.safari = function () {
	            return (/safari/i.test(userAgent) && /apple computer/i.test(vendor)
	            );
	        };

	        if (is.chrome()) {
	            return "chrome";
	        }

	        if (is.firefox()) {
	            return "firefox";
	        }

	        if (is.edge()) {
	            return "edge";
	        }

	        if (is.ie()) {
	            return "ie";
	        }

	        if (is.opera()) {
	            return "opera";
	        }

	        if (is.safari()) {
	            return "safari";
	        }

	        return "unidentified";
	    }
	};

	exports.default = true;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.10.0
	(function() {
	  var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, events, fs, path, writeSync,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  path = __webpack_require__(5);

	  fs = __webpack_require__(6);

	  events = __webpack_require__(7);

	  writeSync = __webpack_require__(8).sync;

	  KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---';

	  _emptyDirectory = function(target) {
	    var i, len, p, ref, results;
	    ref = fs.readdirSync(target);
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      p = ref[i];
	      results.push(_rm(path.join(target, p)));
	    }
	    return results;
	  };

	  _rm = function(target) {
	    if (fs.statSync(target).isDirectory()) {
	      _emptyDirectory(target);
	      return fs.rmdirSync(target);
	    } else {
	      return fs.unlinkSync(target);
	    }
	  };

	  _escapeKey = function(key) {
	    var newKey;
	    if (key === '') {
	      newKey = KEY_FOR_EMPTY_STRING;
	    } else {
	      newKey = key.toString();
	    }
	    return newKey;
	  };

	  QUOTA_EXCEEDED_ERR = (function(superClass) {
	    extend(QUOTA_EXCEEDED_ERR, superClass);

	    function QUOTA_EXCEEDED_ERR(message) {
	      this.message = message != null ? message : 'Unknown error.';
	      if (Error.captureStackTrace != null) {
	        Error.captureStackTrace(this, this.constructor);
	      }
	      this.name = this.constructor.name;
	    }

	    QUOTA_EXCEEDED_ERR.prototype.toString = function() {
	      return this.name + ": " + this.message;
	    };

	    return QUOTA_EXCEEDED_ERR;

	  })(Error);

	  StorageEvent = (function() {
	    function StorageEvent(key1, oldValue1, newValue1, url, storageArea) {
	      this.key = key1;
	      this.oldValue = oldValue1;
	      this.newValue = newValue1;
	      this.url = url;
	      this.storageArea = storageArea != null ? storageArea : 'localStorage';
	    }

	    return StorageEvent;

	  })();

	  MetaKey = (function() {
	    function MetaKey(key1, index1) {
	      this.key = key1;
	      this.index = index1;
	      if (!(this instanceof MetaKey)) {
	        return new MetaKey(this.key, this.index);
	      }
	    }

	    return MetaKey;

	  })();

	  createMap = function() {
	    var Map;
	    Map = function() {};
	    Map.prototype = Object.create(null);
	    return new Map();
	  };

	  LocalStorage = (function(superClass) {
	    var instanceMap;

	    extend(LocalStorage, superClass);

	    instanceMap = {};

	    function LocalStorage(_location, quota) {
	      this._location = _location;
	      this.quota = quota != null ? quota : 5 * 1024 * 1024;
	      if (!(this instanceof LocalStorage)) {
	        return new LocalStorage(this._location, this.quota);
	      }
	      this._location = path.resolve(this._location);
	      if (instanceMap[this._location] != null) {
	        return instanceMap[this._location];
	      }
	      this.length = 0;
	      this._bytesInUse = 0;
	      this._keys = [];
	      this._metaKeyMap = createMap();
	      this._eventUrl = "pid:" + process.pid;
	      this._init();
	      this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
	      instanceMap[this._location] = this;
	      return instanceMap[this._location];
	    }

	    LocalStorage.prototype._init = function() {
	      var _MetaKey, _decodedKey, _keys, error, i, index, k, len, stat;
	      try {
	        stat = fs.statSync(this._location);
	        if ((stat != null) && !stat.isDirectory()) {
	          throw new Error("A file exists at the location '" + this._location + "' when trying to create/open localStorage");
	        }
	        this._bytesInUse = 0;
	        this.length = 0;
	        _keys = fs.readdirSync(this._location);
	        for (index = i = 0, len = _keys.length; i < len; index = ++i) {
	          k = _keys[index];
	          _decodedKey = decodeURIComponent(k);
	          this._keys.push(_decodedKey);
	          _MetaKey = new MetaKey(k, index);
	          this._metaKeyMap[_decodedKey] = _MetaKey;
	          stat = this._getStat(k);
	          if ((stat != null ? stat.size : void 0) != null) {
	            _MetaKey.size = stat.size;
	            this._bytesInUse += stat.size;
	          }
	        }
	        this.length = _keys.length;
	      } catch (error) {
	        fs.mkdirSync(this._location);
	      }
	    };

	    LocalStorage.prototype.setItem = function(key, value) {
	      var encodedKey, evnt, existsBeforeSet, filename, hasListeners, metaKey, oldLength, oldValue, valueString, valueStringLength;
	      hasListeners = events.EventEmitter.listenerCount(this, 'storage');
	      oldValue = null;
	      if (hasListeners) {
	        oldValue = this.getItem(key);
	      }
	      key = _escapeKey(key);
	      encodedKey = encodeURIComponent(key);
	      filename = path.join(this._location, encodedKey);
	      valueString = value.toString();
	      valueStringLength = valueString.length;
	      metaKey = this._metaKeyMap[key];
	      existsBeforeSet = !!metaKey;
	      if (existsBeforeSet) {
	        oldLength = metaKey.size;
	      } else {
	        oldLength = 0;
	      }
	      if (this._bytesInUse - oldLength + valueStringLength > this.quota) {
	        throw new QUOTA_EXCEEDED_ERR();
	      }
	      writeSync(filename, valueString, 'utf8');
	      if (!existsBeforeSet) {
	        metaKey = new MetaKey(encodedKey, (this._keys.push(key)) - 1);
	        metaKey.size = valueStringLength;
	        this._metaKeyMap[key] = metaKey;
	        this.length += 1;
	        this._bytesInUse += valueStringLength;
	      }
	      if (hasListeners) {
	        evnt = new StorageEvent(key, oldValue, value, this._eventUrl);
	        return this.emit('storage', evnt);
	      }
	    };

	    LocalStorage.prototype.getItem = function(key) {
	      var filename, metaKey;
	      key = _escapeKey(key);
	      metaKey = this._metaKeyMap[key];
	      if (!!metaKey) {
	        filename = path.join(this._location, metaKey.key);
	        return fs.readFileSync(filename, 'utf8');
	      } else {
	        return null;
	      }
	    };

	    LocalStorage.prototype._getStat = function(key) {
	      var error, filename;
	      key = _escapeKey(key);
	      filename = path.join(this._location, encodeURIComponent(key));
	      try {
	        return fs.statSync(filename);
	      } catch (error) {
	        return null;
	      }
	    };

	    LocalStorage.prototype.removeItem = function(key) {
	      var evnt, filename, hasListeners, k, meta, metaKey, oldValue, ref, v;
	      key = _escapeKey(key);
	      metaKey = this._metaKeyMap[key];
	      if (!!metaKey) {
	        hasListeners = events.EventEmitter.listenerCount(this, 'storage');
	        oldValue = null;
	        if (hasListeners) {
	          oldValue = this.getItem(key);
	        }
	        delete this._metaKeyMap[key];
	        this.length -= 1;
	        this._bytesInUse -= metaKey.size;
	        filename = path.join(this._location, metaKey.key);
	        this._keys.splice(metaKey.index, 1);
	        ref = this._metaKeyMap;
	        for (k in ref) {
	          v = ref[k];
	          meta = this._metaKeyMap[k];
	          if (meta.index > metaKey.index) {
	            meta.index -= 1;
	          }
	        }
	        _rm(filename);
	        if (hasListeners) {
	          evnt = new StorageEvent(key, oldValue, null, this._eventUrl);
	          return this.emit('storage', evnt);
	        }
	      }
	    };

	    LocalStorage.prototype.key = function(n) {
	      return this._keys[n];
	    };

	    LocalStorage.prototype.clear = function() {
	      var evnt;
	      _emptyDirectory(this._location);
	      this._metaKeyMap = createMap();
	      this._keys = [];
	      this.length = 0;
	      this._bytesInUse = 0;
	      if (events.EventEmitter.listenerCount(this, 'storage')) {
	        evnt = new StorageEvent(null, null, null, this._eventUrl);
	        return this.emit('storage', evnt);
	      }
	    };

	    LocalStorage.prototype._getBytesInUse = function() {
	      return this._bytesInUse;
	    };

	    LocalStorage.prototype._deleteLocation = function() {
	      delete instanceMap[this._location];
	      _rm(this._location);
	      this._metaKeyMap = {};
	      this._keys = [];
	      this.length = 0;
	      return this._bytesInUse = 0;
	    };

	    return LocalStorage;

	  })(events.EventEmitter);

	  JSONStorage = (function(superClass) {
	    extend(JSONStorage, superClass);

	    function JSONStorage() {
	      return JSONStorage.__super__.constructor.apply(this, arguments);
	    }

	    JSONStorage.prototype.setItem = function(key, value) {
	      var newValue;
	      newValue = JSON.stringify(value);
	      return JSONStorage.__super__.setItem.call(this, key, newValue);
	    };

	    JSONStorage.prototype.getItem = function(key) {
	      return JSON.parse(JSONStorage.__super__.getItem.call(this, key));
	    };

	    return JSONStorage;

	  })(LocalStorage);

	  exports.LocalStorage = LocalStorage;

	  exports.JSONStorage = JSONStorage;

	  exports.QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	

/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename, process) {'use strict'
	var fs = __webpack_require__(9)
	var chain = __webpack_require__(38).chain
	var MurmurHash3 = __webpack_require__(42)
	var extend = Object.assign || __webpack_require__(34)._extend

	function murmurhex () {
	  var hash = new MurmurHash3()
	  for (var ii = 0; ii < arguments.length; ++ii) hash.hash('' + arguments[ii])
	  return hash.result()
	}
	var invocations = 0
	var getTmpname = function (filename) {
	  return filename + '.' + murmurhex(__filename, process.pid, ++invocations)
	}

	module.exports = function writeFile (filename, data, options, callback) {
	  if (options instanceof Function) {
	    callback = options
	    options = null
	  }
	  if (!options) options = {}
	  var tmpfile = getTmpname(filename)

	  if (options.mode && options.chmod) {
	    return thenWriteFile()
	  } else {
	    // Either mode or chown is not explicitly set
	    // Default behavior is to copy it from original file
	    return fs.stat(filename, function (err, stats) {
	      options = extend({}, options)
	      if (!err && stats && !options.mode) {
	        options.mode = stats.mode
	      }
	      if (!err && stats && !options.chown && process.getuid) {
	        options.chown = { uid: stats.uid, gid: stats.gid }
	      }
	      return thenWriteFile()
	    })
	  }

	  function thenWriteFile () {
	    chain([
	      [fs, fs.writeFile, tmpfile, data, options.encoding || 'utf8'],
	      options.mode && [fs, fs.chmod, tmpfile, options.mode],
	      options.chown && [fs, fs.chown, tmpfile, options.chown.uid, options.chown.gid],
	      [fs, fs.rename, tmpfile, filename]
	    ], function (err) {
	      err ? fs.unlink(tmpfile, function () { callback(err) })
	        : callback()
	    })
	  }
	}

	module.exports.sync = function writeFileSync (filename, data, options) {
	  if (!options) options = {}
	  var tmpfile = getTmpname(filename)

	  try {
	    if (!options.mode || !options.chmod) {
	      // Either mode or chown is not explicitly set
	      // Default behavior is to copy it from original file
	      try {
	        var stats = fs.statSync(filename)

	        options = extend({}, options)
	        if (!options.mode) {
	          options.mode = stats.mode
	        }
	        if (!options.chown && process.getuid) {
	          options.chown = { uid: stats.uid, gid: stats.gid }
	        }
	      } catch (ex) {
	        // ignore stat errors
	      }
	    }

	    fs.writeFileSync(tmpfile, data, options.encoding || 'utf8')
	    if (options.chown) fs.chownSync(tmpfile, options.chown.uid, options.chown.gid)
	    if (options.mode) fs.chmodSync(tmpfile, options.mode)
	    fs.renameSync(tmpfile, filename)
	  } catch (err) {
	    try { fs.unlinkSync(tmpfile) } catch (e) {}
	    throw err
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js", __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(6)
	var polyfills = __webpack_require__(10)
	var legacy = __webpack_require__(13)
	var queue = []

	var util = __webpack_require__(34)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs4')
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
	    console.error(m)
	  }

	if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug(queue)
	    __webpack_require__(37).equal(queue.length, 0)
	  })
	}

	module.exports = patch(__webpack_require__(11))
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
	  module.exports = patch(fs)
	}

	// Always patch fs.close/closeSync, because we want to
	// retry() whenever a close happens *anywhere* in the program.
	// This is essential when multiple graceful-fs instances are
	// in play at the same time.
	module.exports.close =
	fs.close = (function (fs$close) { return function (fd, cb) {
	  return fs$close.call(fs, fd, function (err) {
	    if (!err)
	      retry()

	    if (typeof cb === 'function')
	      cb.apply(this, arguments)
	  })
	}})(fs.close)

	module.exports.closeSync =
	fs.closeSync = (function (fs$closeSync) { return function (fd) {
	  // Note that graceful-fs also retries when fs.closeSync() fails.
	  // Looks like a bug to me, although it's probably a harmless one.
	  var rval = fs$closeSync.apply(fs, arguments)
	  retry()
	  return rval
	}})(fs.closeSync)

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs)
	  fs.gracefulify = patch
	  fs.FileReadStream = ReadStream;  // Legacy name.
	  fs.FileWriteStream = WriteStream;  // Legacy name.
	  fs.createReadStream = createReadStream
	  fs.createWriteStream = createWriteStream
	  var fs$readFile = fs.readFile
	  fs.readFile = readFile
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile
	  fs.writeFile = writeFile
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile
	  if (fs$appendFile)
	    fs.appendFile = appendFile
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir
	  fs.readdir = readdir
	  function readdir (path, options, cb) {
	    var args = [path]
	    if (typeof options !== 'function') {
	      args.push(options)
	    } else {
	      cb = options
	    }
	    args.push(go$readdir$cb)

	    return go$readdir(args)

	    function go$readdir$cb (err, files) {
	      if (files && files.sort)
	        files.sort()

	      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	        enqueue([go$readdir, [args]])
	      else {
	        if (typeof cb === 'function')
	          cb.apply(this, arguments)
	        retry()
	      }
	    }
	  }

	  function go$readdir (args) {
	    return fs$readdir.apply(fs, args)
	  }

	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs)
	    ReadStream = legStreams.ReadStream
	    WriteStream = legStreams.WriteStream
	  }

	  var fs$ReadStream = fs.ReadStream
	  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
	  ReadStream.prototype.open = ReadStream$open

	  var fs$WriteStream = fs.WriteStream
	  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
	  WriteStream.prototype.open = WriteStream$open

	  fs.ReadStream = ReadStream
	  fs.WriteStream = WriteStream

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy()

	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	        that.read()
	      }
	    })
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy()
	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	      }
	    })
	  }

	  function createReadStream (path, options) {
	    return new ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new WriteStream(path, options)
	  }

	  var fs$open = fs.open
	  fs.open = open
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1])
	  queue.push(elem)
	}

	function retry () {
	  var elem = queue.shift()
	  if (elem) {
	    debug('RETRY', elem[0].name, elem[1])
	    elem[0].apply(null, elem[1])
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(11)
	var constants = __webpack_require__(12)

	var origCwd = process.cwd
	var cwd = null

	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	try {
	  process.cwd()
	} catch (er) {}

	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	module.exports = patch

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs)
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs)
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown)
	  fs.fchown = chownFix(fs.fchown)
	  fs.lchown = chownFix(fs.lchown)

	  fs.chmod = chmodFix(fs.chmod)
	  fs.fchmod = chmodFix(fs.fchmod)
	  fs.lchmod = chmodFix(fs.lchmod)

	  fs.chownSync = chownFixSync(fs.chownSync)
	  fs.fchownSync = chownFixSync(fs.fchownSync)
	  fs.lchownSync = chownFixSync(fs.lchownSync)

	  fs.chmodSync = chmodFixSync(fs.chmodSync)
	  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
	  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

	  fs.stat = statFix(fs.stat)
	  fs.fstat = statFix(fs.fstat)
	  fs.lstat = statFix(fs.lstat)

	  fs.statSync = statFixSync(fs.statSync)
	  fs.fstatSync = statFixSync(fs.fstatSync)
	  fs.lstatSync = statFixSync(fs.lstatSync)

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (!fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchmodSync = function () {}
	  }
	  if (!fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchownSync = function () {}
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 60 seconds.

	  // Set the timeout this long because some Windows Anti-Virus, such as Parity
	  // bit9, may lock files for up to a minute, causing npm package install
	  // failures. Also, take care to yield the scheduler. Windows scheduling gives
	  // CPU to a busy looping process, which can cause the program causing the lock
	  // contention to be starved of CPU by node, so the contention doesn't resolve.
	  if (platform === "win32") {
	    fs.rename = (function (fs$rename) { return function (from, to, cb) {
	      var start = Date.now()
	      var backoff = 0;
	      fs$rename(from, to, function CB (er) {
	        if (er
	            && (er.code === "EACCES" || er.code === "EPERM")
	            && Date.now() - start < 60000) {
	          setTimeout(function() {
	            fs.stat(to, function (stater, st) {
	              if (stater && stater.code === "ENOENT")
	                fs$rename(from, to, CB);
	              else
	                cb(er)
	            })
	          }, backoff)
	          if (backoff < 100)
	            backoff += 10;
	          return;
	        }
	        if (cb) cb(er)
	      })
	    }})(fs.rename)
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
	    var callback
	    if (callback_ && typeof callback_ === 'function') {
	      var eagCounter = 0
	      callback = function (er, _, __) {
	        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	        }
	        callback_.apply(this, arguments)
	      }
	    }
	    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	  }})(fs.read)

	  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync)
	}

	function patchLchmod (fs) {
	  fs.lchmod = function (path, mode, callback) {
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        if (callback) callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          if (callback) callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var threw = true
	    var ret
	    try {
	      ret = fs.fchmodSync(fd, mode)
	      threw = false
	    } finally {
	      if (threw) {
	        try {
	          fs.closeSync(fd)
	        } catch (er) {}
	      } else {
	        fs.closeSync(fd)
	      }
	    }
	    return ret
	  }
	}

	function patchLutimes (fs) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        if (er) {
	          if (cb) cb(er)
	          return
	        }
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            if (cb) cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	      var ret
	      var threw = true
	      try {
	        ret = fs.futimesSync(fd, at, mt)
	        threw = false
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd)
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd)
	        }
	      }
	      return ret
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}

	function chmodFix (orig) {
	  if (!orig) return orig
	  return function (target, mode, cb) {
	    return orig.call(fs, target, mode, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chmodFixSync (orig) {
	  if (!orig) return orig
	  return function (target, mode) {
	    try {
	      return orig.call(fs, target, mode)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function statFix (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target, cb) {
	    return orig.call(fs, target, function (er, stats) {
	      if (!stats) return cb.apply(this, arguments)
	      if (stats.uid < 0) stats.uid += 0x100000000
	      if (stats.gid < 0) stats.gid += 0x100000000
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function statFixSync (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target) {
	    var stats = orig.call(fs, target)
	    if (stats.uid < 0) stats.uid += 0x100000000
	    if (stats.gid < 0) stats.gid += 0x100000000
	    return stats;
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(6)

	module.exports = clone(fs)

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: obj.__proto__ }
	  else
	    var copy = Object.create(null)

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
	  })

	  return copy
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = {
		"O_RDONLY": 0,
		"O_WRONLY": 1,
		"O_RDWR": 2,
		"S_IFMT": 61440,
		"S_IFREG": 32768,
		"S_IFDIR": 16384,
		"S_IFCHR": 8192,
		"S_IFBLK": 24576,
		"S_IFIFO": 4096,
		"S_IFLNK": 40960,
		"S_IFSOCK": 49152,
		"O_CREAT": 512,
		"O_EXCL": 2048,
		"O_NOCTTY": 131072,
		"O_TRUNC": 1024,
		"O_APPEND": 8,
		"O_DIRECTORY": 1048576,
		"O_NOFOLLOW": 256,
		"O_SYNC": 128,
		"O_SYMLINK": 2097152,
		"S_IRWXU": 448,
		"S_IRUSR": 256,
		"S_IWUSR": 128,
		"S_IXUSR": 64,
		"S_IRWXG": 56,
		"S_IRGRP": 32,
		"S_IWGRP": 16,
		"S_IXGRP": 8,
		"S_IRWXO": 7,
		"S_IROTH": 4,
		"S_IWOTH": 2,
		"S_IXOTH": 1,
		"E2BIG": 7,
		"EACCES": 13,
		"EADDRINUSE": 48,
		"EADDRNOTAVAIL": 49,
		"EAFNOSUPPORT": 47,
		"EAGAIN": 35,
		"EALREADY": 37,
		"EBADF": 9,
		"EBADMSG": 94,
		"EBUSY": 16,
		"ECANCELED": 89,
		"ECHILD": 10,
		"ECONNABORTED": 53,
		"ECONNREFUSED": 61,
		"ECONNRESET": 54,
		"EDEADLK": 11,
		"EDESTADDRREQ": 39,
		"EDOM": 33,
		"EDQUOT": 69,
		"EEXIST": 17,
		"EFAULT": 14,
		"EFBIG": 27,
		"EHOSTUNREACH": 65,
		"EIDRM": 90,
		"EILSEQ": 92,
		"EINPROGRESS": 36,
		"EINTR": 4,
		"EINVAL": 22,
		"EIO": 5,
		"EISCONN": 56,
		"EISDIR": 21,
		"ELOOP": 62,
		"EMFILE": 24,
		"EMLINK": 31,
		"EMSGSIZE": 40,
		"EMULTIHOP": 95,
		"ENAMETOOLONG": 63,
		"ENETDOWN": 50,
		"ENETRESET": 52,
		"ENETUNREACH": 51,
		"ENFILE": 23,
		"ENOBUFS": 55,
		"ENODATA": 96,
		"ENODEV": 19,
		"ENOENT": 2,
		"ENOEXEC": 8,
		"ENOLCK": 77,
		"ENOLINK": 97,
		"ENOMEM": 12,
		"ENOMSG": 91,
		"ENOPROTOOPT": 42,
		"ENOSPC": 28,
		"ENOSR": 98,
		"ENOSTR": 99,
		"ENOSYS": 78,
		"ENOTCONN": 57,
		"ENOTDIR": 20,
		"ENOTEMPTY": 66,
		"ENOTSOCK": 38,
		"ENOTSUP": 45,
		"ENOTTY": 25,
		"ENXIO": 6,
		"EOPNOTSUPP": 102,
		"EOVERFLOW": 84,
		"EPERM": 1,
		"EPIPE": 32,
		"EPROTO": 100,
		"EPROTONOSUPPORT": 43,
		"EPROTOTYPE": 41,
		"ERANGE": 34,
		"EROFS": 30,
		"ESPIPE": 29,
		"ESRCH": 3,
		"ESTALE": 70,
		"ETIME": 101,
		"ETIMEDOUT": 60,
		"ETXTBSY": 26,
		"EWOULDBLOCK": 35,
		"EXDEV": 18,
		"SIGHUP": 1,
		"SIGINT": 2,
		"SIGQUIT": 3,
		"SIGILL": 4,
		"SIGTRAP": 5,
		"SIGABRT": 6,
		"SIGIOT": 6,
		"SIGBUS": 10,
		"SIGFPE": 8,
		"SIGKILL": 9,
		"SIGUSR1": 30,
		"SIGSEGV": 11,
		"SIGUSR2": 31,
		"SIGPIPE": 13,
		"SIGALRM": 14,
		"SIGTERM": 15,
		"SIGCHLD": 20,
		"SIGCONT": 19,
		"SIGSTOP": 17,
		"SIGTSTP": 18,
		"SIGTTIN": 21,
		"SIGTTOU": 22,
		"SIGURG": 16,
		"SIGXCPU": 24,
		"SIGXFSZ": 25,
		"SIGVTALRM": 26,
		"SIGPROF": 27,
		"SIGWINCH": 28,
		"SIGIO": 23,
		"SIGSYS": 12,
		"SSL_OP_ALL": 2147486719,
		"SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION": 262144,
		"SSL_OP_CIPHER_SERVER_PREFERENCE": 4194304,
		"SSL_OP_CISCO_ANYCONNECT": 32768,
		"SSL_OP_COOKIE_EXCHANGE": 8192,
		"SSL_OP_CRYPTOPRO_TLSEXT_BUG": 2147483648,
		"SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS": 2048,
		"SSL_OP_EPHEMERAL_RSA": 2097152,
		"SSL_OP_LEGACY_SERVER_CONNECT": 4,
		"SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER": 32,
		"SSL_OP_MICROSOFT_SESS_ID_BUG": 1,
		"SSL_OP_MSIE_SSLV2_RSA_PADDING": 64,
		"SSL_OP_NETSCAPE_CA_DN_BUG": 536870912,
		"SSL_OP_NETSCAPE_CHALLENGE_BUG": 2,
		"SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG": 1073741824,
		"SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG": 8,
		"SSL_OP_NO_COMPRESSION": 131072,
		"SSL_OP_NO_QUERY_MTU": 4096,
		"SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION": 65536,
		"SSL_OP_NO_SSLv2": 16777216,
		"SSL_OP_NO_SSLv3": 33554432,
		"SSL_OP_NO_TICKET": 16384,
		"SSL_OP_NO_TLSv1": 67108864,
		"SSL_OP_NO_TLSv1_1": 268435456,
		"SSL_OP_NO_TLSv1_2": 134217728,
		"SSL_OP_PKCS1_CHECK_1": 0,
		"SSL_OP_PKCS1_CHECK_2": 0,
		"SSL_OP_SINGLE_DH_USE": 1048576,
		"SSL_OP_SINGLE_ECDH_USE": 524288,
		"SSL_OP_SSLEAY_080_CLIENT_DH_BUG": 128,
		"SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG": 16,
		"SSL_OP_TLS_BLOCK_PADDING_BUG": 512,
		"SSL_OP_TLS_D5_BUG": 256,
		"SSL_OP_TLS_ROLLBACK_BUG": 8388608,
		"NPN_ENABLED": 1
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Stream = __webpack_require__(14).Stream

	module.exports = legacy

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    })
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = Stream;

	var EE = __webpack_require__(7).EventEmitter;
	var inherits = __webpack_require__(15);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(16);
	Stream.Writable = __webpack_require__(30);
	Stream.Duplex = __webpack_require__(31);
	Stream.Transform = __webpack_require__(32);
	Stream.PassThrough = __webpack_require__(33);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = __webpack_require__(17);
	exports.Stream = __webpack_require__(14);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(26);
	exports.Duplex = __webpack_require__(25);
	exports.Transform = __webpack_require__(28);
	exports.PassThrough = __webpack_require__(29);
	if (!process.browser && process.env.READABLE_STREAM === 'disable') {
	  module.exports = __webpack_require__(14);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(18);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(19).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(7).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(14);

	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(24);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(25);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(27).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(25);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(27).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(20)
	var ieee754 = __webpack_require__(21)
	var isArray = __webpack_require__(22)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
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

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	var Readable = __webpack_require__(17);
	var Writable = __webpack_require__(26);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(19).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	var Stream = __webpack_require__(14);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(25);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(25);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

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

	var Buffer = __webpack_require__(19).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

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


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(25);

	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

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

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(28);

	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26)


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29)


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
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

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(35);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(36);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __webpack_require__(34);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports.asyncMap = __webpack_require__(39)
	exports.bindActor = __webpack_require__(40)
	exports.chain = __webpack_require__(41)


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/*
	usage:

	// do something to a list of things
	asyncMap(myListOfStuff, function (thing, cb) { doSomething(thing.foo, cb) }, cb)
	// do more than one thing to each item
	asyncMap(list, fooFn, barFn, cb)

	*/

	module.exports = asyncMap

	function asyncMap () {
	  var steps = Array.prototype.slice.call(arguments)
	    , list = steps.shift() || []
	    , cb_ = steps.pop()
	  if (typeof cb_ !== "function") throw new Error(
	    "No callback provided to asyncMap")
	  if (!list) return cb_(null, [])
	  if (!Array.isArray(list)) list = [list]
	  var n = steps.length
	    , data = [] // 2d array
	    , errState = null
	    , l = list.length
	    , a = l * n
	  if (!a) return cb_(null, [])
	  function cb (er) {
	    if (er && !errState) errState = er

	    var argLen = arguments.length
	    for (var i = 1; i < argLen; i ++) if (arguments[i] !== undefined) {
	      data[i - 1] = (data[i - 1] || []).concat(arguments[i])
	    }
	    // see if any new things have been added.
	    if (list.length > l) {
	      var newList = list.slice(l)
	      a += (list.length - l) * n
	      l = list.length
	      process.nextTick(function () {
	        newList.forEach(function (ar) {
	          steps.forEach(function (fn) { fn(ar, cb) })
	        })
	      })
	    }

	    if (--a === 0) cb_.apply(null, [errState].concat(data))
	  }
	  // expect the supplied cb function to be called
	  // "n" times for each thing in the array.
	  list.forEach(function (ar) {
	    steps.forEach(function (fn) { fn(ar, cb) })
	  })
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = bindActor
	function bindActor () {
	  var args = 
	        Array.prototype.slice.call
	        (arguments) // jswtf.
	    , obj = null
	    , fn
	  if (typeof args[0] === "object") {
	    obj = args.shift()
	    fn = args.shift()
	    if (typeof fn === "string")
	      fn = obj[ fn ]
	  } else fn = args.shift()
	  return function (cb) {
	    fn.apply(obj, args.concat(cb)) }
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = chain
	var bindActor = __webpack_require__(40)
	chain.first = {} ; chain.last = {}
	function chain (things, cb) {
	  var res = []
	  ;(function LOOP (i, len) {
	    if (i >= len) return cb(null,res)
	    if (Array.isArray(things[i]))
	      things[i] = bindActor.apply(null,
	        things[i].map(function(i){
	          return (i===chain.first) ? res[0]
	           : (i===chain.last)
	             ? res[res.length - 1] : i }))
	    if (!things[i]) return LOOP(i + 1, len)
	    things[i](function (er, data) {
	      if (er) return cb(er, res)
	      if (data !== undefined) res = res.concat(data)
	      LOOP(i + 1, len)
	    })
	  })(0, things.length) }


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @preserve
	 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
	 *
	 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
	 * @see http://github.com/homebrewing/brauhaus-diff
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	 * @see http://sites.google.com/site/murmurhash/
	 */
	(function(){
	    var cache;

	    // Call this function without `new` to use the cached object (good for
	    // single-threaded environments), or with `new` to create a new object.
	    //
	    // @param {string} key A UTF-16 or ASCII string
	    // @param {number} seed An optional positive integer
	    // @return {object} A MurmurHash3 object for incremental hashing
	    function MurmurHash3(key, seed) {
	        var m = this instanceof MurmurHash3 ? this : cache;
	        m.reset(seed)
	        if (typeof key === 'string' && key.length > 0) {
	            m.hash(key);
	        }

	        if (m !== this) {
	            return m;
	        }
	    };

	    // Incrementally add a string to this hash
	    //
	    // @param {string} key A UTF-16 or ASCII string
	    // @return {object} this
	    MurmurHash3.prototype.hash = function(key) {
	        var h1, k1, i, top, len;

	        len = key.length;
	        this.len += len;

	        k1 = this.k1;
	        i = 0;
	        switch (this.rem) {
	            case 0: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) : 0;
	            case 1: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 8 : 0;
	            case 2: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 16 : 0;
	            case 3:
	                k1 ^= len > i ? (key.charCodeAt(i) & 0xff) << 24 : 0;
	                k1 ^= len > i ? (key.charCodeAt(i++) & 0xff00) >> 8 : 0;
	        }

	        this.rem = (len + this.rem) & 3; // & 3 is same as % 4
	        len -= this.rem;
	        if (len > 0) {
	            h1 = this.h1;
	            while (1) {
	                k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
	                k1 = (k1 << 15) | (k1 >>> 17);
	                k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;

	                h1 ^= k1;
	                h1 = (h1 << 13) | (h1 >>> 19);
	                h1 = (h1 * 5 + 0xe6546b64) & 0xffffffff;

	                if (i >= len) {
	                    break;
	                }

	                k1 = ((key.charCodeAt(i++) & 0xffff)) ^
	                     ((key.charCodeAt(i++) & 0xffff) << 8) ^
	                     ((key.charCodeAt(i++) & 0xffff) << 16);
	                top = key.charCodeAt(i++);
	                k1 ^= ((top & 0xff) << 24) ^
	                      ((top & 0xff00) >> 8);
	            }

	            k1 = 0;
	            switch (this.rem) {
	                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xffff) << 16;
	                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xffff) << 8;
	                case 1: k1 ^= (key.charCodeAt(i) & 0xffff);
	            }

	            this.h1 = h1;
	        }

	        this.k1 = k1;
	        return this;
	    };

	    // Get the result of this hash
	    //
	    // @return {number} The 32-bit hash
	    MurmurHash3.prototype.result = function() {
	        var k1, h1;
	        
	        k1 = this.k1;
	        h1 = this.h1;

	        if (k1 > 0) {
	            k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
	            k1 = (k1 << 15) | (k1 >>> 17);
	            k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;
	            h1 ^= k1;
	        }

	        h1 ^= this.len;

	        h1 ^= h1 >>> 16;
	        h1 = (h1 * 0xca6b + (h1 & 0xffff) * 0x85eb0000) & 0xffffffff;
	        h1 ^= h1 >>> 13;
	        h1 = (h1 * 0xae35 + (h1 & 0xffff) * 0xc2b20000) & 0xffffffff;
	        h1 ^= h1 >>> 16;

	        return h1 >>> 0;
	    };

	    // Reset the hash object for reuse
	    //
	    // @param {number} seed An optional positive integer
	    MurmurHash3.prototype.reset = function(seed) {
	        this.h1 = typeof seed === 'number' ? seed : 0;
	        this.rem = this.k1 = this.len = 0;
	        return this;
	    };

	    // A cached object to use. This can be safely used if you're in a single-
	    // threaded environment, otherwise you need to create new hashes to use.
	    cache = new MurmurHash3();

	    if (true) {
	        module.exports = MurmurHash3;
	    } else {
	        this.MurmurHash3 = MurmurHash3;
	    }
	}());


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Socket from 'socket.io-client'

	/*
	 CloudApp
	 */
	_CB2.default.CloudApp = _CB2.default.CloudApp || {};
	_CB2.default.CloudApp._isConnected = false;

	_CB2.default.CloudApp.init = function (serverUrl, applicationId, applicationKey, opts) {
	    //static function for initialisation of the app
	    if (!applicationKey) {
	        applicationKey = applicationId;
	        applicationId = serverUrl;
	    } else {
	        _CB2.default.apiUrl = serverUrl;
	    }

	    if ((typeof applicationKey === "undefined" ? "undefined" : _typeof(applicationKey)) === "object") {
	        opts = applicationKey;
	        applicationKey = applicationId;
	        applicationId = serverUrl;
	    }

	    _CB2.default.appId = applicationId;
	    _CB2.default.appKey = applicationKey;

	    if (opts && opts.disableRealtime === true) {
	        _CB2.default._isRealtimeDisabled = true;
	    } else {
	        // CB.io = Socket
	        // CB.Socket = CB.io(CB.apiUrl);        
	    }
	    _CB2.default.CloudApp._isConnected = true;
	};

	_CB2.default.CloudApp.onConnect = function (functionToFire) {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.on('connect', functionToFire);
	};

	_CB2.default.CloudApp.onDisconnect = function (functionToFire) {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.on('disconnect', functionToFire);
	};

	_CB2.default.CloudApp.connect = function () {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.connect();
	    _CB2.default.CloudApp._isConnected = true;
	};

	_CB2.default.CloudApp.disconnect = function () {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.emit('socket-disconnect', _CB2.default.appId);
	    _CB2.default.CloudApp._isConnected = false;
	};

	exports.default = true;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 Column.js
	 */
	_CB2.default.Column = function (columnName, dataType, required, unique) {
	    this.document = {};
	    if (columnName) {
	        _CB2.default._columnNameValidation(columnName);
	        this.document.name = columnName;
	        this.document._type = 'column';
	    }

	    if (dataType) {
	        _CB2.default._columnDataTypeValidation(dataType);
	        this.document.dataType = dataType;
	    } else {
	        this.document.dataType = "Text";
	    }

	    if (typeof required === 'boolean') {
	        this.document.required = required;
	    } else {
	        this.document.required = false;
	    }

	    if (typeof unique === 'boolean') {
	        this.document.unique = unique;
	    } else {
	        this.document.unique = false;
	    }

	    if (dataType === "Text") {
	        this.document.isSearchable = true;
	    }

	    this.document.relatedTo = null;
	    this.document.relationType = null;

	    this.document.isDeletable = true;
	    this.document.isEditable = true;
	    this.document.isRenamable = false;
	    this.document.editableByMasterKey = false;
	};

	Object.defineProperty(_CB2.default.Column.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set(name) {
	        this.document.name = name;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'dataType', {
	    get: function get() {
	        return this.document.dataType;
	    },
	    set: function set(dataType) {
	        this.document.dataType = dataType;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'unique', {
	    get: function get() {
	        return this.document.unique;
	    },
	    set: function set(unique) {
	        this.document.unique = unique;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'relatedTo', {
	    get: function get() {
	        return this.document.relatedTo;
	    },
	    set: function set(relatedTo) {
	        this.document.relatedTo = relatedTo;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'required', {
	    get: function get() {
	        return this.document.required;
	    },
	    set: function set(required) {
	        this.document.required = required;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'editableByMasterKey', {
	    get: function get() {
	        return this.document.editableByMasterKey;
	    },
	    set: function set(editableByMasterKey) {
	        this.document.editableByMasterKey = editableByMasterKey;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'isSearchable', {
	    get: function get() {
	        return this.document.isSearchable;
	    },
	    set: function set(isSearchable) {
	        this.document.isSearchable = isSearchable;
	    }
	});

	exports.default = true;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  CloudTable
	 */

	_CB2.default.CloudTable = function (tableName) {
	    //new table constructor

	    _CB2.default._tableValidation(tableName);
	    this.document = {};
	    this.document.name = tableName;
	    this.document.appId = _CB2.default.appId;
	    this.document._type = 'table';

	    if (tableName.toLowerCase() === "user") {
	        this.document.type = "user";
	        this.document.maxCount = 1;
	    } else if (tableName.toLowerCase() === "role") {
	        this.document.type = "role";
	        this.document.maxCount = 1;
	    } else if (tableName.toLowerCase() === "device") {
	        this.document.type = "device";
	        this.document.maxCount = 1;
	    } else {
	        this.document.type = "custom";
	        this.document.maxCount = 9999;
	    }
	    this.document.columns = _CB2.default._defaultColumns(this.document.type);
	};

	Object.defineProperty(_CB2.default.CloudTable.prototype, 'columns', {
	    get: function get() {
	        return this.document.columns;
	    }
	});

	Object.defineProperty(_CB2.default.CloudTable.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set() {
	        throw "You can not rename a table";
	    }
	});

	Object.defineProperty(_CB2.default.CloudTable.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	_CB2.default.CloudTable.prototype.addColumn = function (column) {
	    if (Object.prototype.toString.call(column) === '[object String]') {
	        var obj = new _CB2.default.Column(column);
	        column = obj;
	    }
	    if (Object.prototype.toString.call(column) === '[object Object]') {
	        if (_CB2.default._columnValidation(column, this)) this.document.columns.push(column);
	    } else if (Object.prototype.toString.call(column) === '[object Array]') {
	        for (var i = 0; i < column.length; i++) {
	            if (_CB2.default._columnValidation(column[i], this)) this.document.columns.push(column[i]);
	        }
	    }
	};

	_CB2.default.CloudTable.prototype.getColumn = function (columnName) {
	    if (Object.prototype.toString.call(columnName) !== '[object String]') {
	        throw "Should enter a columnName";
	    }
	    var columns = this.document.columns;
	    for (var i = 0; i < columns.length; i++) {
	        if (columns[i].name === columnName) return columns[i];
	    }
	    throw "Column Does Not Exists";
	};

	_CB2.default.CloudTable.prototype.updateColumn = function (column) {
	    if (Object.prototype.toString.call(column) === '[object Object]') {
	        if (_CB2.default._columnValidation(column, this)) {
	            var columns = this.document.columns;
	            for (var i = 0; i < columns.length; i++) {
	                if (columns[i].name === column.name) {
	                    columns[i] = column;
	                    this.document.columns = columns;
	                    break;
	                }
	            }
	        } else {
	            throw "Invalid Column";
	        }
	    } else {
	        throw "Invalid Column";
	    }
	};

	_CB2.default.CloudTable.prototype.deleteColumn = function (column) {
	    if (Object.prototype.toString.call(column) === '[object String]') {
	        var obj = new _CB2.default.Column(column);
	        column = obj;
	    }
	    if (Object.prototype.toString.call(column) === '[object Object]') {
	        if (_CB2.default._columnValidation(column, this)) {
	            var arr = [];
	            for (var i = 0; i < this.columns.length; i++) {
	                if (this.columns[i].name !== column.name) arr.push(this.columns[i]);
	            }
	            this.document.columns = arr;
	        }
	    } else if (Object.prototype.toString.call(column) === '[object Array]') {
	        var arr = [];
	        for (var i = 0; i < column.length; i++) {
	            if (_CB2.default._columnValidation(column[i], this)) {
	                for (var i = 0; i < this.columns.length; i++) {
	                    if (this.columns[i].name !== column[i].name) arr.push(this.columns[i]);
	                }
	                this.document.columns = arr;
	            }
	        }
	    }
	};

	/**
	 * Gets All the Tables from an App
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.getAll = function (callback) {
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/_getAll";
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        response = JSON.parse(response);
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	/**
	 * Gets a table
	 *
	 * @param table
	 *  It is the CloudTable object
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.get = function (table, callback) {
	    if (Object.prototype.toString.call(table) === '[object String]') {
	        var obj = new _CB2.default.CloudTable(table);
	        table = obj;
	    }
	    if (Object.prototype.toString.call(table) === '[object Object]') {
	        {
	            if (!_CB2.default.appId) {
	                throw "CB.appId is null.";
	            }

	            var def;
	            if (!callback) {
	                def = new _CB2.default.Promise();
	            }

	            var params = JSON.stringify({
	                key: _CB2.default.appKey,
	                appId: _CB2.default.appId
	            });

	            var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/" + table.document.name;
	            _CB2.default._request('POST', url, params, true).then(function (response) {
	                if (response === "null" || response === "") {
	                    obj = null;
	                } else {
	                    response = JSON.parse(response);
	                    var obj = _CB2.default.fromJSON(response);
	                }
	                if (callback) {
	                    callback.success(obj);
	                } else {
	                    def.resolve(obj);
	                }
	            }, function (err) {
	                if (callback) {
	                    callback.error(err);
	                } else {
	                    def.reject(err);
	                }
	            });
	            if (!callback) {
	                return def;
	            }
	        }
	    } else if (Object.prototype.toString.call(table) === '[object Array]') {
	        throw "cannot fetch array of tables";
	    }
	};

	/**
	 * Deletes a table from database.
	 *
	 * @param table
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.prototype.delete = function (callback) {
	    _CB2.default._validate();

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        name: this.name,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/" + this.name;

	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	/**
	 * Saves a table
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.prototype.save = function (callback) {
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    _CB2.default._validate();
	    var thisObj = this;
	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        data: _CB2.default.toJSON(thisObj)
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/" + thisObj.document.name;

	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        response = JSON.parse(response);
	        thisObj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CB2.default.ACL = function () {
	    //constructor for ACL class
	    this.document = {};
	    this.document['read'] = { "allow": { "user": ['all'], "role": [] }, "deny": { "user": [], "role": [] } }; //by default allow read access to "all"
	    this.document['write'] = { "allow": { "user": ['all'], "role": [] }, "deny": { "user": [], "role": [] } }; //by default allow write access to "all"
	    this.parent = null;
	};
	_CB2.default.ACL.prototype.setPublicWriteAccess = function (value) {
	    //for setting the public write access
	    if (value) {
	        //If asked to allow public write access
	        this.document['write']['allow']['user'] = ['all'];
	    } else {
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1); //remove the "all" value from the "write" array of "this" object
	        }
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setPublicReadAccess = function (value) {
	    //for setting the public read access

	    if (value) {
	        //If asked to allow public read access
	        this.document['read']['allow']['user'] = ['all'];
	    } else {
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1); //remove the "all" value from the "read" array of "this" object
	        }
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setUserWriteAccess = function (userId, value) {
	    //for setting the user write access

	    if (value) {
	        //If asked to allow user write access
	        //remove public write access.
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['write']['allow']['user'].indexOf(userId) === -1) {
	            this.document['write']['allow']['user'].push(userId);
	        }
	    } else {
	        var index = this.document['write']['allow']['user'].indexOf(userId);
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1); //remove the "userId" value from the "write" array of "this" object
	        }
	        this.document['write']['deny']['user'].push(userId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setUserReadAccess = function (userId, value) {
	    //for setting the user read access

	    if (value) {
	        //If asked to allow user read access
	        //remove public write access.
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['read']['allow']['user'].indexOf(userId) === -1) {
	            this.document['read']['allow']['user'].push(userId);
	        }
	    } else {
	        var index = this.document['read']['allow']['user'].indexOf(userId);
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1); //remove the "userId" value from the "read" array of "this" object
	        }
	        this.document['read']['deny']['user'].push(userId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setRoleWriteAccess = function (roleId, value) {

	    if (value) {
	        //remove public write access.
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['write']['allow']['role'].indexOf(roleId) === -1) {
	            this.document['write']['allow']['role'].push(roleId);
	        }
	    } else {
	        var index = this.document['write']['allow']['role'].indexOf(roleId);
	        if (index > -1) {
	            this.document['write']['allow']['role'].splice(index, 1);
	        }
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1);
	        }

	        this.document['write']['deny']['role'].push(roleId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setRoleReadAccess = function (roleId, value) {

	    if (value) {
	        //remove public write access.
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['read']['allow']['role'].indexOf(roleId) === -1) {
	            this.document['read']['allow']['role'].push(roleId);
	        }
	    } else {
	        var index = this.document['read']['allow']['role'].indexOf(roleId);
	        if (index > -1) {
	            this.document['read']['allow']['role'].splice(index, 1);
	        }
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1);
	        }
	        this.document['read']['deny']['role'].push(roleId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};

	exports.default = true;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 *CloudGeoPoint
	 */

	_CB2.default.CloudGeoPoint = _CB2.default.CloudGeoPoint || function (longitude, latitude) {
	    if (!latitude && latitude !== 0 || !longitude && longitude !== 0) throw "Latitude or Longitude is empty.";

	    if (isNaN(latitude)) throw "Latitude " + latitude + " is not a number type.";

	    if (isNaN(longitude)) throw "Longitude " + longitude + " is not a number type.";

	    this.document = {};
	    this.document._type = "point";
	    this.document._isModified = true;
	    //The default datum for an earth-like sphere is WGS84. Coordinate-axis order is longitude, latitude.
	    if (Number(latitude) >= -90 && Number(latitude) <= 90 && Number(longitude) >= -180 && Number(longitude) <= 180) {
	        this.document.coordinates = [Number(longitude), Number(latitude)];
	        this.document.latitude = Number(latitude);
	        this.document.longitude = Number(longitude);
	    } else {
	        throw "latitude and longitudes are not in range";
	    }
	};

	Object.defineProperty(_CB2.default.CloudGeoPoint.prototype, 'latitude', {
	    get: function get() {
	        return this.document.coordinates[1];
	    },
	    set: function set(latitude) {
	        if (Number(latitude) >= -90 && Number(latitude) <= 90) {
	            this.document.latitude = Number(latitude);
	            this.document.coordinates[1] = Number(latitude);
	            this.document._isModified = true;
	        } else throw "Latitude is not in Range";
	    }
	});

	Object.defineProperty(_CB2.default.CloudGeoPoint.prototype, 'longitude', {
	    get: function get() {
	        return this.document.coordinates[0];
	    },
	    set: function set(longitude) {
	        if (Number(longitude) >= -180 && Number(longitude) <= 180) {
	            this.document.longitude = Number(longitude);
	            this.document.coordinates[0] = Number(longitude);
	            this.document._isModified = true;
	        } else throw "Longitude is not in Range";
	    }
	});

	_CB2.default.CloudGeoPoint.prototype.get = function (name) {
	    //for getting data of a particular column

	    return this.document[name];
	};

	_CB2.default.CloudGeoPoint.prototype.set = function (name, value) {
	    //for getting data of a particular column

	    if (name === 'latitude') {
	        if (Number(value) >= -90 && Number(value) <= 90) {
	            this.document.latitude = Number(value);
	            this.document.coordinates[1] = Number(value);
	            this.document._isModified = true;
	        } else throw "Latitude is not in Range";
	    } else {
	        if (Number(value) >= -180 && Number(value) <= 180) {
	            this.document.longitude = Number(value);
	            this.document.coordinates[0] = Number(value);
	            this.document._isModified = true;
	        } else throw "Latitude is not in Range";
	    }
	};
	_CB2.default.CloudGeoPoint.prototype.distanceInKMs = function (point) {

	    var earthRedius = 6371; //in Kilometer
	    return earthRedius * greatCircleFormula(this, point);
	};

	_CB2.default.CloudGeoPoint.prototype.distanceInMiles = function (point) {

	    var earthRedius = 3959; // in Miles
	    return earthRedius * greatCircleFormula(this, point);
	};

	_CB2.default.CloudGeoPoint.prototype.distanceInRadians = function (point) {

	    return greatCircleFormula(this, point);
	};

	function greatCircleFormula(thisObj, point) {

	    var dLat = (thisObj.document.coordinates[1] - point.document.coordinates[1]).toRad();
	    var dLon = (thisObj.document.coordinates[0] - point.document.coordinates[0]).toRad();
	    var lat1 = point.document.coordinates[1].toRad();
	    var lat2 = thisObj.document.coordinates[1].toRad();
	    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    return c;
	}

	if (typeof Number.prototype.toRad === "undefined") {
	    Number.prototype.toRad = function () {
	        return this * Math.PI / 180;
	    };
	}

	exports.default = true;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudObject
	 */

	_CB2.default.CloudObject = function (tableName, id) {
	    //object for documents

	    this.document = {};
	    this.document._tableName = tableName; //the document object
	    this.document.ACL = new _CB2.default.ACL(); //ACL(s) of the document
	    this.document._type = 'custom';
	    this.document.expires = null;
	    this.document._hash = _CB2.default._generateHash();

	    if (!id) {
	        this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'expires'];
	        this.document._isModified = true;
	    } else {
	        this.document._modifiedColumns = [];
	        this.document._isModified = false;
	        this.document._id = id;
	    }
	};

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'ACL', {
	    get: function get() {
	        return this.document.ACL;
	    },
	    set: function set(ACL) {
	        this.document.ACL = ACL;
	        this.document.ACL.parent = this;
	        _CB2.default._modified(this, 'ACL');
	    }
	});

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'createdAt', {
	    get: function get() {
	        return this.document.createdAt;
	    },
	    set: function set(createdAt) {
	        this.document.createdAt = createdAt;
	        _CB2.default._modified(this, 'createdAt');
	    }
	});

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'updatedAt', {
	    get: function get() {
	        return this.document.updatedAt;
	    },
	    set: function set(updatedAt) {
	        this.document.updatedAt = updatedAt;
	        _CB2.default._modified(this, 'updatedAt');
	    }
	});

	/* For Expire of objects */
	Object.defineProperty(_CB2.default.CloudObject.prototype, 'expires', {
	    get: function get() {
	        return this.document.expires;
	    },
	    set: function set(expires) {
	        this.document.expires = expires;
	        _CB2.default._modified(this, 'expires');
	    }
	});

	/* This is Real time implementation of CloudObjects */
	_CB2.default.CloudObject.on = function (tableName, eventType, cloudQuery, callback, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    var def;

	    //shift variables.
	    if (cloudQuery && !(cloudQuery instanceof _CB2.default.CloudQuery)) {
	        //this is a function.
	        if (callback !== null && (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	            //callback is actually done.
	            done = callback;
	            callback = null;
	        }
	        callback = cloudQuery;
	        cloudQuery = null;
	    }

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    //validate query.
	    if (cloudQuery && cloudQuery instanceof _CB2.default.CloudQuery) {

	        if (cloudQuery.tableName !== tableName) {
	            throw "CloudQuery TableName and CloudNotification TableName should be same.";
	        }

	        if (cloudQuery.query) {
	            if (cloudQuery.query.$include.length > 0) {
	                throw "Include with CloudNotificaitons is not supported right now.";
	            }
	        }

	        if (Object.keys(cloudQuery.select).length > 0) {
	            throw "You cannot pass the query with select in CloudNotifications.";
	        }
	    }

	    tableName = tableName.toLowerCase();

	    if (eventType instanceof Array) {
	        //if event type is an array.
	        for (var i = 0; i < eventType.length; i++) {
	            _CB2.default.CloudObject.on(tableName, eventType[i], cloudQuery, callback);
	            if (done && done.success) done.success();else def.resolve();
	        }
	    } else {
	        eventType = eventType.toLowerCase();
	        if (eventType === 'created' || eventType === 'updated' || eventType === 'deleted') {

	            var payload = {
	                room: (_CB2.default.appId + 'table' + tableName + eventType).toLowerCase(),
	                sessionId: _CB2.default._getSessionId()
	            };

	            _CB2.default.Socket.emit('join-object-channel', payload);
	            _CB2.default.Socket.on((_CB2.default.appId + 'table' + tableName + eventType).toLowerCase(), function (data) {
	                //listen to events in custom channel.
	                data = _CB2.default.fromJSON(data);
	                if (cloudQuery && cloudQuery instanceof _CB2.default.CloudQuery && _CB2.default.CloudObject._validateNotificationQuery(data, cloudQuery)) callback(data);else if (!cloudQuery) callback(data);
	            });

	            if (done && done.success) done.success();else def.resolve();
	        } else {
	            throw 'created, updated, deleted are supported notification types.';
	        }
	    }

	    if (!done) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.off = function (tableName, eventType, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    var def;

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    tableName = tableName.toLowerCase();

	    if (eventType instanceof Array) {
	        //if event type is an array.
	        for (var i = 0; i < eventType.length; i++) {
	            _CB2.default.CloudObject.off(tableName, eventType[i]);
	            if (done && done.success) done.success();else def.resolve();
	        }
	    } else {

	        eventType = eventType.toLowerCase();

	        if (eventType === 'created' || eventType === 'updated' || eventType === 'deleted') {
	            _CB2.default.Socket.emit('leave-object-channel', (_CB2.default.appId + 'table' + tableName + eventType).toLowerCase());
	            _CB2.default.Socket.removeAllListeners((_CB2.default.appId + 'table' + tableName + eventType).toLowerCase());
	            if (done && done.success) done.success();else def.resolve();
	        } else {
	            throw 'created, updated, deleted are supported notification types.';
	        }
	    }

	    if (!done) {
	        return def;
	    }
	};

	/* RealTime implementation ends here.  */

	_CB2.default.CloudObject.prototype.set = function (columnName, data) {
	    //for setting data for a particular column

	    var keywords = ['_tableName', '_type', 'operator'];

	    if (columnName === 'id' || columnName === '_id') throw "You cannot set the id of a CloudObject";

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (keywords.indexOf(columnName) > -1) {
	        throw columnName + " is a keyword. Please choose a different column name.";
	    }
	    this.document[columnName] = data;
	    _CB2.default._modified(this, columnName);
	};

	_CB2.default.CloudObject.prototype.relate = function (columnName, objectTableName, objectId) {
	    //for setting data for a particular column

	    var keywords = ['_tableName', '_type', 'operator'];

	    if (columnName === 'id' || columnName === '_id') throw "You cannot set the id of a CloudObject";

	    if (columnName === 'id') throw "You cannot link an object to this column";

	    if (keywords.indexOf(columnName) > -1) {
	        throw columnName + " is a keyword. Please choose a different column name.";
	    }

	    this.document[columnName] = new _CB2.default.CloudObject(objectTableName, objectId);
	    _CB2.default._modified(this, columnName);
	};

	_CB2.default.CloudObject.prototype.get = function (columnName) {
	    //for getting data of a particular column

	    if (columnName === 'id') columnName = '_' + columnName;

	    return this.document[columnName];
	};

	_CB2.default.CloudObject.prototype.unset = function (columnName) {
	    //to unset the data of the column
	    this.document[columnName] = null;
	    _CB2.default._modified(this, columnName);
	};

	/**
	 * Saved CloudObject in Database.
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudObject.prototype.save = function (callback) {
	    //save the document to the db
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var thisObj = this;
	    _CB2.default._fileCheck(this).then(function (thisObj) {

	        var xmlhttp = _CB2.default._loadXml();
	        var params = JSON.stringify({
	            document: _CB2.default.toJSON(thisObj),
	            key: _CB2.default.appKey
	        });
	        var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + thisObj.document._tableName;
	        _CB2.default._request('PUT', url, params).then(function (response) {
	            thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.prototype.fetch = function (callback) {
	    //fetch the document from the db
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.document._id) {
	        throw "Can't fetch an object which is not saved.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var query = null;
	    if (thisObj.document._type === 'file') {
	        query = new _CB2.default.CloudQuery('_File');
	    } else {
	        query = new _CB2.default.CloudQuery(thisObj.document._tableName);
	    }
	    query.findById(thisObj.get('id')).then(function (res) {
	        if (!callback) {
	            def.resolve(res);
	        } else {
	            callback.success(res);
	        }
	    }, function (err) {
	        if (!callback) {
	            def.reject(err);
	        } else {
	            callback.error(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.prototype.delete = function (callback) {
	    //delete an object matching the objectId
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.document._id) {
	        throw "You cannot delete an object which is not saved.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj),
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + thisObj.document._tableName;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.saveAll = function (array, callback) {

	    if (!array || array.constructor !== Array) {
	        throw "Array of CloudObjects is Null";
	    }

	    for (var i = 0; i < array.length; i++) {
	        if (!(array[i] instanceof _CB2.default.CloudObject)) {
	            throw "Should Be an Array of CloudObjects";
	        }
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    _CB2.default._bulkObjFileCheck(array).then(function () {
	        var xmlhttp = _CB2.default._loadXml();
	        var params = JSON.stringify({
	            document: _CB2.default.toJSON(array),
	            key: _CB2.default.appKey
	        });
	        var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + array[0]._tableName;
	        _CB2.default._request('PUT', url, params).then(function (response) {
	            var thisObj = _CB2.default.fromJSON(JSON.parse(response));
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.deleteAll = function (array, callback) {

	    if (!array && array.constructor !== Array) {
	        throw "Array of CloudObjects is Null";
	    }

	    for (var i = 0; i < array.length; i++) {
	        if (!(array[i] instanceof _CB2.default.CloudObject)) {
	            throw "Should Be an Array of CloudObjects";
	        }
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(array),
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });
	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + array[0]._tableName;
	    _CB2.default._request('PUT', url, params).then(function (response) {
	        var thisObj = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	/* Private Methods */
	_CB2.default.CloudObject._validateNotificationQuery = function (cloudObject, cloudQuery) {
	    //delete an object matching the objectId

	    if (!cloudQuery) throw "CloudQuery is null";

	    if (!cloudQuery.query) throw "There is no query in CloudQuery";

	    //validate query.
	    var query = cloudQuery.query;

	    if (cloudQuery.limit === 0) return false;

	    if (cloudQuery.skip > 0) {
	        --cloudQuery.skip;
	        return false;
	    }

	    //delete include
	    delete query.$include;

	    if (_CB2.default.CloudQuery._validateQuery(cloudObject, query)) {
	        //redice limit of CloudQuery.
	        --cloudQuery.limit;
	        return true;
	    } else {
	        return false;
	    }
	};

	exports.default = true;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudFiles
	 */

	_CB2.default.CloudFile = _CB2.default.CloudFile || function (file, data, type) {

	    if (Object.prototype.toString.call(file) === '[object File]' || Object.prototype.toString.call(file) === '[object Blob]') {

	        this.fileObj = file;
	        this.document = {
	            _id: null,
	            _type: 'file',
	            ACL: new _CB2.default.ACL(),
	            name: file && file.name && file.name !== "" ? file.name : 'unknown',
	            size: file.size,
	            url: null,
	            expires: null,
	            contentType: typeof file.type !== "undefined" && file.type !== "" ? file.type : 'unknown'
	        };
	    } else if (typeof file === "string") {
	        var regexp = RegExp("https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}");
	        if (regexp.test(file)) {
	            this.document = {
	                _id: null,
	                _type: 'file',
	                ACL: new _CB2.default.ACL(),
	                name: '',
	                size: '',
	                url: file,
	                expires: null,
	                contentType: ''
	            };
	        } else {
	            if (data) {
	                this.data = data;
	                if (!type) {
	                    type = file.split('.')[file.split('.').length - 1];
	                }
	                this.document = {
	                    _id: null,
	                    _type: 'file',
	                    ACL: new _CB2.default.ACL(),
	                    name: file,
	                    size: '',
	                    url: null,
	                    expires: null,
	                    contentType: type
	                };
	            } else {
	                this.document = {
	                    _id: file,
	                    _type: 'file'
	                };
	            }
	        }
	    }
	};

	_CB2.default.CloudFile.prototype = Object.create(_CB2.default.CloudObject.prototype);

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'type', {
	    get: function get() {
	        return this.document.contentType;
	    },
	    set: function set(type) {
	        this.document.contentType = type;
	    }
	});

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'url', {
	    get: function get() {
	        return this.document.url;
	    },
	    set: function set(url) {
	        this.document.url = url;
	    }
	});

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'size', {
	    get: function get() {
	        return this.document.size;
	    },
	    set: function set(size) {
	        this.document.size = size;
	    }
	});

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set(name) {
	        this.document.name = name;
	    }
	});

	/**
	 * Uploads File
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudFile.prototype.save = function (callback) {

	    var def;

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var thisObj = this;

	    if (!this.fileObj && !this.data) throw "You cannot save a file which is null";

	    if (!this.data) {
	        var params = new FormData();
	        params.append("fileToUpload", this.fileObj);
	        params.append("key", _CB2.default.appKey);
	        params.append("fileObj", JSON.stringify(_CB2.default.toJSON(thisObj)));
	        var url = _CB2.default.apiUrl + '/file/' + _CB2.default.appId;

	        var uploadProgressCallback = null;

	        if (callback && callback.uploadProgress) {
	            uploadProgressCallback = callback.uploadProgress;
	        }

	        _CB2.default._request('POST', url, params, false, true, uploadProgressCallback).then(function (response) {
	            thisObj.document = JSON.parse(response);
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    } else {
	        var data = this.data;
	        var params = JSON.stringify({
	            data: data,
	            fileObj: _CB2.default.toJSON(this),
	            key: _CB2.default.appKey
	        });
	        var url = _CB2.default.apiUrl + '/file/' + _CB2.default.appId;
	        var uploadProgressCallback = null;

	        if (callback && callback.uploadProgress) {
	            uploadProgressCallback = callback.uploadProgress;
	        }

	        _CB2.default._request('POST', url, params, null, null, uploadProgressCallback).then(function (response) {
	            thisObj.document = JSON.parse(response);
	            delete thisObj.data;
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    }

	    if (!callback) {
	        return def;
	    }
	};

	/**
	 * Removes a file from Database.
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudFile.prototype.delete = function (callback) {
	    var def;

	    if (!this.url) {
	        throw "You cannot delete a file which does not have an URL";
	    }
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var thisObj = this;

	    var params = JSON.stringify({
	        fileObj: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey,
	        method: "PUT"
	    });
	    var url = _CB2.default.apiUrl + '/file/' + _CB2.default.appId + '/' + this.document._id;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj.url = null;
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudFile.prototype.getFileContent = function (callback) {

	    var def;

	    if (!this.url) {
	        throw "URL is null. Fetch this file object first using fetch()";
	    }
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });
	    var url = this.url;

	    _CB2.default._request('GET', url, params).then(function (response) {
	        if (callback) {
	            callback.success(response);
	        } else {
	            def.resolve(response);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	CloudQueue
	 */

	_CB2.default.CloudQueue = function (queueName, queueType) {

	    if (typeof queueName === 'undefined' || queueName == null) {
	        throw "Cannot create a queue with empty name";
	    }

	    this.document = {};
	    this.document.ACL = new _CB2.default.ACL(); //ACL(s) of the document
	    this.document._type = 'queue';
	    this.document.expires = null;
	    this.document.name = queueName;
	    this.document.retry = null;
	    this.document.subscribers = [];
	    this.document.messages = [];

	    if (queueType && queueType !== "push" && queueType !== "pull") {
	        throw "Type can be push or pull";
	    }
	    if (queueType) {
	        this.document.queueType = queueType;
	    } else {
	        this.document.queueType = "pull";
	    }
	};

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'retry', {
	    get: function get() {
	        return this.document.retry;
	    },
	    set: function set(retry) {

	        if (this.queueType !== "push") {
	            throw "Queue Type should be push to set this property";
	        }

	        this.document.retry = retry;
	        _CB2.default._modified(this, 'retry');
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'size', {
	    get: function get() {
	        if (this.document.size) return this.document.size;else return 0;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'subscribers', {
	    get: function get() {
	        return this.document.subscribers;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'type', {
	    get: function get() {
	        return this.document.queueType;
	    },
	    set: function set(queueType) {
	        this.document.queueType = queueType;
	        _CB2.default._modified(this, 'queueType');
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'ACL', {
	    get: function get() {
	        return this.document.ACL;
	    },
	    set: function set(ACL) {
	        this.document.ACL = ACL;
	        _CB2.default._modified(this, 'ACL');
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'createdAt', {
	    get: function get() {
	        return this.document.createdAt;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'updatedAt', {
	    get: function get() {
	        return this.document.updatedAt;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'expires', {
	    get: function get() {
	        return this.document.expires;
	    },
	    set: function set(expires) {
	        this.document.expires = expires;
	        _CB2.default._modified(this, 'expires');
	    }
	});

	_CB2.default.CloudQueue.prototype.addMessage = function (queueMessage, callback) {

	    if (queueMessage == null) throw "Message cannot be null";

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var messages = [];

	    if (queueMessage.constructor !== Array) {
	        messages.push(queueMessage);
	    } else {
	        messages = queueMessage;
	    }

	    for (var i = 0; i < messages.length; i++) {
	        if (!(messages[i] instanceof _CB2.default.QueueMessage)) {
	            messages[i] = new _CB2.default.QueueMessage(messages[i]);
	        }
	    }

	    this.document.messages = messages;

	    //PUT TO SERVER.
	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/message';

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        var messages = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(messages);
	        } else {
	            def.resolve(messages);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.updateMessage = function (queueMessage, callback) {

	    if (queueMessage == null) throw "Message cannot be null";

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var messages = [];

	    if (queueMessage.constructor !== Array) {
	        if (!queueMessage.id) {
	            throw "Message cannot be updated because it has never been saved.";
	        } else {
	            messages.push(queueMessage);
	        }
	    } else {
	        messages = queueMessage;
	        for (var i = 0; i < messages.length; i++) {
	            if (!(messages[i] instanceof _CB2.default.QueueMessage)) {
	                throw "Message is not an instance of QueueMessage.";
	            }

	            if (!message[i].id) {
	                throw "Message cannot be updated because it has never been saved.";
	            }
	        }
	    }

	    return this.addMessage(queueMessage, callback);
	};

	_CB2.default.CloudQueue.prototype.getMessage = function (count, callback) {

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if ((typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object' && !callback) {
	        callback = count;
	        count = null;
	    }

	    if (!count) count = 1;

	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        count: count,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/getMessage';

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (!response || response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.getAllMessages = function (callback) {

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if ((typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object' && !callback) {
	        callback = count;
	        count = null;
	    }

	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/messages';

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (!response || response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.getMessageById = function (id, callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + this.document.name + '/message/' + id;

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (!response || response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.get = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.create = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj)
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/create';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.addSubscriber = function (url, callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var tempSubscribers = this.document.subscribers;

	    this.document.subscribers = [];

	    if (url.constructor === Array) {
	        for (var i = 0; i < url.length; i++) {
	            this.document.subscribers.push(url[i]);
	        }
	    } else {
	        this.document.subscribers.push(url);
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(this)
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/queue/' + _CB2.default.appId + '/' + thisObj.document.name + '/subscriber/';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        thisObj.document.subscribers = tempSubscribers;
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.removeSubscriber = function (url, callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var tempSubscribers = this.document.subscribers;

	    this.document.subscribers = [];

	    if (url.constructor === Array) {
	        for (var i = 0; i < url.length; i++) {
	            this.document.subscribers.push(url[i]);
	        }
	    } else {
	        this.document.subscribers.push(url);
	    }

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj),
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + '/queue/' + _CB2.default.appId + '/' + thisObj.document.name + '/subscriber/';

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        this.document.subscribers = tempSubscribers;
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.peekMessage = function (count, callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if ((typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object' && !callback) {
	        callback = count;
	        count = null;
	    }

	    if (!count) count = 1;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        count: count
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + this.document.name + '/peekMessage';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.delete = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(this),
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.clear = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(this),
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + "/clear";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.refreshMessageTimeout = function (id, timeout, callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (!id) throw "Message Id cannot be null";

	    if (id instanceof _CB2.default.QueueMessage) {
	        if (!id.id) {
	            throw "Queue Message should have an id.";
	        } else {
	            id = id.id;
	        }
	    }

	    if (!callback && (timeout.success || timeout.error)) {
	        callback = timeout;
	        timeout = null;
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        timeout: timeout
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + "/" + id + "/refresh-message-timeout";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.deleteMessage = function (id, callback) {
	    var def;

	    _CB2.default._validate();

	    if (!id || !(id instanceof _CB2.default.QueueMessage) && typeof id !== 'string') {
	        throw "Delete Message function should have id of the message or insance of QueueMessage as the first parameter. ";
	    }

	    if (id instanceof _CB2.default.QueueMessage) {
	        id = id.id;
	    }

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + "/message/" + id;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.update = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj)
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.getAll = function (callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/';

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.get = function (queueName, callback) {
	    var queue = new _CB2.default.CloudQueue(queueName);
	    return queue.get(callback);
	};

	_CB2.default.CloudQueue.delete = function (queueName, callback) {
	    var queue = new _CB2.default.CloudQueue(queueName);
	    return queue.delete(callback);
	};

	_CB2.default.QueueMessage = function (data) {

	    this.document = {};
	    this.document.ACL = new _CB2.default.ACL(); //ACL(s) of the document
	    this.document._type = 'queue-message';
	    this.document.expires = null;
	    this.document.timeout = 1800; //30 mins by default.
	    this.document.delay = null;
	    this.document.message = data;
	    this.document._id = null;
	    this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'expires', 'timeout', 'delay', 'message'];
	    this.document._isModified = true;
	};

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'message', {
	    get: function get() {
	        return this.document.message;
	    },
	    set: function set(message) {
	        this.document.message = message;
	        _CB2.default._modified(this, 'message');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'ACL', {
	    get: function get() {
	        return this.document.ACL;
	    },
	    set: function set(ACL) {
	        this.document.ACL = ACL;
	        _CB2.default._modified(this, 'ACL');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'createdAt', {
	    get: function get() {
	        return this.document.createdAt;
	    },
	    set: function set(createdAt) {
	        this.document.createdAt = createdAt;
	        _CB2.default._modified(this, 'createdAt');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'updatedAt', {
	    get: function get() {
	        return this.document.updatedAt;
	    },
	    set: function set(updatedAt) {
	        this.document.updatedAt = updatedAt;
	        _CB2.default._modified(this, 'updatedAt');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'expires', {
	    get: function get() {
	        return this.document.expires;
	    },
	    set: function set(expires) {
	        this.document.expires = expires;
	        _CB2.default._modified(this, 'expires');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'timeout', {
	    get: function get() {
	        return this.document.timeout;
	    },
	    set: function set(timeout) {
	        this.document.timeout = timeout;
	        _CB2.default._modified(this, 'timeout');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'delay', {
	    get: function get() {
	        if (this.document.delay) return this.document.delay / 1000;else return 0;
	    },
	    set: function set(delay) {
	        delay *= 1000; //converting to seconds from milli seconds,
	        this.document.delay = delay;
	        _CB2.default._modified(this, 'delay');
	    }
	});

	exports.default = true;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudRole
	 */
	_CB2.default.CloudRole = _CB2.default.CloudRole || function (roleName) {
	    //calling the constructor.
	    if (!this.document) this.document = {};
	    this.document._tableName = 'Role';
	    this.document._type = 'role';
	    this.document.name = roleName;
	    this.document.expires = null;
	    this.document.ACL = new _CB2.default.ACL();
	    this.document.expires = null;
	    this.document._isModified = true;
	    this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'name', 'expires'];
	};

	_CB2.default.CloudRole.prototype = Object.create(_CB2.default.CloudObject.prototype);

	Object.defineProperty(_CB2.default.CloudRole.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set(name) {
	        this.document.name = name;
	        _CB2.default._modified(this, name);
	    }
	});

	exports.default = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudUser
	 */
	_CB2.default.CloudUser = _CB2.default.CloudUser || function () {
	    if (!this.document) this.document = {};
	    this.document._tableName = 'User';
	    this.document.expires = null;
	    this.document._type = 'user';
	    this.document.expires = null;
	    this.document.ACL = new _CB2.default.ACL();
	    this.document._isModified = true;
	    this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'expires'];
	};

	//Description  : This function gets the current user from the server by taking the sessionId from querystring.
	//Params : 
	//returns : CloudUser object if the current user is still in session or null. 
	_CB2.default.CloudUser.getCurrentUser = function (callback) {

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //now call the signup API.
	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/currentUser";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var user = response;
	        if (response) {
	            try {
	                user = new _CB2.default.CloudUser();
	                _CB2.default.fromJSON(JSON.parse(response), user);
	                _CB2.default.CloudUser.current = user;
	                _CB2.default.CloudUser._setCurrentUser(user);
	            } catch (e) {}
	        }

	        if (callback) {
	            callback.success(user);
	        } else {
	            def.resolve(user);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	//Private Static fucntions

	//Description  : This function gets the current user from the cookie or from local storage.
	//Params : 
	//returns : CloudUser object if the current user is still in session or null. 
	_CB2.default.CloudUser._getCurrentUser = function () {
	    var content = _CB2.default._getCookie("CBCurrentUser");
	    if (content && content.length > 0) {
	        return _CB2.default.fromJSON(JSON.parse(content));
	    } else {
	        return null;
	    }
	};

	//Description  : This function saves the current user to the cookie or to local storage.
	//Params : @user - Instance of CB.CloudUser Object.
	//returns : void. 
	_CB2.default.CloudUser._setCurrentUser = function (user) {
	    //save the user to the cookie. 
	    if (!user) {
	        return;
	    }

	    //expiration time of 30 days.
	    _CB2.default._createCookie("CBCurrentUser", JSON.stringify(_CB2.default.toJSON(user)), 30 * 24 * 60 * 60 * 1000);
	};

	//Description  : This function saves the current user to the cookie or to local storage.
	//Params : @user - Instance of CB.CloudUser Object.
	//returns : void. 
	_CB2.default.CloudUser._removeCurrentUser = function () {
	    //save the user to the cookie. 
	    _CB2.default._deleteCookie("CBCurrentUser");
	};

	_CB2.default.CloudUser.resetPassword = function (email, callback) {

	    if (!email) {
	        throw "Email is required.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //now call the signup API.
	    var params = JSON.stringify({
	        email: email,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/resetPassword";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success();
	        } else {
	            def.resolve();
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype = Object.create(_CB2.default.CloudObject.prototype);

	Object.defineProperty(_CB2.default.CloudUser.prototype, 'username', {
	    get: function get() {
	        return this.document.username;
	    },
	    set: function set(username) {
	        this.document.username = username;
	        _CB2.default._modified(this, 'username');
	    }
	});
	Object.defineProperty(_CB2.default.CloudUser.prototype, 'password', {
	    get: function get() {
	        return this.document.password;
	    },
	    set: function set(password) {
	        this.document.password = password;
	        _CB2.default._modified(this, 'password');
	    }
	});
	Object.defineProperty(_CB2.default.CloudUser.prototype, 'email', {
	    get: function get() {
	        return this.document.email;
	    },
	    set: function set(email) {
	        this.document.email = email;
	        _CB2.default._modified(this, 'email');
	    }
	});

	_CB2.default.CloudUser.current = _CB2.default.CloudUser._getCurrentUser();

	_CB2.default.CloudUser.prototype.signUp = function (callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot signup the user on the server. Use CloudUser.save() instead.";
	    }

	    if (!this.document.username) {
	        throw "Username is not set.";
	    }
	    if (!this.document.password) {
	        throw "Password is not set.";
	    }
	    if (!this.document.email) {
	        throw "Email is not set.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the signup API.
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/signup";

	    _CB2.default._request('POST', url, params).then(function (user) {

	        var response = null;
	        if (user && user != "") {
	            _CB2.default.fromJSON(JSON.parse(user), thisObj);
	            _CB2.default.CloudUser.current = thisObj;
	            _CB2.default.CloudUser._setCurrentUser(thisObj);
	            response = thisObj;
	        }

	        if (callback) {
	            callback.success(response);
	        } else {
	            def.resolve(response);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype.changePassword = function (oldPassword, newPassword, callback) {

	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the signup API.
	    var params = JSON.stringify({
	        oldPassword: oldPassword,
	        newPassword: newPassword,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/changePassword";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype.logIn = function (callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot login the user on the server.";
	    }

	    if (!this.document.username) {
	        throw "Username is not set.";
	    }
	    if (!this.document.password) {
	        throw "Password is not set.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the signup API.
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/login";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        _CB2.default.CloudUser.current = thisObj;
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	        _CB2.default.CloudUser._setCurrentUser(thisObj);
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.authenticateWithProvider = function (dataJson, callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot login the user on the server.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (!dataJson) {
	        throw "data object is null.";
	    }

	    if (dataJson && !dataJson.provider) {
	        throw "provider is not set.";
	    }

	    if (dataJson && !dataJson.accessToken) {
	        throw "accessToken is not set.";
	    }

	    if (dataJson.provider.toLowerCase() === "twiter" && !dataJson.accessSecret) {
	        throw "accessSecret is required for provider twitter.";
	    }

	    var params = JSON.stringify({
	        provider: dataJson.provider,
	        accessToken: dataJson.accessToken,
	        accessSecret: dataJson.accessSecret,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/loginwithprovider";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var user = response;
	        if (response) {
	            try {
	                user = new _CB2.default.CloudUser();
	                _CB2.default.fromJSON(JSON.parse(response), user);
	                _CB2.default.CloudUser.current = user;
	                _CB2.default.CloudUser._setCurrentUser(user);
	            } catch (e) {}
	        }

	        if (callback) {
	            callback.success(user);
	        } else {
	            def.resolve(user);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype.logOut = function (callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot logOut the user on the server.";
	    }

	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the logout API.
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/logout";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        _CB2.default.CloudUser.current = null;
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	        _CB2.default.CloudUser._removeCurrentUser();
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};
	_CB2.default.CloudUser.prototype.addToRole = function (role, callback) {
	    if (!role) {
	        throw "Role is null";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //Call the addToRole API
	    var params = JSON.stringify({
	        user: _CB2.default.toJSON(thisObj),
	        role: _CB2.default.toJSON(role),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/addToRole";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};
	_CB2.default.CloudUser.prototype.isInRole = function (role) {
	    if (!role) {
	        throw "role is null";
	    }

	    var roleArray = this.get('roles');
	    var userRoleIds = [];

	    if (roleArray && roleArray.length > 0) {
	        for (var i = 0; i < roleArray.length; ++i) {
	            userRoleIds.push(roleArray[i].document._id);
	        }
	    }

	    return userRoleIds.indexOf(role.document._id) >= 0;
	};

	_CB2.default.CloudUser.prototype.removeFromRole = function (role, callback) {
	    if (!role) {
	        throw "Role is null";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the removeFromRole API.
	    var params = JSON.stringify({
	        user: _CB2.default.toJSON(thisObj),
	        role: _CB2.default.toJSON(role),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/removeFromRole";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudCache
	 */

	_CB2.default.CloudCache = function (cacheName) {
	    if (typeof cacheName === 'undefined' || cacheName === null || cacheName === '') {
	        throw "Cannot create a cache with empty name";
	    }
	    this.document = {};
	    this.document._tableName = "cache";
	    this.document.name = cacheName;
	    this.document.size = "";
	    this.document.items = [];
	};

	Object.defineProperty(_CB2.default.CloudCache.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    }
	});

	Object.defineProperty(_CB2.default.CloudCache.prototype, 'size', {
	    get: function get() {
	        return this.document.size;
	    }
	});

	Object.defineProperty(_CB2.default.CloudCache.prototype, 'items', {
	    get: function get() {
	        return this.document.items;
	    }
	});

	_CB2.default.CloudCache.prototype.set = function (key, value, callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (typeof value === 'undefined') {
	        throw "Value cannot be undefined.";
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        item: value
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/' + key;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }

	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.deleteItem = function (key, callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/item/' + key;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }

	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.create = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/create';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.get = function (key, callback) {

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/' + key + '/item';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.getInfo = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name;
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.getItemsCount = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/items/count';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.getAll = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/items';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);

	        thisObj.document.items = obj;

	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.clear = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/clear/items';
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.delete = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.getAll = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId;
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.deleteAll = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ }
/******/ ])
});
;