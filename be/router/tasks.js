const router = require('express').Router();
const tasksController = require('../controller/tasks')
const logMid = require('../middleware/logs');

router.post('/new', logMid.logger, tasksController.postTask);
router.get('/all', logMid.logger, tasksController.getAll);
router.delete('/:taskId', logMid.logger, tasksController.deleteTask);
router.post('/update', logMid.logger, tasksController.updateTask);

module.exports = router;