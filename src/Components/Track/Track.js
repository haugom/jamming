import React, { Component } from 'react';
import './Track.css';

export default class Track extends Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(isRemoval) {
        const trackActionIcon = (isRemoval === false) ? '+' : '-';
        const method = (isRemoval === false) ? this.addTrack : this.removeTrack;
        return (
            <button onClick={method} className='Track-action'>
                {trackActionIcon}
            </button>
        );
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    render() {
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
                {this.renderAction(this.props.isRemoval)}
            </div>
        );
    }
}
