const api = require('../config/index');

const onMessage = {
    existsClientFromDb: async (req, res) => {
        const from = req.from
        const number = from.split('@');
        const exists = await api.post('/clients/filter', {
            from: number[0]
        });
        return exists;
    },
    verifyStepper: async (req) => {
        const from = req.from
        const number = from.split('@');
        const stepper = await api.get(`/clients/stepper/${number[0]}`);
        return stepper;
    },
    updateStepper: async (req) => {
        const from = req.from
        await api.put(`/clients/stepper/${from}`); 
    },
    resetSteppper: async (req) => {
        const from = req.from
        await api.put(`/clients/stepper/${from}`); 
    },
}

module.exports = onMessage