import { Router } from 'express';
import { saveGame, getGames } from '../controllers/gamesController';

const router = Router();

router.post('/', saveGame);
router.get('/', getGames);

export default router;
