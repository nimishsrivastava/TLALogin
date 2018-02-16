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

it('should call logout function', ()=>{
    let profileComponent = renderer.create(<Profile/>).getInstance()
    profileComponent.logout();
})

it('should call proceed logout function if connected', ()=>{
    let profileComponent = renderer.create(<Profile/>).getInstance()
    profileComponent.proceedLogout(true);
})

it('should call proceed logout function if not connected', ()=>{
    let profileComponent = renderer.create(<Profile/>).getInstance()
    profileComponent.proceedLogout(false);
})