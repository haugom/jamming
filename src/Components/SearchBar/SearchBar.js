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
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    handleKeyDown(event) {
        if (!event.repeat) {
            if (event.key === 'Enter') {
                this.props.onSearch(this.state.term);
            }
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} onKeyDown={this.handleKeyDown} placeholder="Enter A Song, Album, or Artist"/>
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}
