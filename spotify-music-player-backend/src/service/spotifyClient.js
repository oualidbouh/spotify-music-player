const axios = require('axios');

const client = axios.create({
    baseURL: 'https://api.spotify.com'
});


module.exports = {

    getCurrentlyPlayingTrack(access_token){
        return client.get('/v1/me/player/currently-playing', {headers:{'Authorization': `Bearer ${access_token}`}});
    }

}