import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../Profile';
import {findById} from "../functions/findByID";

it('renders correctly', () => {
    const tree = renderer
        .create(<Profile page="Validation">TLA</Profile>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render logout button', () => {
    const tree = renderer
        .create(<Profile page="Movies">TLA</Profile>)
        .toJSON();
    expect(findById(tree, 'logoutButton')).toBeDefined()
})