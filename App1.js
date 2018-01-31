import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    ToastAndroid,
    Image,
    Switch,
    Slider,

} from 'react-native';

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
            options: ["java","javascript","php","Ruby"],
            age: 1,

        };

    }

    getVal=(val)=>{
        //console.warn(val);
        alert(val);
    }
    go = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.uid) == true && this.state.pwd!= ''){
            ToastAndroid.show(
                'username: '+this.state.uid+'   password: '+this.state.pwd,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            //alert('username: '+this.state.uid+'   password: '+this.state.pwd);
        }
        else if(reg.test(this.state.uid) == true && this.state.pwd == ''){
            ToastAndroid.show(
                'enter password...',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            //alert('enter password...');
        }
        else if(reg.test(this.state.uid) == false && this.state.pwd == ''){
            ToastAndroid.show(
                'wrong id, empty password...',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            //alert('wrong id, empty password...');
        }
        else{
            ToastAndroid.show(
                'something you entered is wrong. Go figure...',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            //alert('something you entered is wrong. Go figure...')
        }
    }

    render() {
        return (

            <View style={styles.container}>

                {/*<ImageBackground style={styles.container} source={{uri:'https://www.w3schools.com/howto/img_fjords.jpg'}}>*/}
                <View style={styles.inContainer}>
                    <Image source={require('./images/Logo.png')} style={styles.logo} />
                </View>

                <View style={styles.inContainer}>
                    <Switch
                        onValueChange={ (value) => this.setState({ toggled: value })}
                        value={ this.state.toggled }
                    />
                    <View style={styles.inContainer}>
                        <KeyboardAvoidingView behavior="padding">
                            <TextInput
                                style={styles.input}
                                placeholder="e-Mail"
                                placeholderTextColor="rgb(100,100,100)"
                                onChangeText={(uid) => this.setState({uid})}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="rgb(100,100,100)"
                                onChangeText={(pwd) => this.setState({pwd})}
                                secureTextEntry
                            />
                        </KeyboardAvoidingView>
                    </View>

                    <View style={styles.inContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.go.bind(this)}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Picker style={{height:35, width:200, color:'rgb(255,255,255)', backgroundColor:'rgb(0,197,206)', marginBottom:25,}}

                        mode="dropdown"
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    {
                        this.state.options.map((item,index)=>{
                        return (<Picker.Item label={item} value={index} key={index}/>);

                    })}
                </Picker>
                <Slider
                    style={{  width: 300,  }}
                    step={0.1}
                    minimumValue={1}
                    maximumValue={50}
                    value={this.state.age}
                    onValueChange={val => this.setState({ age: val })}
                    onSlidingComplete={ val => this.getVal(val)}
                />
                <Text style={styles.input}>
                    {this.state.age}
                </Text>

                {/*</ImageBackground>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgb(32,37,56)',

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
        resizeMode: Image.resizeMode.contain
    },
    input: {
        height:50,
        width:300,
        color: 'rgb(255,255,255)',
        //backgroundColor:'rgb(255,255,255,0.2)'

    },
    button: {
        height:50,
        width:300,

        backgroundColor: 'rgb(0,197,206)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        //align: 'end',
    },


});
