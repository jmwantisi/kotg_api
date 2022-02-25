import dotenv from 'dotenv'
import teamController from '../controllers/teams_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/', teamController.all);
router.post('/', teamController.create);
router
    .route('/:id')
    .get(teamController.getTeam)
    .patch(teamController.update)
		.delete(teamController.remove);

router.get('/:team_id', teamController.fetchTeamMembers);
router.patch('/:id/add_member', teamController.addToTeam);

module.exports = router ;