import ViewModel from './viewmodel'; 
import QUnit from 'steal-qunit';

QUnit.module('<%= name %> view model');

QUnit.test('message', function(assert) {
  let vm = new ViewModel();

  assert.equal(vm.attr('message'), 'forgotten placeholder?');
});
