(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Immutable = (typeof window !== "undefined" ? window['Immutable'] : typeof global !== "undefined" ? global['Immutable'] : null);

var TodoStore = require("./../../../../../modules/todomvc/assets/js/stores/todostore");

var todoAppComponent;

var ns = birchpress.provide('brithoncrm.todomvc.apps', {

  __init__: function () {
    birchpress.addAction('brithoncrm.todomvc.apps.initModuleAfter', ns.run);
  },

  initModule: function () {
    birchpress.initNamespace(brithoncrm.todomvc);
  },

  run: function () {
    var TodoApp = require("./../../../../../modules/todomvc/assets/js/components/admin/todomvc/todoapp");
    var todos = Immutable.fromJS({});
    if (!todoAppComponent) {
      var store = TodoStore(todos);
      todoAppComponent = React.render(React.createElement(TodoApp, {
        store: store,
        cursor: store.getCursor()
      }), document.getElementById('todoapp'));
      store._component = todoAppComponent;
      store.addAction('onChangeAfter', function () {
        todoAppComponent.setProps({
          store: store,
          cursor: store.getCursor()
        });
      });
    }
  }
});
birchpress.addAction('birchpress.initFrameworkAfter', ns.initModule);
module.exports = ns;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../../../modules/todomvc/assets/js/components/admin/todomvc/todoapp":2,"./../../../../../modules/todomvc/assets/js/stores/todostore":8}],2:[function(require,module,exports){
(function (global){
'use react';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.todomvc.components.TodoApp', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function (component) {
    return [ImmutableRenderMixin];
  },

  render: function (component) {
    var Footer = require("./../../../../../../../modules/todomvc/assets/js/components/common/footer");
    var Header = require("./../../../../../../../modules/todomvc/assets/js/components/common/header");
    var MainSection = require("./../../../../../../../modules/todomvc/assets/js/components/common/mainsection");

    var store = component.props.store;

    return React.createElement('div', null, React.createElement(Header, { onSaveText: component.create }), React.createElement(MainSection, {
      allTodos: store.getAll(),
      areAllComplete: store.areAllComplete(),
      onToggleCompleteAll: component.toggleCompleteAll,
      onToggleComplete: component.toggleComplete,
      onUpdateItem: component.updateItem,
      onDestroyItem: component.destroyItem }), React.createElement(Footer, { allTodos: store.getAll(), onClearCompletedClick: component.clearCompleted }));
  },

  destroyItem: function (component, id) {
    var store = component.props.store;
    store.destroy(id);
  },

  updateItem: function (component, id, text) {
    var store = component.props.store;
    text = text.trim();
    if (text !== '') {
      store.update(id, {
        text: text
      });
    }
  },

  toggleComplete: function (component, todo) {
    var store = component.props.store;
    var id = todo.id;
    if (todo.complete) {
      store.update(id, {
        complete: false
      });
    } else {
      store.update(id, {
        complete: true
      });
    }
  },

  toggleCompleteAll: function (component) {
    var store = component.props.store;
    if (store.areAllComplete()) {
      store.updateAll({
        complete: false
      });
    } else {
      store.updateAll({
        complete: true
      });
    }
  },

  create: function (component, text) {
    var store = component.props.store;
    if (text.trim()) {
      store.create(text);
    }
  },

  clearCompleted: function (component) {
    var store = component.props.store;
    store.destroyCompleted();
  }
});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../../../../../modules/todomvc/assets/js/components/common/footer":3,"./../../../../../../../modules/todomvc/assets/js/components/common/header":4,"./../../../../../../../modules/todomvc/assets/js/components/common/mainsection":5,"react-immutable-render-mixin":10}],3:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactPropTypes = React.PropTypes;
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.todomvc.components.Footer', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function (component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  render: function (component) {
    var allTodos = component.props.allTodos.toJS();
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    var clearCompletedButton;
    if (completed) {
      clearCompletedButton = React.createElement('button', { id: 'clear-completed', onClick: component.props.onClearCompletedClick }, 'Clear completed(', completed, ')');
    }

    return React.createElement('footer', { id: 'footer' }, React.createElement('span', { id: 'todo-count' }, React.createElement('strong', null, itemsLeft), ' ', itemsLeftPhrase), clearCompletedButton);
  }

});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"react-immutable-render-mixin":10}],4:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.todomvc.components.Header', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function (component) {
    return [ImmutableRenderMixin];
  },

  render: function (component) {
    var TodoTextInput = require("./../../../../../../modules/todomvc/assets/js/components/common/todotextinput");
    return React.createElement('header', { id: 'header' }, React.createElement('h1', null, 'todos'), React.createElement(TodoTextInput, {
      id: 'new-todo',
      placeholder: 'What needs to be done?',
      onSave: component.props.onSaveText }));
  }
});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../../../../modules/todomvc/assets/js/components/common/todotextinput":7,"react-immutable-render-mixin":10}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactPropTypes = React.PropTypes;
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.todomvc.components.MainSection', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function (component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  render: function (component) {
    var TodoItem = require("./../../../../../../modules/todomvc/assets/js/components/common/todoitem");
    var allTodos = component.props.allTodos.toJS();

    if (Object.keys(allTodos).length < 1) {
      return null;
    }

    var todos = [];

    for (var key in allTodos) {
      var todo = component.props.allTodos.get(key);
      todos.push(React.createElement(TodoItem, {
        key: key,
        onToggleComplete: component.props.onToggleComplete,
        onUpdate: component.props.onUpdateItem,
        onDestroy: component.props.onDestroyItem,
        todo: todo }));
    }

    return React.createElement('section', { id: 'main' }, React.createElement('input', {
      id: 'toggle-all',
      type: 'checkbox',
      onChange: component.props.onToggleCompleteAll,
      checked: component.props.areAllComplete ? 'checked' : '' }), React.createElement('label', { htmlFor: 'toggle-all' }, 'Mark all as complete'), React.createElement('ul', { id: 'todo-list' }, todos));
  }
});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../../../../modules/todomvc/assets/js/components/common/todoitem":6,"react-immutable-render-mixin":10}],6:[function(require,module,exports){
(function (global){
'use react';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactPropTypes = React.PropTypes;
// never used
// var Immutable = require('immutable');
// var Cursor = require('immutable/contrib/cursor');
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var classNames = require('classnames');
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.todomvc.components.TodoItem', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function (component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function (component) {
    return {
      'isEditing': false
    };
  },

  render: function (component) {
    var TodoTextInput = require("./../../../../../../modules/todomvc/assets/js/components/common/todotextinput");
    var todo = component.props.todo.toJS();

    var input;
    if (component.state.isEditing) {
      input = React.createElement(TodoTextInput, {
        className: 'edit',
        onSave: component.onSave,
        value: todo.text });
    }

    return React.createElement('li', { className: classNames({ 'completed': todo.complete, 'editing': component.state.isEditing }), key: todo.id }, React.createElement('div', { className: 'view' }, React.createElement('input', {
      className: 'toggle',
      type: 'checkbox',
      checked: todo.complete,
      onChange: component.onTextChange }), React.createElement('label', { onDoubleClick: component.onDoubleClick }, todo.text), React.createElement('button', { className: 'destroy', onClick: component.onDestroyClick })), input);
  },

  onTextChange: function (component) {
    component.props.onToggleComplete(component.props.todo.toJS());
  },

  onDoubleClick: function (component) {
    component.setState({
      isEditing: true
    });
  },

  onSave: function (component, text) {
    component.props.onUpdate(component.props.todo.toJS().id, text);
    component.setState({
      isEditing: false
    });
  },

  onDestroyClick: function (component) {
    component.props.onDestroy(component.props.todo.toJS().id);
  }

});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../../../../modules/todomvc/assets/js/components/common/todotextinput":7,"classnames":9,"react-immutable-render-mixin":10}],7:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactPropTypes = React.PropTypes;
// never used
// var Immutable = require('immutable');
// var Cursor = require('immutable/contrib/cursor');
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var ENTER_KEY_CODE = 13;

var clazz = birchpress.provide('brithoncrm.todomvc.components.TodoTextInput', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function (component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function (component) {
    return {
      value: component.props.value || ''
    };
  },

  render: function (component) {
    return React.createElement('input', {
      className: component.props.className,
      id: component.props.id,
      placeholder: component.props.placeholder,
      onBlur: component.onBlur,
      onChange: component.onChange,
      onKeyDown: component.onKeyDown,
      value: component.state.value,
      autoFocus: true });
  },

  onBlur: function (component) {
    component.save();
  },

  onChange: function (component, event) {
    component.setState({
      value: event.target.value
    });
  },

  save: function (component) {
    component.props.onSave(component.state.value);
    component.setState({
      value: ''
    });
  },

  onKeyDown: function (component, event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      component.save();
    }
  }

});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"react-immutable-render-mixin":10}],8:[function(require,module,exports){
(function (global){
'use strict';

var Immutable = (typeof window !== "undefined" ? window['Immutable'] : typeof global !== "undefined" ? global['Immutable'] : null);
var birchpress = (typeof window !== "undefined" ? window['birchpress'] : typeof global !== "undefined" ? global['birchpress'] : null);
var ImmutableStore = birchpress.stores.ImmutableStore;

var clazz = birchpress.provide('brithoncrm.todomvc.stores.TodoStore', {

  __construct__: function (self, todos) {
    var immutableStore = ImmutableStore(Immutable.fromJS(todos));

    immutableStore.addAction('onChangeAfter', function () {
      self.onChange();
    });
    self._immutableStore = immutableStore;
  },

  onChange: function (self) {},

  getCursor: function (self) {
    return self._immutableStore.getCursor();
  },

  /**
   * Create a TODO item.
   * @param  {string} text The content of the TODO
   */
  create: function (self, text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var todo = Immutable.Map({
      id: id,
      complete: false,
      text: text
    });
    self.getCursor().set(id, todo);
  },

  /**
   * Update a TODO item.
   * @param  {string} id
   * @param {object} updates An object literal containing only the data to be
   *     updated.
   */
  update: function (self, id, updates) {
    var todo = self.getCursor().get(id);
    if (!Immutable.Map.isMap(updates)) {
      updates = Immutable.fromJS(updates);
    }
    todo.merge(updates);
  },

  /**
   * Update all of the TODO items with the same object.
   *     the data to be updated.  Used to mark all TODOs as completed.
   * @param  {object} updates An object literal containing only the data to be
   *     updated.
    */
  updateAll: function (self, updates) {
    self.getCursor().valueOf().forEach(function (value, key) {
      self.update(key, updates);
    });
  },

  /**
   * Delete a TODO item.
   * @param  {string} id
   */
  destroy: function (self, id) {
    self.getCursor().delete(id);
  },

  /**
   * Delete all the completed TODO items.
   */
  destroyCompleted: function (self) {
    self.getCursor().valueOf().forEach(function (value, key) {
      if (value.get('complete', false)) {
        self.destroy(key);
      }
    });
  },

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function (self) {
    var allComplete = true;
    self.getCursor().valueOf().forEach(function (value, key) {
      if (!value.get('complete', false)) {
        allComplete = false;
        return false;
      }
    });
    return allComplete;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function (self) {
    return self.getCursor().deref();
  }

});

module.exports = clazz;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes += ' ' + arg;
			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],10:[function(require,module,exports){

"use strict";

var shallowEqualImmutable = require('./shallowEqualImmutable');

var ImmutableRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return !shallowEqualImmutable(this.props, nextProps) ||
           !shallowEqualImmutable(this.state, nextState);
  }
};

module.exports = ImmutableRenderMixin;

},{"./shallowEqualImmutable":11}],11:[function(require,module,exports){
(function (global){
var Immutable = (typeof window !== "undefined" ? window['Immutable'] : typeof global !== "undefined" ? global['Immutable'] : null);

var is = Immutable.is.bind(Immutable);

function shallowEqualImmutable(objA, objB) {
  if (objA === objB || is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }
  
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqualImmutable;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])


//# sourceMappingURL=index.bundle.js.map
