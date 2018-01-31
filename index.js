import { AppRegistry } from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Validation from './Validation';
import TabNav from './TabNav';
import Profile from './Profile'

export const NavigationStack = StackNavigator({
    Login: {
        screen: Validation
    },
    TabNav: {
        screen: TabNav
    },

},{
    headerMode: 'none'
})

AppRegistry.registerComponent('LoginPortal', () => NavigationStack);
