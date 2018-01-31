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
    Image, ToastAndroid
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
        };
    }

    go = () => {

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.uid) == true && this.state.pwd != '') {

            ToastAndroid.show(
                'username: ' + this.state.uid + '   password: ' + this.state.pwd,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        else if (reg.test(this.state.uid) == true && this.state.pwd == '') {
            ToastAndroid.show(
                'enter password...',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        else if (reg.test(this.state.uid) == false && this.state.pwd == '') {
            ToastAndroid.show(
                'wrong id, empty password...',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        else {
            ToastAndroid.show(
                'something you entered is wrong. Go figure...',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
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
            <View style={styles.inContainer}>
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
            </View>
            <View style={styles.inContainer}>
              <TouchableOpacity style={styles.button} onPress={this.go.bind(this)}>
                  <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
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
      borderRadius: 50,
      //align: 'end',
  },
});
