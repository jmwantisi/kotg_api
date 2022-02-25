import dotenv from 'dotenv'
import eventsController from '../controllers/events_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/', eventsController.all);
router.post('/', eventsController.create);
router
    .route('/:id')
    .get(eventsController.getTeam)
    .patch(eventsController.update)
    .delete(eventsController.remove);

module.exports = router ;