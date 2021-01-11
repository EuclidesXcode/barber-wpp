const axios = require('axios');

const api = axios.create({
    baseURL: 'http://front-zoox.herokuapp.com',
    headers: {
        'content-type': 'application/json'
    }
});

module.exports = api;