import CanReact from 'can-react/can-react';
import ViewModel from '.viewmodel';
import renderer from './<%= name %>.jsx';
import './<%= name %>.scss';

/**
 * @module <%= name %>
 * @parent components
 *
 * <%= name %> Description
 */
export default CanReact.createClass({
  name: '<%= name %>',
  ViewModel,
  template: renderer
});
