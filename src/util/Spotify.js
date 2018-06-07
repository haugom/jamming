const Spotify = (function() {
    // vars
    let tokenInfo, window, authUrl, clientId, redirectUri, corsProxy, spotifyApi,

    // public methods
    initModule, getTokenInfo, makeAuthorizeRequestToSpotify, searchSpotify, savePlaylist,

    // callback methods
    expireToken,

    //private methods
    checkForErrorInQuerystring, getStateFromQuerystring, getUrlParameter, getNormalUrlParameter,
        getTokenInfoFromHashQueryString, makeAuthorizationHeader;

    // initialize module with window + callback to call when token expires
    initModule = function($, expireTokenCallback) {
        window = $;
        authUrl = 'https://accounts.spotify.com/authorize';
        spotifyApi = 'https://api.spotify.com/v1';
        corsProxy = 'https://cors-anywhere.herokuapp.com/';
        tokenInfo = {
            accessToken: ''
        };
        clientId = '8add2c0fb68843499b39cbe112a360ed';
        redirectUri = encodeURIComponent(`${window.location.protocol}//${window.location.host}${window.location.pathname}`);
        expireToken = expireTokenCallback;
    };

    getTokenInfo = function(redirectToSpotify) {
        if (tokenInfo.accessToken !== '') {
            return tokenInfo;
        }

        const errorCode = checkForErrorInQuerystring();
        if (errorCode) {
            const state = getStateFromQuerystring();
            // TODO: show error message
            console.log(`is error: ${errorCode}, state: ${state}`);
        } else {
            const accessTokenPayload = getTokenInfoFromHashQueryString();
            if (accessTokenPayload) {
                tokenInfo = accessTokenPayload;
                setTimeout(expireToken, accessTokenPayload.expires_in * 1000);
                // used for testing...
                // setTimeout(expireToken, 5000);
            } else {
                if (redirectToSpotify === true) {
                    // redirect to spotify to authorize request
                    window.location.replace(makeAuthorizeRequestToSpotify());
                }
            }
        }

        return tokenInfo;
    };

    checkForErrorInQuerystring = function () {
        const error = getNormalUrlParameter('error');
        return error;
    };

    getStateFromQuerystring = function () {
        const state = getNormalUrlParameter('state');
        return state;
    };

    getTokenInfoFromHashQueryString = function () {
        let accessTokenPayload;
        if (window.location.hash.match(/^#/)) {
            const hashStringThatLooksLikeSearchString = `?${window.location.hash.substr(1)}`;
            const accessToken = getUrlParameter(hashStringThatLooksLikeSearchString, 'access_token');
            if (accessToken) {
                accessTokenPayload = {
                    access_token: accessToken,
                    token_type: getUrlParameter(hashStringThatLooksLikeSearchString, 'token_type'),
                    expires_in: getUrlParameter(hashStringThatLooksLikeSearchString, 'expires_in'),
                    state: getUrlParameter(hashStringThatLooksLikeSearchString, 'state')
                };
                // clean access_token from querystring
                window.history.pushState('access_token', null, '/');
            }
        }
        return accessTokenPayload;
    };

    makeAuthorizeRequestToSpotify = function() {
        return `${authUrl}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    };

    getNormalUrlParameter = function(nameParameter) {
        return getUrlParameter(window.location.search, nameParameter);
    };

    // function stolen from: https://davidwalsh.name/query-string-javascript
    getUrlParameter = function(queryString, nameParameter) {
        // eslint-disable-next-line
        let name = nameParameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(queryString);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    makeAuthorizationHeader = function() {
        return `Bearer ${tokenInfo.access_token}`;
    };

    searchSpotify = function(term) {
        // let token = tokenInfo.access_token;
        // console.log(`Spotify seach: ${term}  token: ${token}`);
        // debugger;

        return fetch(
            `${corsProxy}${spotifyApi}/search?type=track&q=${term}`, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Authorization': makeAuthorizationHeader()
            }
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map((track) => {
                    let spotifyTrack = {
                        id: track.id,
                        name: track.name,
                        album: track.album.name,
                        artitst: track.artists[0],
                        URI: track.uri
                    };
                    return spotifyTrack;
                });
            }
            return [];
        });
    };

    savePlaylist = async function(playlistName, tracks) {
        if (typeof playlistName === 'string' && Array.isArray(tracks) && tracks.length > 0) {

            let userId, playlistId;

            await fetch(
                `${corsProxy}${spotifyApi}/me`, {
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': makeAuthorizationHeader()
                    }
                }
            ).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                userId = jsonResponse.id;
            });
            console.log(`user id: ${userId}`);

            await fetch(
                `${corsProxy}${spotifyApi}/users/${userId}/playlists`, {
                    method: 'post',
                    body: JSON.stringify({
                        name: playlistName,
                        description: 'created with jamming project'
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': makeAuthorizationHeader()
                    }
                }
            ).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                playlistId = jsonResponse.id
            });
            console.log(`playlistId: ${playlistId}`);

            await fetch(
                `${corsProxy}${spotifyApi}/users/${userId}/playlists/${playlistId}/tracks`, {
                    method: 'post',
                    body: JSON.stringify({
                        uris: tracks
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': makeAuthorizationHeader()
                    }
                }
            );
        }
    };

    return {
        initModule: initModule,
        getTokenInfo: getTokenInfo,
        makeAuthorizeRequestToSpotify: makeAuthorizeRequestToSpotify,
        search: searchSpotify,
        savePlaylist: savePlaylist
    };
}());

export default Spotify;