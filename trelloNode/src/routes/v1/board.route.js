import express from 'express';
import { HttpStatusCode } from '../../utils/constants';
import { boardController } from '../../controllers/board.controller';
import { boardValidation } from '../../validations/board.validation';
const router = express.Router();

router.route('/').post(boardValidation.createNew, boardController.createNew);

router.route('/:id').get(boardController.getBoards);
export const boardRoute = router;
