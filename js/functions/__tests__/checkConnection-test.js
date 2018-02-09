import React from 'react';
import renderer from 'react-test-renderer';
import checkConnection from '../checkConnection';
import {NetInfo} from "react-native";

it('check connection', () => {
    jest.mock('NetInfo', () => {
        return {
            isConnected: {
                fetch: () => {
                    return new Promise((accept) => {
                        accept(true);
                    });
                },
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            },
        };
    });

    expect(checkConnection()).toBeTruthy()

})

it('resolve isConnected', () => {
    expect.assertions(1);
    return NetInfo.isConnected.fetch().then(isConnected => expect(isConnected).toEqual(true));
})