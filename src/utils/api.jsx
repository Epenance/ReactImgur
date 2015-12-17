var Fetch = require('whatwg-fetch'),
    rootUrl = 'https://api.imgur.com/3/',
    apiKey = 'ebf7422895d6424';

module.exports = {
    get: function(url) {
        return fetch(rootUrl + url, {
            headers: {
                'Authorization': 'Client-ID ' + apiKey
            }
        })
        .then(function(response) {
            return response.json();
        })
    }
};