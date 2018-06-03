import React, { Component } from 'react';
import './Track.css';

export default class Track extends Component {
    renderAction(isRemoval) {
        const trackActionIcon = (isRemoval === true) ? '+' : '-';
        return (
            <a className='Track-action'>
                {trackActionIcon}
            </a>
        );
    }
    render() {
        console.log(this.props.track);
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>
                        {this.props.track.name}
                    </h3>
                    <p>
                        {this.props.track.artist}
                        |
                        {this.props.track.album}
                    </p>
                </div>
            </div>
        );
    }
}
