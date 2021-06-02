const logModel = require('../model/logs')

exports.logger = (req, res, next) => {
    const log = new logModel({
        dateTime: Date.now(),
        path: req.originalUrl
    })

    log.save((err, docs) => {
        if (err) {
            res.status(500).send({status: 'failed', message: 'Please try again', data: err.errors})
        } else {
            req.logId = docs._id;
            next();
        }
    })
}