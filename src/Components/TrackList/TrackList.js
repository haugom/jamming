import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

export default class TrackList extends Component {
    render() {
        if (this.props.searchResult) {
            return (
                <div className="TrackList">
                    {
                        this.props.searchResult.map((track) => {
                            return (<Track key={track.id} track={track}/>);
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
