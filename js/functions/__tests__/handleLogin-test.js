import React from 'react';

import handleLogin  from '../handleLogin'
global.FormData = require('FormData')
global.fetch = require('jest-fetch-mock');

describe('Access token action creators', () => {

    const formData = new FormData();
    formData.append('grant_type', 'a');
    formData.append('scope','b' );
    formData.append('username', 'c');
    formData.append('password', 'd');

    it('handle login return access token', () => {
        handleLogin('yael.dvori@bayer.com', 'password', 'hashValue', formData)
    })

    it('dispatches the correct actions on successful fetch request', () => {

        fetch.mockResponse(JSON.stringify({access_token: '12345' }))

        return handleLogin('yael.dvori@bayer.com', 'password', 'hashValue', formData)
        //getAccessToken contains the fetch call
            .then((a_token) => { // return of async actions
                expect(a_token).toEqual('12345')
            })

    });

})