import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick(event) {
        window.location.replace(this.props.spotify.makeAuthorizeRequestToSpotify());
    }

    render() {
        return (
            <div className="Login">
                <p>This is a simple test project I used to learn react.js</p>
                <p>It uses integration with spotify.com to search for songs and create playlist (in your spotify account).</p>
                <p>You will need a spotify account and grant access to this application to create playlist.</p>
                <p>If you would like to try it out, click button below to be redirected to spotify to login to spotify.</p>
                <div className='center'>
                    <button className='myButton' onClick={this.handleLoginClick} >Login to spotify</button>
                </div>
            </div>
        );
    }
}
