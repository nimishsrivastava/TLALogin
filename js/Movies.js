import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    NetInfo,
    Image,
    Modal,
    ToastAndroid,
    AsyncStorage,

} from 'react-native';

import Base64 from 'base-64'
import checkConnection from "./functions/checkConnection";
import fetchAPI from "./functions/fetchAPI";
import asyncSetItem from "./functions/asyncSetItem"
import asyncGetItem from "./functions/asyncGetItem"
import displayModal from "./functions/displayModal"
import backHandler from "./functions/backHandler";

export default class App extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            isLoading: true,
            modalVisible: false,
            data:'',
            selectedText:'',
            address:'',
        };

    }
    static screenName = 'movies';
    _onRefresh() {
        this.setState({refreshing: true, isLoading: true, });
        this.handleConnection()
    }

    componentWillMount() {
        backHandler(App.screenName)
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnection
        );
        this.handleConnection();
    }

    openModal(iYear) {
        this.setState(displayModal(iYear))
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    handleConnection= () => {
        checkConnection()
        .then( (isConnected)=> {
            this.proceedHandleConnection(isConnected)
        })
    }

    proceedHandleConnection=((isConnected)=>{
        if (isConnected) {
            this.fetchMovies();
            this.setState({refreshing: false, isLoading: false,});
        }
        else{
            asyncGetItem('MovieList')
                .then((value) => {
                    this.proceedHandleConnectionIfNotConnected(value)
                })
                .catch((error) => {
                    ToastAndroid.show(
                        'you need an active internet connection...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    )
                });
        }
    })

    proceedHandleConnectionIfNotConnected=((value)=>{
        if(value==null){
            ToastAndroid.show(
                'you need an active internet connection to fetch movies...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
            this.setState({refreshing: false, isLoading: false,});
        }
        else{
            ToastAndroid.show(
                'you are offline...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
            asyncGetItem('MovieList')
                .then((myArray) => {
                    //alert(JSON.parse(myArray))
                    this.setState({data: JSON.parse(myArray), isLoading: false});
                    this.setState({refreshing: false, isLoading: false,});
                })
        }
    })



    fetchMovies= () =>{
        fetchAPI('https://facebook.github.io/react-native/movies.json')
            .then((responseJson)=>{
                asyncSetItem('MovieList', JSON.stringify(responseJson.movies))
                    .then(()=> {
                        this.setState({data: responseJson.movies, isLoading: false});
                    })
            }).catch((error) => {
                     ToastAndroid.show(
                        'unable to fetch movies...',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                });
    }
    render() {
        const {isLoading} = this.state;
        return (

            <View style={styles.container}>

                <Modal
                    transparent={ true}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}
                >

                    <View style={styles.innerContainer}>
                        <Text style={{color:'white', marginLeft: 30, marginRight: 30,   textAlign:'center'}}>{this.state.selectedText} </Text>
                        <Image
                            style={{height:180, width:120}}
                            source={{uri: this.state.address}}
                        />
                        <TouchableOpacity onPress={() => this.closeModal()}>
                            <Text style={{color:'white', fontSize:21, }}> Close </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <View style={styles.header}>
                    <View style={styles.inHeader}>
                    </View>

                    <Image source={{uri: 'http://icons.iconseeker.com/png/fullsize/sticker-system/movie-7.png'}} style={styles.hImage}/>

                </View>

                <View style={styles.container}>
                    {isLoading && (
                        <ActivityIndicator
                            style={{ height: 90 }}
                            color="#C00"
                            size="large"
                        />
                    )}
                    <FlatList
                        accessibilityLabel={"list"}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />}
                        style={{flexWrap:'nowrap', }}
                        data={this.state.data}
                        renderItem={({item}) =>

                            <TouchableOpacity onPress={()=>{this.openModal(item.releaseYear)}}>
                                <View style={styles.text} >
                                    <Image source={{uri: 'http://www.escapeintolife.com/wp-content/uploads/2010/07/dk.png'}}
                                           style={styles.mImage} />
                                    <View style={{flexDirection:'column', flexWrap:'nowrap'}}>
                                        <Text style={{color:'rgb(0,0,0)',}}> Title: {item.title}</Text>
                                        <Text style={{color:'rgb(100,100,100)'}}>           {item.releaseYear}</Text>
                                    </View>
                                </View>
                             </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height:120,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    inHeader: {
        position:'absolute',
        top:0,
        height:70,
        width:430,
        alignItems: 'center',
        backgroundColor: 'rgb(25,145,238)',

    },
    hImage:{
        position:'absolute',
        top:6,
        height:102,
        width:100,
        margin: 5,
        flexWrap:'nowrap',

    },
    container: {
        flex: 1,
        //backgroundColor: 'rgb(250,250,250)',

    },
    modalContainer: {
        flex:1,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        position:'absolute',
        top:200,
        bottom:0,
        left:0,
        right:0,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },

    button: {
        height:50,
        width:300,
        backgroundColor: 'rgb(0,197,206)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        //align: 'end',
    },

    text: {
        flexDirection: 'row',
        height:90,
        alignItems:'center',
        elevation:3,
        backgroundColor:'rgb(255,255,255)',
        margin:6,
        flexWrap:'nowrap',
    },
    mImage:{
        height:81,
        width:50,
        margin: 5,
        flexWrap:'nowrap',

    }
});
