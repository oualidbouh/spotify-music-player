const express = require('express');
const app = express();
const log = console.log;
const spotifyClient = require('./service/spotifyClient');
const session = require('express-session');


app.listen(9000,()=>{
    log('app listning to port 9000');
});

app.use(session({
    secret: 'fiverr',
    code: '',
    access_token: '',
}));

app.get('/callback',(req)=>{
    req.session.code = req.query.code;
    console.log(req.query.code);
    spotifyClient.accessToken(req.query.code).then(token => {
        console.log(token.data.expires_in);
        req.session.access_token = token.data.access_token;
        req.session.refresh_token = token.data.refresh_token;
    }).catch(err=>{
        console.error(err);
    });

    setInterval(()=>{
        spotifyClient.refreshToken(req.session.refresh_token).then((token) => {
            console.log(token.data.expires_in);
            req.session.access_token = token.data.access_token;
            console.log('token refreshed...')
        }).catch(err=>{
            console.error(err);
        });
    }, 1_800_00);
});