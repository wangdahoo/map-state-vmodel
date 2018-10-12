(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MapStateVModel = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSetters = exports.mapStateVModel = undefined;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// someName => setSomeName
var setterName = function setterName(name) {
  return 'set' + name[0].toUpperCase() + name.slice(1);
};

var mapState = function mapState(namespace, name) {
  return _defineProperty({}, name, {
    get: function get() {
      return namespace.split('/').reduce(function (result, name) {
        return result && result[name];
      }, this.$store.state)[name];
    },
    set: function set(val) {
      this.$store.commit(namespace + '/' + setterName(name), val);
    }
  });
};

/**
 * mapState for v-model
 * @param {string} namespace 
 * @param {string} name 
 */
var mapStateVModel = exports.mapStateVModel = function mapStateVModel(namespace, names) {
  return (Array.isArray(names) ? names : [names]).map(function (name) {
    return mapState(namespace, name);
  }).reduce(function (target, attr) {
    return (0, _objectAssign2.default)(target, attr);
  }, {});
};

var createSetters = exports.createSetters = function createSetters(state) {
  var setters = {};

  var _loop = function _loop(i) {
    setters[setterName(i)] = function (state, val) {
      state[i] = val;
    };
  };

  for (var i in state) {
    _loop(i);
  }

  return setters;
};

},{"object-assign":1}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMxRkE7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNLGFBQWEsU0FBYixVQUFhO0FBQUEsU0FBUSxRQUFRLEtBQUssQ0FBTCxFQUFRLFdBQVIsRUFBUixHQUFnQyxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQXhDO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLFNBQUQsRUFBWSxJQUFaO0FBQUEsNkJBQ2QsSUFEYyxFQUNQO0FBQ04sT0FETSxpQkFDQztBQUNMLGFBQU8sVUFBVSxLQUFWLENBQWdCLEdBQWhCLEVBQXFCLE1BQXJCLENBQTRCLFVBQUMsTUFBRCxFQUFTLElBQVQsRUFBa0I7QUFDbkQsZUFBTyxVQUFVLE9BQU8sSUFBUCxDQUFqQjtBQUNELE9BRk0sRUFFSixLQUFLLE1BQUwsQ0FBWSxLQUZSLEVBRWUsSUFGZixDQUFQO0FBR0QsS0FMSztBQU9OLE9BUE0sZUFPRCxHQVBDLEVBT0k7QUFDUixXQUFLLE1BQUwsQ0FBWSxNQUFaLENBQXNCLFNBQXRCLFNBQW1DLFdBQVcsSUFBWCxDQUFuQyxFQUF1RCxHQUF2RDtBQUNEO0FBVEssR0FETztBQUFBLENBQWpCOztBQWNBOzs7OztBQUtPLElBQU0sMENBQWlCLFNBQWpCLGNBQWlCLENBQUMsU0FBRCxFQUFZLEtBQVosRUFBc0I7QUFDbEQsU0FBTyxDQUFDLE1BQU0sT0FBTixDQUFjLEtBQWQsSUFBdUIsS0FBdkIsR0FBK0IsQ0FBQyxLQUFELENBQWhDLEVBQ0osR0FESSxDQUNBO0FBQUEsV0FBUSxTQUFTLFNBQVQsRUFBb0IsSUFBcEIsQ0FBUjtBQUFBLEdBREEsRUFFSixNQUZJLENBRUcsVUFBQyxNQUFELEVBQVMsSUFBVDtBQUFBLFdBQWtCLDRCQUFPLE1BQVAsRUFBZSxJQUFmLENBQWxCO0FBQUEsR0FGSCxFQUUyQyxFQUYzQyxDQUFQO0FBR0QsQ0FKTTs7QUFNQSxJQUFNLHdDQUFnQixTQUFoQixhQUFnQixRQUFTO0FBQ3BDLE1BQU0sVUFBVSxFQUFoQjs7QUFEb0MsNkJBRTNCLENBRjJCO0FBR2xDLFlBQVEsV0FBVyxDQUFYLENBQVIsSUFBeUIsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFnQjtBQUN2QyxZQUFNLENBQU4sSUFBVyxHQUFYO0FBQ0QsS0FGRDtBQUhrQzs7QUFFcEMsT0FBSyxJQUFJLENBQVQsSUFBYyxLQUFkLEVBQXFCO0FBQUEsVUFBWixDQUFZO0FBSXBCOztBQUVELFNBQU8sT0FBUDtBQUNELENBVE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJ1xuXG4vLyBzb21lTmFtZSA9PiBzZXRTb21lTmFtZVxuY29uc3Qgc2V0dGVyTmFtZSA9IG5hbWUgPT4gJ3NldCcgKyBuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpXG5cbmNvbnN0IG1hcFN0YXRlID0gKG5hbWVzcGFjZSwgbmFtZSkgPT4gKHtcbiAgW25hbWVdOiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBuYW1lc3BhY2Uuc3BsaXQoJy8nKS5yZWR1Y2UoKHJlc3VsdCwgbmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdFtuYW1lXVxuICAgICAgfSwgdGhpcy4kc3RvcmUuc3RhdGUpW25hbWVdXG4gICAgfSxcblxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLiRzdG9yZS5jb21taXQoYCR7bmFtZXNwYWNlfS8ke3NldHRlck5hbWUobmFtZSl9YCwgdmFsKVxuICAgIH1cbiAgfVxufSlcblxuLyoqXG4gKiBtYXBTdGF0ZSBmb3Igdi1tb2RlbFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSBcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICovXG5leHBvcnQgY29uc3QgbWFwU3RhdGVWTW9kZWwgPSAobmFtZXNwYWNlLCBuYW1lcykgPT4ge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkobmFtZXMpID8gbmFtZXMgOiBbbmFtZXNdKVxuICAgIC5tYXAobmFtZSA9PiBtYXBTdGF0ZShuYW1lc3BhY2UsIG5hbWUpKVxuICAgIC5yZWR1Y2UoKHRhcmdldCwgYXR0cikgPT4gYXNzaWduKHRhcmdldCwgYXR0ciksIHt9KVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlU2V0dGVycyA9IHN0YXRlID0+IHtcbiAgY29uc3Qgc2V0dGVycyA9IHt9XG4gIGZvciAobGV0IGkgaW4gc3RhdGUpIHtcbiAgICBzZXR0ZXJzW3NldHRlck5hbWUoaSldID0gKHN0YXRlLCB2YWwpID0+IHtcbiAgICAgIHN0YXRlW2ldID0gdmFsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNldHRlcnNcbn1cbiJdfQ==
