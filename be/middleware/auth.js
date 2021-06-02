const jwt = require('jsonwebtoken');
const jwtSKEy = process.env.JWT_S_KEY;

exports.checkAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (req.method === 'OPTIONS') {
        res.status(200).send()
    } else {
        if(!token) {
            res.status('401').send({status: 'failed', message: 'Absent token'})
        }
    
        try {
            jwt.verify(token, jwtSKEy, (fail, decodedPayload) => {
                if (fail) {
                    res.status(401).send({status: 'failed', message: 'Invalid token'})
                } else {
                    res.userId = decodedPayload.id;
                    next();
                }
            });
        } catch(err) {
            // err
        }
    }
}