'use strict';

var React = require('react');
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = require('birchpress');

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.subscriptions.components.common.Radio', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function(component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    desc: React.PropTypes.string,
    checked: React.PropTypes.bool,
    value: React.PropTypes.number,
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  handleChange: function(component, event) {
    component.props.value = event.target.value;
    return component.props.onChange(event);
  },

  render: function(component) {
    return (
      <div>
        <input
               type="radio"
               name={ component.props.name }
               defaultValue={ component.props.value }
               checked={ component.props.checked }
               className={ component.props.className }
               id={ component.props.id }
               onChange={ component.handleChange } />
        <label>
          { component.props.desc }
        </label>
        <br />
      </div>
      );
  }
});

module.exports = clazz;