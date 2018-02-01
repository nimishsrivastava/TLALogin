import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ImageBackground,
    ToastAndroid,
    NetInfo,

} from 'react-native';

import PushNotification from 'react-native-push-notification'
import Base64 from 'base-64'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {uid: '',
            pwd:'',
            eValid: false,
            language: 'java',
            aToken:'',
            isLoading: true,
            isVisible:false,
        };
    }

    componentWillMount(){
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                AsyncStorage.getItem('myAccessToken')
                    .then((value) => {
                        //alert(value)
                        if (value == null) {
                            //alert("not logged in...No access token found.")
                            this.setState({isVisible: false})
                        }
                        else {
                            //alert(value+ 'val')
                            this.setState({isVisible: true, uid: 'yael.dvori@bayer.com', pwd: 'password'})
                            this.props.navigation.navigate('TabNav')

                        }
                    })
            }
            else {
                AsyncStorage.getItem('myAccessToken')
                    .then((value) => {
                        if (value == null) {
                            //alert("not logged in...No access token found.")
                            this.setState({isVisible: false})
                            ToastAndroid.show(
                                'You need an active internet connection to login...',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM
                            )
                        }
                        else {
                            this.setState({isVisible: true, uid: 'yael.dvori@bayer.com', pwd: 'password'})
                            this.props.navigation.navigate('TabNav')
                            //alert(value)
                        }
                    })
            }
        });
        //NetInfo.isConnected.addEventListener('connectionChange',this.handleConChange);
    }

    handleConChange = () =>{
        NetInfo.isConnected.fetch().then(isConnected => {

        });
    }

    login = () =>{
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (reg.test(this.state.uid) == true && this.state.pwd != '') {
                    const hash = Base64.encode('bayer:bayer#123')
                    var formData = new FormData()
                    formData.append('grant_type', 'password');
                    formData.append('scope', 'webclient');
                    formData.append('username', this.state.uid);
                    formData.append('password', this.state.pwd);


                    return fetch('http://13.127.76.18:8080/digitrial/oauth/token', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Basic ${hash}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formData,

                    }).then((response) => {
                        //alert (JSON.stringify(response.json()));
                        if (response.status === 200) {
                            //alert('success')
                            return response.json();
                        }
                        else if (response.status === 401) {
                            ToastAndroid.show(
                                'Your email id and password combination does not exists...',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM
                            );
                            return 'nCon'
                        }
                        else {
                            //alert(response.status)
                            ToastAndroid.show(
                                'error code: ' + response.status + 'Its no you, its us. Something went wrong on api server! :(',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM
                            );
                            return 'nCon'
                        }
                    }).then((responseJson) => {
                        if (responseJson != 'nCon') {
                            this.setState({aToken: responseJson.access_token, isVisible: true});
                            AsyncStorage.setItem('myAccessToken', this.state.aToken)
                                .then(()=> {
                                    //alert(this.state.aToken + '  logged in');
                                    this.props.navigation.navigate('TabNav')
                                })
                        }

                    }).catch((error) => {
                        //JSON.stringify(alert(error));
                    });
                }
                else if (reg.test(this.state.uid) == true && this.state.pwd == '') {
                    ToastAndroid.show(
                        'empty password...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                }
                else if (reg.test(this.state.uid) == false && this.state.pwd == '') {
                    ToastAndroid.show(
                        'invalid id, empty password...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                }
                else if (reg.test(this.state.uid) == false && this.state.pwd != '') {
                    ToastAndroid.show(
                        'invalid id...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                }
                else {
                    ToastAndroid.show(
                        'something you entered is wrong. Go figure...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                }
            }
            else{
                ToastAndroid.show(
                    'You need an active internet connection to login...',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                )
            }
        });
    }

    render() {

        return (
            //<View style={styles.container}>
                <ImageBackground style={styles.BG} source={require('./images/bg.jpg')}>
                <View style={styles.inContainer}>
                    <Image source={require('./images/Logo.png')} style={styles.logo} />
                </View>

                <View style={styles.inContainer}>
                    <View style={styles.inContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="e-Mail"
                            placeholderTextColor="rgb(200,200,200)"
                            onChangeText={(uid) => this.setState({uid})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="rgb(200,200,200)"
                            onChangeText={(pwd) => this.setState({pwd})}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.inContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.login.bind()}>
                            <Text style={{fontSize:18, color:'white'}}>Login</Text>
                        </TouchableOpacity>

                        {/*{isVisible && <TouchableOpacity style={styles.button} onPress={this.deleteToken.bind()}>*/}
                            {/*<Text>Delete Token</Text>*/}
                        {/*</TouchableOpacity>}*/}
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
