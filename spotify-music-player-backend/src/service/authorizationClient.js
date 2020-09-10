const axios = require('axios');
const qs = require('querystring');

const client = axios.create({
    baseURL: 'https://accounts.spotify.com'
});

const clientIdAndClientSecret = new Buffer("d35e8b8c8e1e468f95462ac8aa3d9867:2b5b1bb8d3dc4ad7bbc07da1e768a663");


module.exports = {

    accessToken(code){
        client.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        var data = qs.stringify({
            'grant_type': 'authorization_code',
            'code': code,
            'client_secret': '2b5b1bb8d3dc4ad7bbc07da1e768a663',
            'client_id': 'd35e8b8c8e1e468f95462ac8aa3d9867',
            'redirect_uri': 'http://localhost:9000/callback/' 
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