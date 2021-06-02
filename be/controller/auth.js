const users = require('../model/users');
const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

const bcrypt = require('bcrypt');

exports.registerPost = async (req, res) => {

    let { email, pass } = req.body;
    
    pass = await bcrypt.hash(pass, 10);
    
    const newUser = new users ({ email, pass });

    users.findOne({email: req.body.email}, (err, doc) => {
        if (err) {
            res.send({status:'failed', message: err})
        } else if (doc != null) {
            res.status(406).send({status:'failed', message: 'User already exists'})
        } else {
            newUser.save((err, docs) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({status: 'success', message: 'User registered!'})
                }
            })
        }
    })
}

exports.loginPost = (req, res) => {
    let {email, pass} = req.body;

    users.findOne({email}, async (err, doc) => {
        if (err) {
            res.send({status:'failed', message: err})
        } else if (doc == null) {
            res.status(406).send({status:'failed', message: 'Wrong credentials'})
        } else {

            const match = await bcrypt.compare(pass, doc.pass);

            if (match) {
                // create the token and send to backend
                console.log(jwtSKey);
                const token = jwt.sign({id:doc._id}, jwtSKey, {expiresIn:'1d'});
                res.send({status: 'success', message: 'User logged in successfully', token})
            } else {
                res.send({status: 'failed', message: err})
            }
        }
    })
}



