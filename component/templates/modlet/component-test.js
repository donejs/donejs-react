import QUnit from 'steal-qunit';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import <%= className %>, { ViewModel } from './<%= name %>';

QUnit.module('<%= module %>');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the <%= name %> component');
});

QUnit.test('Renders message', () => {
  const testInstance = ReactTestUtils.renderIntoDocument( <<%= className %> /> );
  const divComponent = ReactTestUtils.findRenderedDOMComponentWithTag( testInstance, 'div' );

  QUnit.equal(divComponent.innerText, 'This is the <%= name %> component');
});
