'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var assign = require('object-assign');

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
var mapStateVModel = function mapStateVModel(namespace, names) {
  return (Array.isArray(names) ? names : [names]).map(function (name) {
    return mapState(namespace, name);
  }).reduce(function (target, attr) {
    return assign(target, attr);
  }, {});
};

var createSetters = function createSetters(state) {
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

var MapStateVModel = {
  mapStateVModel: mapStateVModel,
  createSetters: createSetters
};