import Map from 'can/map/';
import 'can/map/define/';

/**
 * @module <%= name %>VM
 * @parent Component
 *
 * <%= name %> View Model
 */
export default Map.extend({
  define: {
    /**
     * @property {String} message
     *
     * A placeholder view model property.
     */
    message: {
      value: 'This is the <%= name %> component.'
    }
  }
});
