import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ListView,
    ActivityIndicator,
    RefreshControl,
    NetInfo,
    Image,
    Modal,

} from 'react-native';

import Base64 from 'base-64'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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

    _onRefresh() {
        this.setState({refreshing: true, isLoading: true, });

        this.fetchMovies().then(() => {
            this.setState({refreshing: false, isLoading: false,});
        });
    }

    componentWillMount(){
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected)
            {

                this.fetchMovies();
            }
            else{
                alert('You are offline');
                this.fetchMovies();
            }
        });
        this.changeConnection();
    }

    openModal(iTitle, iYear) {

        switch(iYear){
            case '1977' :
                this.setState({
                    selectedText: 'Title of the movie is \'Star Wars\' and  its release year is \'1977\'. Star Wars is an American epic space opera media franchise, centered on a film series created by George Lucas. It depicts the adventures of various characters "a long time ago in a galaxy far, far away".\n'
                    , address:'https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711'});
                break;
            case '1985':
                this.setState({
                    selectedText: 'Title of the movie is \'Back to the Future\' and  its release year is \'1985\'. Back to the Future is a 1985 American science-fiction adventure comedy film[6] directed by Robert Zemeckis and written by Zemeckis and Bob Gale. It stars Michael J. Fox as teenager Marty McFly, who is sent back in time to 1955, where he meets his future parents in high school and accidentally becomes his mother\'s romantic interest.'
                    , address: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg'
                });
                break;
            case '1999':
                this.setState({
                    selectedText: 'Title of the movie is \'The Marix\' and  its release year is \'1999\'. Thomas, a computer programmer, is led to fight an underground war against powerful computers who now rule the world with a system called \'The Matrix\'.'
                    , address: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg'
                });
                break;
            case '2010':
                this.setState({
                    selectedText: 'Title of the movie is \'Inception\' and  its release year is \'2010\'. Cobb steals information from his targets by entering their dreams. He is wanted for his alleged role in his wife\'s murder and his only chance at redemption is to perform the impossible, an inception.'
                    ,address:'https://www.warnerbros.com/sites/default/files/styles/key_art_270x400/public/inception_keyart.jpg?itok=7jXiglyb'
                });
                break;
            case '2014':
                this.setState({
                    selectedText: 'Title of the movie is \'Interstellar\' and  its release year is \'2014\'. In the future, Earth is slowly becoming uninhabitable. Ex-NASA pilot Cooper, along with a team of researchers, is sent on a planet exploration mission to report which planet can sustain life.'
                    , address:'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg'
                });
                break;
        }

        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    showMessage= (isConnected)=>{
        if(isConnected) {

            this.fetchMovies();
        }
        else{
            alert('You are offline')
        }
    }

    changeConnection(isConnected) {
        NetInfo.isConnected.addEventListener('connectionChange',this.showMessage);
    }

    fetchMovies= () =>{

            this.changeConnection();
            return fetch('https://facebook.github.io/react-native/movies.json')
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((responseJson) => {

                    //alert(JSON.stringify(responseJson.movies));
                    //  return responseJson.movies;
                    this.setState({data: responseJson.movies, isLoading: false});

                })

                .catch((error) => {
                    if (error.status) {
                        alert('unable to fetch movies');
                    }
                    else{alert('you are offline')}
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
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />}
                        style={{flexWrap:'nowrap', }}
                        data={this.state.data}
                        renderItem={({item}) =>

                            <TouchableOpacity onPress={()=>{this.openModal(item.title, item.releaseYear)}}>
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
