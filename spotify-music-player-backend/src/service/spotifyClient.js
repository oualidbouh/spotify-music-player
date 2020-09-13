const axios = require('axios');

const client = axios.create({
    baseURL: 'https://api.spotify.com'
});


module.exports = {

    getCurrentlyPlayingTrack(access_token){
        return client.get('/v1/me/player', {headers:{'Authorization': `Bearer ${access_token}`}});
    },    
    getCurrentDevice(access_token){
        return client.get('/v1/me/player/devices', {headers:{'Authorization': `Bearer ${access_token}`}});
    },
    next(access_token){
        return client.post('/v1/me/player/next', {},{headers:{'Authorization': `Bearer ${access_token}`}});
    },
    previous(access_token){
        return client.post('/v1/me/player/previous', {},{headers:{'Authorization': `Bearer ${access_token}`}});
    },
    play(access_token){
        return client.put('/v1/me/player/play', {},{headers:{'Authorization': `Bearer ${access_token}`}});
    },
    pause(access_token){
        return client.put('/v1/me/player/pause', {},{headers:{'Authorization': `Bearer ${access_token}`}});
    },
    shuffle(access_token, status){
        return client.put('/v1/me/player/shuffle?state='+status, {},{headers:{'Authorization': `Bearer ${access_token}`}});
    },
    repeate(access_token, status){
        return client.put('/v1/me/player/repeat?state='+ status, {}, {headers:{'Authorization': `Bearer ${access_token}`}});
    }
}