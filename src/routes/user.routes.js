import { Router } from 'express';
import { authJwt, verifySignup } from '../middleware'
const router = Router();

import * as userCtrl from '../controllers/user.controller';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted], userCtrl.createUser);

export default router;