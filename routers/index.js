const express = require('express');
const routers = express.Router();
const botService = require('../services/wserver')

routers.post('/send', (req, res) => {
    botService.sendMessage(req, res)
})

module.exports = routers