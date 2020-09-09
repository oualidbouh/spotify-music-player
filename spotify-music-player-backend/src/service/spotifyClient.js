const axios = require('axios');
const qs = require('querystring');
const client = axios.create({
    baseURL: 'https://accounts.spotify.com',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      }
  });

module.exports = {
    getAcessToken(code){
        var data = qs.stringify({
            'grant_type': 'authorization_code',
           'code': code,
           'client_secret': '2b5b1bb8d3dc4ad7bbc07da1e768a663',
           'client_id': 'd35e8b8c8e1e468f95462ac8aa3d9867',
           'redirect_uri': 'http://localhost:9000/callback/' 
           });
        return client.post('/api/token', data);
    }
}