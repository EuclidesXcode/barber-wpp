const api = require('../config/index');

const onMessage = {
    existsNumberFromDb: async (req, res) => {
        const from = req.from
        const number = from.split('@');
        const exists = await api.post('/clients/filter', {
            from: number[0]
        });
        return exists;
    },
    verifyStepper: async (from) => {
        const stepper = await api.get(`/clients/stepper/${from}`);
        return stepper;
    },
    updateStepper: async (from) => {
        await api.put(`/clients/stepper/${from}`); 
    },
    resetSteppper: async (from) => {
        await api.put(`/clients/stepper/${from}`); 
    },
}

module.exports = onMessage