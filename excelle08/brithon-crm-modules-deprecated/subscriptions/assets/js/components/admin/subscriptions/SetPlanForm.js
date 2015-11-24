'use strict';

var React = require('react');
var ImmutableRenderMixin = require('react-immutable-render-mixin');
var birchpress = require('birchpress');

var ReactMixinCompositor = birchpress.react.MixinCompositor;

var clazz = birchpress.provide('brithoncrm.subscriptions.components.admin.subscriptions.SetPlanForm', {

  __mixins__: [ReactMixinCompositor],

  getReactMixins: function(component) {
    return [ImmutableRenderMixin];
  },

  propTypes: {
    plansFetcher: React.PropTypes.func,
    currentPlanDesc: React.PropTypes.string,
    currentPlanMeta: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    radioClassName: React.PropTypes.string,
    radioId: React.PropTypes.string,
    radioOnClick: React.PropTypes.func,
    radioOnChange: React.PropTypes.func,
    onSubmitClick: React.PropTypes.func,
    shown: React.PropTypes.bool,
    handleSwitch: React.PropTypes.func
  },

  handleClick: function(component) {
    return component.props.handleSwitch(component, 'SetPlanForm');
  },

  handleChange: function(component, event) {
    component.props.value = event.target.value;
    return component.props.radioOnChange(component, event);
  },

  renderLayer: function(component) {
    var Radio = require('brithoncrm/subscriptions/components/common/Radio');
    var Button = require('brithoncrm/subscriptions/components/common/Button');

    var formRows = [];
    var allPlans = component.props.plansFetcher();
    var inProgressMessage = null;

    if (component.props.inProcess === undefined && !component.props.shown) {
      return <span />;
    }

    if (!allPlans) {
      return (<p>
                { component.__('Please wait while plans list is loading...') }
              </p>);
    }

    if (component.props.inProcess === undefined) {
      inProgressMessage = '';
    } else if (component.props.inProcess === false) {
      component.props.inProcess = undefined;
      inProgressMessage = '';
    } else {
      inProgressMessage = component.__('Processing...');
    }

    for (var key in allPlans) {
      var selected = false;
      if (allPlans[key].id === component.props.value) {
        selected = true;
      }
      formRows.push(
        <p>
          <Radio
                 desc={ component.__(allPlans[key].desc) }
                 value={ allPlans[key].id }
                 name={ component.props.name }
                 id={ component.props.radioId }
                 checked={ selected }
                 className={ component.props.radioClassName }
                 onChange={ component.handleChange } />
        </p>
      );
    }

    return (
      <div>
        <h4>{ component.__('Choose plan') }</h4>
        { formRows }
        <Button
                type=""
                text={ component.__('Update') }
                onClick={ component.props.onSubmitClick } />&nbsp;
        { inProgressMessage }&nbsp;
        <a href="javascript:;" onClick={ component.handleClick }>
          { component.__('Hide') }
        </a>
      </div>
      );
  },

  render: function(component) {
    var PlanLabel = require('brithoncrm/subscriptions/components/common/PlanLabel');
    var setPlanForm = component.renderLayer();

    return (
      <div id="set-plan-form">
        <PlanLabel
                   description={ component.props.currentPlanDesc }
                   metainfo={ component.props.currentPlanMeta }
                   __={ component.__ } />
        <a
           id="set-plan-link"
           href="javascript:;"
           onClick={ component.handleClick }>
          { component.__('See plans and upgrade or downgrade') }
        </a>
        { setPlanForm }
      </div>
      );
  },

  __: function(component, string) {
    return component.props.__(string);
  }
});

module.exports = clazz;
