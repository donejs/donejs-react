import Map from 'can/map/';
import 'can/map/define/';

/**
 * @module <%= className %>VM
 * @parent Component
 *
 * <%= className %> View Model
 */
export default Map.extend({
  define: {
    /**
     * @property {String} message
     *
     * A placeholder view model property.
     */
    message: {
      value: 'This is the <%= className %> component.'
    }
  }
});
