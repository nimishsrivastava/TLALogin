import React from 'react';
import renderer from 'react-test-renderer';
import Movies from '../Movies';
import {findById} from '../functions/findByID';
import {NetInfo} from "react-native";
import checkConnection from "../functions/checkConnection";

it('renders correctly', () => {
    const tree = renderer
        .create(<Movies page="Movies">TLA</Movies>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render movies list', () => {
    const tree = renderer
        .create(<Movies page="Movies">TLA</Movies>)
        .toJSON();
    expect(findById(tree, 'list')).toBeDefined()
});

it('should change modal visibility, selected text, address', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.openModal('1999')
    expect(modalComponent.state.modalVisible).toEqual(true)
    expect(modalComponent.state.selectedText).toEqual("Title of the movie is 'The Marix' and  its release year is '1999'. Thomas, a computer programmer, is led to fight an underground war against powerful computers who now rule the world with a system called 'The Matrix'.")
    expect(modalComponent.state.address).toEqual("https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg")
});

it('should change modal visibility, selected text, address', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.openModal('1977')
    expect(modalComponent.state.modalVisible).toEqual(true)
    expect(modalComponent.state.selectedText).toEqual("Title of the movie is 'Star Wars' and  its release year is '1977'. Star Wars is an American epic space opera media franchise, centered on a film series created by George Lucas. It depicts the adventures of various characters \"a long time ago in a galaxy far, far away\".\n")
    expect(modalComponent.state.address).toEqual("https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711")
});

it('should change modal visibility, selected text, address', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.openModal('1985')
    expect(modalComponent.state.modalVisible).toEqual(true)
    expect(modalComponent.state.selectedText).toEqual("Title of the movie is 'Back to the Future' and  its release year is '1985'. Back to the Future is a 1985 American science-fiction adventure comedy film[6] directed by Robert Zemeckis and written by Zemeckis and Bob Gale. It stars Michael J. Fox as teenager Marty McFly, who is sent back in time to 1955, where he meets his future parents in high school and accidentally becomes his mother's romantic interest.")
    expect(modalComponent.state.address).toEqual("https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg")
});

it('should change modal visibility, selected text, address', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.openModal('2010')
    expect(modalComponent.state.modalVisible).toEqual(true)
    expect(modalComponent.state.selectedText).toEqual("Title of the movie is 'Inception' and  its release year is '2010'. Cobb steals information from his targets by entering their dreams. He is wanted for his alleged role in his wife's murder and his only chance at redemption is to perform the impossible, an inception.")
    expect(modalComponent.state.address).toEqual("https://www.warnerbros.com/sites/default/files/styles/key_art_270x400/public/inception_keyart.jpg?itok=7jXiglyb")
});

it('should change modal visibility, selected text, address', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.openModal('2014')
    expect(modalComponent.state.modalVisible).toEqual(true)
    expect(modalComponent.state.selectedText).toEqual("Title of the movie is 'Interstellar' and  its release year is '2014'. In the future, Earth is slowly becoming uninhabitable. Ex-NASA pilot Cooper, along with a team of researchers, is sent on a planet exploration mission to report which planet can sustain life.")
    expect(modalComponent.state.address).toEqual("https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg")
});

it('should change modal visibility', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.closeModal()
    expect(modalComponent.state.modalVisible).toEqual(false)
});

it('should change states on refresh', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent._onRefresh()
    expect(modalComponent.state.refreshing).toEqual(true)
    expect(modalComponent.state.isLoading).toEqual(true)
});

it('should run fetch Movies function', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.fetchMovies()
    // expect(modalComponent.state.refreshing).toEqual(true)
    // expect(modalComponent.state.isLoading).toEqual(true)
});

it('handle connection function', () => {
    let modalComponent = renderer.create(<Movies/>).getInstance()
    modalComponent.handleConnection()
});

it('should run proceed handle connection function if connected',()=>{
    let modelComponent= renderer.create(<Movies/>).getInstance();
    modelComponent.proceedHandleConnection(true)
});

it('should run proceed handle connection function if not connected',()=>{
    let modelComponent= renderer.create(<Movies/>).getInstance();
    modelComponent.proceedHandleConnection(false)
});

it('should run proceedHandleConnectionIfNotConnected when data is not stored',()=>{
    let modelComponent= renderer.create(<Movies/>).getInstance();
    modelComponent.proceedHandleConnectionIfNotConnected('data')
})