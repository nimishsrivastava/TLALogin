import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    NetInfo,
    Image,
    AsyncStorage, ToastAndroid,


} from 'react-native';
import {StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import asyncGetItem from "./functions/asyncGetItem"
import Base64 from 'base-64'
import checkConnection from "./functions/checkConnection";
import fetchAPI from "./functions/fetchAPI";
import asyncSetItem from "./functions/asyncSetItem";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    logout=() => {
        checkConnection().then(isConnected => {
            if(isConnected) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                })
                //alert('here')
                asyncGetItem('myAccessToken')
                    .then((value) => {
                        return fetchAPI('http://13.127.76.18:8080/digitrial/api/user/logout','POST', 'application/json', 'application/json', `Bearer ${value}`,'','response status: 401')
                            .then((responseJson)=>{
                                ToastAndroid.show(
                                    'logged out...',
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM
                                )
                            })
                            .then(() => {
                                AsyncStorage.removeItem('myAccessToken').then(() => {
                                    //alert('here')
                                    this.props.navigation.dispatch(resetAction);
                                })
                            }).catch((error) => {
                                //JSON.stringify(alert(error));
                                ToastAndroid.show(
                                    'Something went wrong. Unable to sign out...',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                )
                            });
                    })
            }
            else{
                ToastAndroid.show(
                    'Couldn\'t log out. Please check your internet connection',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
            }
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.inHeader}>
                    </View>
                    <Image source={{uri: 'https://www.roomsoom.com/images/testimonial-face/icon1.png'}} style={styles.hImage}/>

                </View>
                <View style={styles.oContent}>
                    <Text style={{fontWeight:'bold', fontSize:21, margin:6}}>ABOUT US</Text>

                    <ScrollView style={styles.content}>
                        <Text style={{textAlign:'center', margin:5}}>Film, also called a movie, motion picture, theatrical film, or photoplay, is a series of still images that when shown on a screen create an illusion of motion images See glossary of motion picture terms. This optical illusion causes the audience to perceive continuous motion between separate objects viewed rapidly in </Text>
                        <Text style={{textAlign:'center', margin:5}}>What is your favorite movie? Are there any kinds of movies you dislike? If so, what kinds? Why do you dislike them? Do you like to watch horror movies? Do you prefer fiction or nonfiction books? How about movies? Do you usually watch movies at home or at a movie theater? Have you ever seen the same movie more</Text>
                        <Text style={{textAlign:'center', margin:5}}>What is your favorite movie? Are there any kinds of movies you dislike? If so, what kinds? Why do you dislike them? Do you like to watch horror movies? Do you prefer fiction or nonfiction books? How about movies? Do you usually watch movies at home or at a movie theater? Have you ever seen the same movie more</Text>
                    </ScrollView>
                </View>
                <View style={{alignItems:'center', justifyContent:'center',}}>
                    <TouchableOpacity testID="logoutButton" style={styles.button} onPress={this.logout.bind()}>
                        <Text >Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        height:120,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    inHeader: {
        position:'absolute',
        top:0,
        height:70,
        width:430,
        alignItems: 'center',
        backgroundColor: 'rgb(25,145,238)',

    },
    hImage:{
        position:'absolute',
        top:6,
        height:102,
        width:102,
        margin: 5,
        flexWrap:'nowrap',


    },
    container: {
        flex: 1,
        //backgroundColor: 'rgb(250,250,250)',
    },
    content:{
        // position:'absolute',
        // top: 130,
        // bottom:100,
        // left: 30,
        // right:30,
        backgroundColor: 'rgb(255,255,255)',
        elevation: 3,
    },
    oContent:{
        position:'absolute',
        top: 130,
        bottom:100,
        left: 30,
        right:30,
        backgroundColor: 'rgb(255,255,255)',
        elevation: 3,
        alignItems:'center',
        justifyContent:'center',
    },

    button: {
        position: 'absolute',
        top:390,
        height:50,
        width:300,
        backgroundColor: 'rgb(25,145,238)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        elevation:3,
        //align: 'end',
    },

});
