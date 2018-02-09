import React from 'react';
import renderer from 'react-test-renderer';
import index from '../index';

it('renders correctly', () => {
    const tree = renderer
        .create(<index page="Validation">TLA</index>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
