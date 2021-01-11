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
        console.log("number: ", number[0])
        const stepper = await api.get(`/clients/stepper/${number[0]}`);
        console.log("stepper: ", stepper.data)
        return stepper;
    },
    updateStepper: async (msg, client) => {
        console.log("entrou no update")
        const from = msg.from
        const number = from.split('@');
        const response = await api.put(`/clients/stepper`, {
            from: number[0],
            client: client
        });
        return response;
    },
    resetSteppper: async (req) => {
        const from = req.from
        const number = from.split('@');
        await api.put(`/clients/stepper/reset/${number[0]}`);
    },
}

module.exports = onMessage