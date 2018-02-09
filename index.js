import { AppRegistry } from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Validation from './js/Validation';
import TabNav from './js/TabNav';

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
