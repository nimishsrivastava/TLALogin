import React from 'react';
import renderer from 'react-test-renderer';
import inputValidation from '../inputValidation';

it('true id true password', () => {
    expect(inputValidation('test@test.com', 'test')).toBeTruthy()
})
it('true id false password', () => {
    expect(inputValidation('test@test.com', '')).not.toBeTruthy()
})
it('false id false password', () => {
    expect(inputValidation('testtestcom', '')).not.toBeTruthy()
})
it('false id true password', () => {
    expect(inputValidation('testtestcom', 'test')).not.toBeTruthy()
})