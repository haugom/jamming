import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({term: event.target.valueOf});
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist"/>
                <a>SEARCH</a>
            </div>
        );
    }
}