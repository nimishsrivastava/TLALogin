import {AsyncStorage} from "react-native";

export default asyncSetItem=(key, value)=>{

    return new Promise((resolve) => {
        resolve(AsyncStorage.setItem(key, value))
    })
}