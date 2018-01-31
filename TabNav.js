import React, { Component } from 'react';
import {StackNavigator, TabNavigator,} from 'react-navigation';
import Movies from "./Movies";
import Profile from "./Profile";
import Validation from "./Validation"
import {
    AsyncStorage,
    Image,
    StyleSheet,
} from 'react-native';

returnData= (page) => {
    this.props.navigation.navigate(page);
}

componentWillMount = () => {
    let value = AsyncStorage.getItem('myAccessToken')
        .then((value) => {
            if(value!= null){
                alert('no access')
                alert('no access')

            }
            else{
                this.props.navigation.navigate('Validation')
            }
        })
}

const NavigationTab = TabNavigator({
    Movies: {
        screen: Movies,
        navigationOptions: {
            tabBarLabel: 'Movies',
            tabBarIcon: () => <Image source={require('./images/moview.png')} style={styles.icon}  />
        },
    },
    Profile: {
         screen: Profile,
        // screen: StackNavigator({ Profile: { screen: Profile }, Login: {screen: Validation}},{
        //     headerMode: 'none'
        // }),

        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: () => <Image source={require('./images/profilew.png')} style={styles.icon}  />

        },
    },
},
{
    tabBarPosition: 'bottom',
    tabBarIcon: { focused: true, tintColor: '#fff' },
    tabBarOptions:{
        showIcon: true,
        showLabel: false,
        indicatorStyle:{
            backgroundColor:'rgb(255,255,255)',
            height:6,
        },
        iconStyle:{

        },
        tabStyle: {
            backgroundColor: 'rgba(32,37,56, 0.3)',
        },
        style: {

        },
    }
}

)

const styles = StyleSheet.create({
    icon: {
        height:25,
        width:25,
    },
});


export default NavigationTab;



