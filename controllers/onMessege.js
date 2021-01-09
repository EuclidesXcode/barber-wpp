const api = require('../config/index')

const onMessage = {
    receiveMessage: async (req, res) => {
        const from = req.from
        const number = from.split('@');
        const existe = await api.post('/clients/filter', {
            from: number[0]
        });
        return existe;
    }
}

module.exports = onMessage