import React, {Component} from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Login from '../Login/Login';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            playlistName: 'New Playlist',
            playlistTracks: [],
            loading: false,
            tokenInfo: {
                accessToken: '',
                expiresIn: 0,
                state: ''
            }
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.expireToken = this.expireToken.bind(this);
        Spotify.initModule(window, this.expireToken);

        // comment in this like to auto-login to spotify
        // this.state.tokenInfo = Spotify.getTokenInfo(true);

        // this will not login directly but display a login button which redirects to spotify
        this.state.tokenInfo = Spotify.getTokenInfo(false);
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
        this.setState({
            playlistName: name
        });
    }

    async savePlaylist() {
        const trackURIs = [];
        this.state.playlistTracks.forEach((track) => {
            trackURIs.push(`spotify:track:${track.id}`);
        });
        console.log(trackURIs);
        this.setState({
            loading: true
        });
        await Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({
            playlistTracks: [],
            playlistName: 'New Playlist'
        });
        this.setState({
            loading: false
        });
        return trackURIs;
    }

    search(searchTerm) {
        console.log(`the search term: ${searchTerm}`);
        let _this = this;
        Spotify.search(searchTerm).then((newSearchResult) => {
            _this.setState({
                searchResult: newSearchResult
            });
        });
    }

    expireToken() {
        this.setState({
            tokenInfo: {
                accessToken: ''
            }
        });
        // TODO: alert user that token expired
        console.log(`token expired: ${this.state.tokenInfo}`);
    }

    render() {
        if (this.state.tokenInfo.accessToken === '') {
            return (
                <div>
                    <h1>Ja
                        <span className="highlight">mmm</span>
                        ing</h1>
                    <div className="App">
                        <Login spotify={Spotify} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Ja
                        <span className="highlight">mmm</span>
                        ing</h1>
                    <div className="App">
                        <SearchBar onSearch={this.search}/>
                        <div className="App-playlist">
                            <SearchResults onAdd={this.addTrack} searchResult={this.state.searchResult}/>
                            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} loading={this.state.loading} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}
