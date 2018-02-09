import {AsyncStorage} from "react-native";

export default asyncGetItem=(key)=>{
    return new Promise((resolve) => {
        AsyncStorage.getItem(key)
            .then(value => {
                resolve(value)
            })
    })
}