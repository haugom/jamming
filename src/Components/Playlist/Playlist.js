import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export default class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue="{New Playlist}"/>
                <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    }
}
