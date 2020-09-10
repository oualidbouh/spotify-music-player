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
