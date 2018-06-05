const Spotify = (function() {
    // vars
    let accessToken, window;

    // public methods
    let getAccessToken, initModule;

    //private methods
    let checkForError, getState, getUrlParameter, getAccessTokenFromQuerystring, hasAccessToken;

    initModule = function($) {
        window = $;
    };

    getAccessToken = function() {
        if (accessToken) {
            return accessToken;
        }

        const errorCode = checkForError();

        if (errorCode) {
            const state = getState();
            console.log(`is error: ${errorCode}, state: ${state}`);
        } else {
            console.log('is not error');
            const accessTokenPayload = getAccessTokenFromQuerystring();
            console.log(accessTokenPayload);
        }
    };

    checkForError = function () {
        const error = getUrlParameter('error');
        return error;
    };

    getState = function () {
        const state = getUrlParameter('state');
        return state;
    };

    // function stolen from: https://davidwalsh.name/query-string-javascript
    // needs more work. only checks search and not hash.
    // hmm.
    getUrlParameter = function(nameParameter) {
        // eslint-disable-next-line
        let name = nameParameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    getAccessTokenFromQuerystring = function () {
        const accessToken = getUrlParameter('access_token');
        let accessTokenPayload;
        if (accessToken) {
            accessTokenPayload = {
                access_token: accessToken,
                token_type: getUrlParameter('token_type'),
                expires_in: getUrlParameter('expires_in'),
                state: getUrlParameter('state')
            };
        }
        return accessTokenPayload;
    };

    return {
        initModule: initModule,
        getAccessToken: getAccessToken
    };
}());

export default Spotify;