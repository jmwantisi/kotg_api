import dotenv from 'dotenv'
import memberTypesController from '../controllers/member_types_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/', memberTypesController.all);
router.post('/', memberTypesController.create);
router
    .route('/:id')
    .get(memberTypesController.getMemberTypes)
    .patch(memberTypesController.update)
		.delete(memberTypesController.remove);

module.exports = router ;