import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import DeviceListItem from './devicelistitem';

const mockStore = configureStore([thunk]);

describe('DeviceListItem Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      users: { globalSettings: { id_attribute: 'Device ID' } }
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DeviceListItem device={{ id: 1 }} columnHeaders={[{ render: item => item }]} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
