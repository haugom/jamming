import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

export default class TrackList extends Component {
    render() {
        if (this.props.tracks) {
            return (
                <div className="TrackList">
                    {
                        this.props.tracks.map((track) => {
                            return (<Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} key={track.id} track={track}/>);
                        })
                    }
                </div>

            );
        } else {
            return (
                <div className="TrackList"/>
            );
        }
    }
}
