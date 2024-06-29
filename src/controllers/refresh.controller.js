import { serverConfig } from "../configs/server.config.js";
import jwt from 'jsonwebtoken';

const rToken = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, serverConfig.secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ name: user.name }, serverConfig.secretKey, { expiresIn: '15m' });
        res.json({ accessToken });
    });
}

export default rToken