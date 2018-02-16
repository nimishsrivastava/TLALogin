import {BackHandler, ToastAndroid} from 'react-native';

export default backHandler = ((screenName)=>{
    BackHandler.addEventListener('hardwareBackPress', function() {
        //let currentScreen= getCurrentScreen(screenName);
        //alert (currentScreen)
        if(screenName=== 'movies'){
            ToastAndroid.show(
                'logout to exit app...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
            return true;
        }
        else if(screenName==='validation'){

        }
    });
})
