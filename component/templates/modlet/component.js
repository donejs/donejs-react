import DefineMap from 'can-define/map/';
import Component from 'react-view-model/component';
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
export default class <%= className %> extends Component {
  render() {
    return renderer(this);
  }
}

<%= className %>.ViewModel = ViewModel;
