import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ImageBackground,
    ToastAndroid, NetInfo,
} from 'react-native';
import Base64 from 'base-64'

import inputValidation from './functions/inputValidation'
import checkConnection from "./functions/checkConnection";
import fetchAPI from "./functions/fetchAPI";
import loginFormData from "./functions/loginFormData";
import asyncSetItem from "./functions/asyncSetItem"
import asyncGetItem from "./functions/asyncGetItem"
import handleLogin from "./functions/handleLogin"

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {uid: '',
            pwd:'',
            aToken:'',
        };
    }

    componentWillMount(){
        checkConnection()
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.showMessage
        );

        asyncGetItem('myAccessToken')
            .then((value) => {
                if (value != null) {
                    //alert("not logged in...No access token found.")
                    this.props.navigation.navigate('TabNav')
                }
            })
    }
    showMessage= (isConnected) => {
        ToastAndroid.show(
            'You are now ' + (isConnected ? 'online' : 'offline') + '...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        )
    }

    login = () => {
        checkConnection().then((isConnected) => {
            if (isConnected) {
                let validateInput = inputValidation(this.state.uid, this.state.pwd);
                if (validateInput) {

                    handleLogin(this.state.uid, this.state.pwd)
                    .then((access_token)=>{
                        asyncSetItem('myAccessToken', access_token)
                            .then(() => {
                                this.setState({aToken: asyncGetItem('myAccessToken') })
                                this.props.navigation.navigate('TabNav')
                            })
                    })

                }
            }
            else {
                ToastAndroid.show(
                    'You need an active internet connection to login...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                )}
        }).catch=(error)=>{
            ToastAndroid.show(
                error,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        }
    };

    handleUsernameChange = (uid) => {
        this.setState({uid:uid})
    }
    handlePasswordChange = (pwd) => {
        this.setState({pwd:pwd})
    }

    render() {
        return (
            //<View style={styles.container}>
                <ImageBackground style={styles.BG} source={require('../images/bg.jpg')}>
                    <View style={styles.inContainer}>
                        <Image testID={'logo'} source={require('../images/Logo.png')} style={styles.logo} />
                    </View>

                    <View style={styles.inContainer}>
                        <View style={styles.inContainer}>
                            <TextInput
                                testID={'username'}
                                style={styles.input}
                                placeholder="e-Mail"
                                placeholderTextColor="rgb(200,200,200)"
                                onChangeText={(uid) => this.handleUsernameChange(uid)}
                            />
                            <TextInput
                                testID={'password'}
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="rgb(200,200,200)"
                                onChangeText={(pwd) => this.handlePasswordChange(pwd)}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.inContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.login.bind()}>
                                <Text testID={'loginButton'} style={{fontSize:18, color:'white'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            //</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgb(240,240,240)',
    },
    BG: {
        flex: 1,
        //resizeMode: 'cover',
    },

    inContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        //backgroundColor: 'rgb(32,37,56)',
    },

    logo: {
        height:200,
        width:200,
        resizeMode: Image.resizeMode.contain,

    },

    input: {
        height:50,
        width:300,
        color: 'rgb(255,255,255)',
        borderColor:'white',
        borderRadius:3,
        //backgroundColor:'rgb(255,255,255,0.2)'
    },

    button: {
        height:50,
        width:300,
        backgroundColor: 'rgba(32,141,172,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
        //align: 'end',
    },
});
