import CanReact from 'can-react/can-react';
import Map from 'can/map/';
import 'can/map/define/';
import './<%= name %>.less!';
import renderer from './<%= name %>.jsx';

/**
 * @module <%= className %>VM
 * @parent <%= className %>
 *
 * <%= className %> View Model
 */
export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the <%= tag %> component'
    }
  }
});

/**
 * @module <%= className %>
 * @parent components
 *
 * <%= className %> Description
 */
export default CanReact.createClass({
  name: '<%= className %>',
  ViewModel,
  render() {
    return renderer(this);
  }
});
