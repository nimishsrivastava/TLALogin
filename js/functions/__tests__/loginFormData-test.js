import React from 'react';
import loginFormData from '../loginFormData';
global.FormData = require('FormData')

it('return form data', () => {
    let formData = new FormData();
    formData.append('grant_type', 'a');
    formData.append('scope','b' );
    formData.append('username', 'c');
    formData.append('password', 'd');


    expect(loginFormData('a','b','c','d')).toEqual(formData)
})