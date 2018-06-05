import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export default class Playlist extends Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName} />
                <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
                <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
            </div>
        );
    }
}