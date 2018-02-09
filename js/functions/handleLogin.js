import {ToastAndroid} from "react-native";
import fetchAPI from "./fetchAPI";
import loginFormData from "./loginFormData";
import Base64 from 'base-64'


export default handleLogin= (uid, pwd) => {
    return new Promise((resolve) => {
        const hash = Base64.encode('bayer:bayer#123');
        //parameters loginFormData = (grantType, scope, uid, pwd)
        let formData = loginFormData('password', 'webclient', uid, pwd);
        //parameters fetchAPI = (url, method, acceptType, contentType, hash, formData, message401)
        fetchAPI('http://13.127.76.18:8080/digitrial/oauth/token', 'POST', 'application/json', 'multipart/form-data', `Basic ${hash}`, formData, 'Your email id and password combination does not exists...')
            .then((responseJson) => {
                if (responseJson !== 'status401' && responseJson !== 'nCon') {
                    resolve(responseJson.access_token)
                }
                else {
                    ToastAndroid.show(
                        'You need an active internet connection to login...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    )
                }
            })
    })
}