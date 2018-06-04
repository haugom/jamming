import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [
                {name: 'Money money money', artitst: 'Abba', id: '1', album: 'For the music'},
                {name: 'Omen', artist: 'Omen', id: '2', album: 'Bad omen'}
            ],
            playlistName: 'my playlist',
            playlistTracks: [
                {name: 'some track', artitst: 'some artist', id: '3', album: 'some album'}
            ]
        }
    }

    render() {
        console.log(this.state.searchResult);
        return (
            <div>
                <h1>Ja
                    <span className="highlight">mmm</span>
                    ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResult={this.state.searchResult}/>
                        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
                    </div>
                </div>
            </div>
        );
    }
}
