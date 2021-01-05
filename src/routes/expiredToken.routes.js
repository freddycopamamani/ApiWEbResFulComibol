import {Router} from 'express';
import ExpiredTokenController from '../controllers/expiredToken.controller';

const router = Router();

router.post('/refresh-access-token', ExpiredTokenController.refreshAccessToken);

export default router;
