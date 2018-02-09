import {
    AsyncStorage,
    ToastAndroid,
} from 'react-native';

export default inputValidation = (uid, pwd) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(uid) == true && pwd != '') {
        return true
    }
    else if (reg.test(uid) == true && pwd == '') {
        ToastAndroid.show(
            'empty password...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        return false
    }
    else if (reg.test(uid) == false && pwd == '') {
        ToastAndroid.show(
            'invalid id, empty password...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        return false
    }
    else if (reg.test(uid) == false && pwd != '') {
        ToastAndroid.show(
            'invalid id...',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        return false
    }
}