import dotenv from 'dotenv'
import memberController from '../controllers/members_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/', memberController.all);
router.post('/', memberController.create);
router
    .route('/:id')
    .get(memberController.getTeam)
    .patch(memberController.update)
    .delete(memberController.remove);

module.exports = router ;