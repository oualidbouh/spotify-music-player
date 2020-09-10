const express = require('express');
const app = express();
const log = console.log;
const authorizationClient = require('./service/authorizationClient');
const spotifyClient = require('./service/spotifyClient');
const session = require('express-session');

global.access_token = '';

app.listen(9000,()=>{
    log('app listning to port 9000');
});

app.use(session({
    secret: 'fiverr',
    saveUninitialized: true,
    resave: true,
    path : '/'
}));

app.get('/callback', (req, res)=>{
    req.session.code = req.query.code;
    console.log(req.query.code);
    authorizationClient.accessToken(req.query.code).then(token => {
        req.session.access_token = token.data.access_token;
        req.session.refresh_token = token.data.refresh_token;
        access_token = req.session.access_token;
        req.session.save(function(err) {
            console.log('session saved...');
        });
    }).catch(err=>{
        console.error(err);
    });

    //await refreshToken(req);
    res.redirect('http://localhost:8080/');
});

app.get('/currently-playing', (req, res)=>{
    console.error('Current music');
    spotifyClient.getCurrentlyPlayingTrack(access_token).then(response => {
        res.send(response.data);
    }).catch(err=>{
        console.error(err);
    });
});

async function refreshToken(req) {
    setInterval(() => {
        authorizationClient.refreshToken(req.session.refresh_token).then((token) => {
            console.log(token.data.expires_in);
            req.session.access_token = token.data.access_token;
            req.session.save(function(err) {
                // session saved
                console.log('session saved...');
              });
            console.log('token refreshed...');
        }).catch(err => {
            console.error(err);
        });
    }, 180000);
}

app.get('/action',(req,res)=>{
    switch(req.query.action){
        case 'next':
            spotifyClient.next(access_token).then((response)=>{
                res.send(response);
            }).catch(err=>{
                res.send(err);
            });
            break;
        case 'previous':
            spotifyClient.previous(access_token).then((response)=>{
                res.send(response);
            }).catch(err=>{
                res.send(err);
            });
            break;
        case 'play':
            spotifyClient.play(access_token).then((response)=>{
                res.send(response);
            }).catch(err=>{
                res.send(err);
            });
            break;
            case 'pause':
                spotifyClient.pause(access_token).then((response)=>{
                    res.send(response);
                }).catch(err=>{
                    res.send(err);
                });
                break;
        case 'shuffle':
            spotifyClient.flush(access_token).then((response)=>{
                res.send(response);
            }).catch(err=>{
                res.send(err);
            });
            break;
        case 'repeate' :
            spotifyClient.repeate(access_token,req.query.context).then((response)=>{
                res.send(response);
            }).catch(err=>{
                res.send(err);
            });
            break;
        default : console.log('no action matched...');
    }
})

//user-read-currently-playing%20user-read-playback-position%20user-read-private%20user-read-email%20playlist-read-private%20user-library-read%20user-library-modify%20user-top-read%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20user-follow-read%20user-follow-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played
//https://accounts.spotify.com/fr/authorize?client_id=d35e8b8c8e1e468f95462ac8aa3d9867&response_type=code&redirect_uri=http:%2F%2Flocalhost:9000%2Fcallback%2F&scope=user-read-currently-playing%20user-read-playback-position%20user-read-private%20user-read-email%20playlist-read-private%20user-library-read%20user-library-modify%20user-top-read%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20user-follow-read%20user-follow-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played