import React, {Component} from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [
                {name: 'Voulez-Vous', artitst: 'Abba', id: '2NmpePwcU5msK7cYZBWiBt', album: 'For the music'},
                {name: 'Omen iii', artist: 'Magic Affair', id: '5FA90DipIi1TKifttlVKF1', album: 'Single Edit'},
            ],
            playlistName: 'my playlist',
            playlistTracks: [
                {name: 'Strongest (Alan Walker Remix)', artitst: 'Alan Walker', id: '2r9hCNjupNy2C2g3r6SNz6', album: 'Remix'}
            ]
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        Spotify.initModule(window);
        Spotify.getAccessToken(window);
    }

    addTrack(track) {
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
        const updatedPlaylist = this.state.playlistTracks.filter((element) => {
            return element.id !== track.id;
        });
        this.setState({
            playlistTracks: updatedPlaylist
        });
    }

    updatePlaylistName(name) {
        console.log(`updating name: ${name}`);
        this.setState({
            playlistName: name
        })
    }

    savePlaylist() {
        const trackURIs = [];
        this.state.playlistTracks.forEach((track) => {
            trackURIs.push(`spotify:track:${track.id}`);
        });
        console.log(trackURIs);
        return trackURIs;
    }

    search(searchTerm) {
        console.log(`the search term: ${searchTerm}`);

    }

    render() {
        return (
            <div>
                <h1>Ja
                    <span className="highlight">mmm</span>
                    ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults onAdd={this.addTrack} searchResult={this.state.searchResult}/>
                        <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
                    </div>
                </div>
            </div>
        );
    }
}
