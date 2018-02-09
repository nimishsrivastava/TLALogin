import React from 'react';
import renderer from 'react-test-renderer';
import TabNav from '../TabNav';

it('renders correctly', () => {
    const tree = renderer
        .create(<TabNav page="Validation">TLA</TabNav>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
