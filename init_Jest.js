import {NativeModules, ToastAndroid} from 'react-native';

global.fetch = require('jest-fetch-mock');


NativeModules.Configuration = {
    buildEnvironment: 'Development'
};


global.FormData = require('FormData')
global.alert = jest.fn()


jest.mock('NetInfo', () => {
    return {
        isConnected: {
            fetch: () => {
                return new Promise((accept, resolve) => {
                    accept(true);
                });
            },
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        },
    };
});
jest.mock('TouchableOpacity', () => {
    const mockComponent = require('jest-react-native');
    return mockComponent('TouchableOpacity');
});