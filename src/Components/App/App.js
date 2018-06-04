import React, {Component} from 'react';
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
                {name: 'Omen', artist: 'Omen', id: '2', album: 'Bad omen'},
            ],
            playlistName: 'my playlist',
            playlistTracks: [
                {name: 'some track', artitst: 'some artist', id: '3', album: 'some album'}
            ]
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(track) {
        console.log('adding track');
        const existingTracks = this.state.playlistTracks.filter((element) => {
            return element.id === track.id;
        });
        const isTrackOnPlaylist = existingTracks.length > 0;
        if (!isTrackOnPlaylist) {
            const updatedPlaylist = this.state.playlistTracks.slice();
            updatedPlaylist.push(track);
            this.setState({
                playlistTracks: updatedPlaylist
            })
        };
    }

    removeTrack(track) {
        console.log('removing track');
        const updatedPlaylist = this.state.playlistTracks.filter((element) => {
            return element.id !== track.id;
        });
        this.setState({
            playlistTracks: updatedPlaylist
        });
    }

    render() {
        return (
            <div>
                <h1>Ja
                    <span className="highlight">mmm</span>
                    ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults onAdd={this.addTrack} searchResult={this.state.searchResult}/>
                        <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
                    </div>
                </div>
            </div>
        );
    }
}
