import React from 'react';
import renderer from 'react-test-renderer';
import Validation from '../Validation';
import {findById} from '../functions/findByID';
import handleLogin from "../functions/handleLogin";
import asyncSetItem from "../functions/asyncSetItem";
import asyncGetItem from "../functions/asyncGetItem";
import MockAsyncStorage from "mock-async-storage";

import {AsyncStorage as storage} from "react-native";
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
});

// it('should run onChangeText function on giving username input', () => {
//     const tree = renderer
//         .create(<Validation page="Validation">TLA</Validation>)
//         .toJSON();
//
//     let uName= findById(tree, 'username')
//     expect((pwd) => this.handlePasswordChange(pwd)).toBeCalledWith(uName.props.onChangeText)
// });

it('should render password input', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'password')).toBeDefined()
});

it('should render logo image', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'logo')).toBeDefined()
});

it('should render login button', () => {
    const tree = renderer
        .create(<Validation page="Validation">TLA</Validation>)
        .toJSON();

    expect(findById(tree, 'loginButton')).toBeDefined()
});

it('should change the username value', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();

    loginComponent.handleUsernameChange('hellogmail.com');

    expect(loginComponent.state.uid).toEqual('hellogmail.com')
});

it('should change the password value', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();

    loginComponent.handlePasswordChange('password');

    expect(loginComponent.state.pwd).toEqual('password')
});


it('show message on connection turn on', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();
    loginComponent.showMessage(true);
});

it('show message on connection turn off', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();
    loginComponent.showMessage(false);
});

it('login function', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();
    loginComponent.login();
});

it('proceed login function if connected', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();
    loginComponent.proceedLogin(true);
});

it('proceed login function if not connected', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();
    loginComponent.proceedLogin(false);
});

const mock = () => {
    const mockImpl = new MockAsyncStorage();
    jest.mock('AsyncStorage', () => mockImpl)
};

mock();

it('proceed login function if input valid', () => {
    let loginComponent = renderer.create(<Validation/>).getInstance();
    loginComponent.proceedLogin1(true);
    expect.assertions(0);
    handleLogin('test@test.com', 'test')
        .then(access_token =>{
            expect(asyncSetItem('myAccessToken', access_token)).toBe(storage.setItem('myAccessToken', access_token))
                .then(() => {
                    expect(loginComponent.state.aToken).toEqual(expect(asyncGetItem('myAccessToken')).toBe(storage.getItem('myAccessToken')))
                    // this.props.navigation.navigate('TabNav')
                })
        })
});



it('should run navigateIfAccessTokenFound is access token found', ()=>{
    const navigation = { navigate: jest.fn() };
    let loginComponent = renderer.create(<Validation navigation={navigation} />).getInstance();
    loginComponent.navigateIfAccessTokenFound('accessToken')
});