const express = require('express');
const app = express();
const log = console.log;
const spotifyClient = require('./service/spotifyClient');

const baseURL = 'https://accounts.spotify.com/';


app.listen(9000,()=>{
    log('app listning to port 9000');
});

app.get('/',(req,res)=>{

});
//d35e8b8c8e1e468f95462ac8aa3d9867
app.get('/callback',(req,res)=>{
    console.log(req.query.code);
    spotifyClient.getAcessToken(req.query.code).then(res => {
        console.log(res);
    }).catch(err=>{
        console.log('##############')
        console.error(err);
    })
});