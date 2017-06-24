import CanReact from 'can-react/';
import DefineMap from 'can-define/map/';
import './<%= name %>.less!';
import renderer from './<%= name %>.jsx';

/**
 * @module <%= className %>VM
 * @parent <%= className %>
 *
 * <%= className %> View Model
 */
export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the <%= name %> component'
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
