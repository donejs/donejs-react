import CanReact from 'can-react/can-react';
import ViewModel from './viewmodel';
import renderer from './<%= name %>.jsx';
import './<%= name %>.scss';

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
