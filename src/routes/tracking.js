import express from 'express';


const route = express.Router();

route.post('/', (req, res) => {
    console.log(req.get('User-Agent'))
    res.send(req.get('User-Agent'))
})

export default route