import React from 'react';
import renderer from "react-test-renderer";
import fetchAPI from "../fetchAPI"
import handleLogin from "../handleLogin";

global.fetch = require('jest-fetch-mock');

it('fetch function', () => {
    //expect.assertions(1);
    fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', 'hashValue', 'formData', 'Your email id and password combination does not exists...')
})

it('fetch handle', () => {

    fetch.mockResponse(JSON.stringify('1234'))

    return fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', 'hashValue', 'formData', 'Your email id and password combination does not exists...')
    //getAccessToken contains the fetch call
        .then((responseJson) => { // return of async actions
            expect(responseJson).not.toEqual('status401')
            expect(responseJson).not.toEqual('nCon')
        })

});

it('fetch handle nCon', () => {

    fetch.mockResponse(JSON.stringify('nCon'))

    return fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', 'hashValue', 'formData', 'Your email id and password combination does not exists...')
        .then((responseJson) => { // return of async actions
            //expect(responseJson).not.toEqual('status401')
            expect(responseJson).toEqual('nCon')
        })

});
it('fetch handle bCon', () => {

    fetch.mockResponse(JSON.stringify('bCon'))

    return fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', 'hashValue', 'formData', 'Your email id and password combination does not exists...')
    //getAccessToken contains the fetch call
        .then((responseJson) => { // return of async actions
            //expect(responseJson).not.toEqual('status401')
            expect(responseJson).toEqual('status401')
        })

});

it('fetch handle 401 status', () => {
    fetch.mockResponse('bCon',{status:401})
    return fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', 'hashValue', 'formData', 'Your email id and password combination does not exists...')
    //getAccessToken contains the fetch call
        .then((response) => { // return of async actions
            //expect(responseJson).not.toEqual('status401')
            expect(response).toEqual('status401')
        })

});

it('fetch handle 501 status', () => {
    fetch.mockResponse('nCon',{status:501})
    return fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', 'hashValue', 'formData', 'Your email id and password combination does not exists...')
    //getAccessToken contains the fetch call
        .then((response) => { // return of async actions
            //expect(responseJson).not.toEqual('status401')
            expect(response).toEqual('nCon')
        })

});