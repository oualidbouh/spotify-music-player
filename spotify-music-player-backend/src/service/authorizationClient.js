const axios = require('axios');
const qs = require('querystring');
const spotifyConf = require('../conf/spotify-conf');
const client = axios.create({
    baseURL: 'https://accounts.spotify.com'
});

const clientIdAndClientSecret = new Buffer(`${spotifyConf.clientId}:${spotifyConf.clientSecret}`);


module.exports = {

    accessToken(code){
        client.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        var data = qs.stringify({
            'grant_type': 'authorization_code',
            'code': code,
            'client_secret': spotifyConf.clientSecret,
            'client_id': spotifyConf.clientId,
            'redirect_uri': 'http://localhost:9000/callback/',
           });
        return client.post('/api/token', data);
    },

    async refreshToken(access_token){
        let base64data = clientIdAndClientSecret.toString('base64');
        const header = {'Authorization': `Basic ${base64data}`};
        client.headers = header;
        var data = qs.stringify({
            'refresh_token': access_token,
            'grant_type': 'refresh_token',
        });
        return client.post('/api/token',data, {headers:{'Authorization': `Basic ${base64data}`}});
    }
}