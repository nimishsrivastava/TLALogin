import {
    AsyncStorage, Net,
    ToastAndroid,
} from 'react-native';


export default fetchAPI = (url, method, acceptType, contentType, hash, formData, message401) => {
    return  new Promise((resolve) =>{
        fetch(url, {
            method: method,
            headers: {
                'Authorization': hash,
                'Accept': acceptType,
                'Content-Type': contentType,
            },
            body: formData,

        }).then((response) => {
            //alert (JSON.stringify(response.json()));
            if (response.status === 200) {
                return response.json();
            }
            else if (response.status === 401) {
                ToastAndroid.show(
                    message401,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                return 'bCon'
            }
            else {
                //alert(response.status)
                ToastAndroid.show(
                    'error code: ' + response.status + 'Its not you, its us. Something went wrong on api server! :(',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                return 'nCon'
            }

        }).then((responseJson) => {
            if (responseJson !== 'nCon' && responseJson !== 'bCon') {
                resolve(responseJson);
            }
            else if(responseJson === 'bCon'){
                resolve('status401')
            }
            else if(responseJson === 'nCon'){
                resolve('nCon')
            }


        }).catch((error) => {
            //JSON.stringify(alert(error));
        });
    })
}