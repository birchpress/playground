'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = require('birchpress');

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.todomvc.components.MainSection', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function(component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  render: function(component) {
    var TodoItem = require('brithoncrm/todomvc/components/common/todoitem');
    var allTodos = component.props.allTodos.toJS();

    if (Object.keys(allTodos).length < 1) {
      return null;
    }

    var todos = [];

    for (var key in allTodos) {
      var todo = component.props.allTodos.get(key);
      todos.push(
        <TodoItem
                  key={ key }
                  onToggleComplete={ component.props.onToggleComplete }
                  onUpdate={ component.props.onUpdateItem }
                  onDestroy={ component.props.onDestroyItem }
                  todo={ todo } />);
    }

    return (
      <section id="main">
        <input
               id="toggle-all"
               type="checkbox"
               onChange={ component.props.onToggleCompleteAll }
               checked={ component.props.areAllComplete ? 'checked' : '' } />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul id="todo-list">
          { todos }
        </ul>
      </section>
      );
  }
});

module.exports = clazz;

