import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import Spinner from '../Spinner/Spinner';

export default class Playlist extends Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        const loading = this.props.loading ? (<Spinner/>) : '';
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName} />
                <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
                <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
                {loading}
            </div>
        );
    }
}
