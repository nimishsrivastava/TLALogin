import 'react-native';
import MockAsyncStorage from 'mock-async-storage'
import React from 'react';
import asyncSetItem from '../asyncSetItem';

const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}

mock();

import { AsyncStorage as storage } from 'react-native'

it('Async Set Item working', async () => {

        expect(await asyncSetItem('myKey', 'myValue')).toBe(await storage.setItem('myKey', 'myValue'))
})