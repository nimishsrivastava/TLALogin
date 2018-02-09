import {NetInfo,} from "react-native";

export default checkConnection = () => {
    return new Promise((resolve) =>{
        NetInfo.isConnected.fetch()
        .then(isConnected => {
                resolve(isConnected)
        })
    });
}