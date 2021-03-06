import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export default class SearchResults extends Component {

    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList onAdd={this.props.onAdd} isRemoval={false} tracks={this.props.searchResult}/>
            </div>
        );
    }
}
