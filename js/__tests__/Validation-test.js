import React from 'react';
import renderer from 'react-test-renderer';
import Validation from '../Validation';
import {findById} from '../functions/findByID';

it('renders correctly', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render username input', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'username')).toBeDefined()
})

it('should render password input', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'password')).toBeDefined()
})

it('should render logo image', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'logo')).toBeDefined()
})

it('should render login button', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'loginButton')).toBeDefined()
})

it('should change the username value', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance()

    loginComponent.handleUsernameChange('hellogmail.com')

    expect(loginComponent.state.uid).toEqual('hellogmail.com')
})

it('should change the password value', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance()

    loginComponent.handlePasswordChange('password')

    expect(loginComponent.state.pwd).toEqual('password')
})

it('login function', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance()
    loginComponent.login();
})

it('show message on connection turn on', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance()
    loginComponent.showMessage(true);
})
it('show message on connection turn off', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance()
    loginComponent.showMessage(false);
})

