import { Router } from 'express';
//import { authJwt, verifySignup } from '../middleware'
import {ensureAuth} from '../middleware/authenticated';
const router = Router();
import multipart  from 'connect-multiparty';

const md_upload_Avatar = multipart({ uploadDir: "./src/uploads/avatar"});

import * as userCtrl from '../controllers/user.controller';

router.get('/',  userCtrl.getUsers);
router.get('/active', userCtrl.getUsersActive);
router.get('/:id', userCtrl.getUsuarioById);
router.put('/update/:id',  userCtrl.updateUser);
router.put('/activate/:id',  userCtrl.activateUser);
router.delete('/delete/:id',  userCtrl.deleteUser);
router.post('/',  userCtrl.crearUserAdmin);
router.put('/upload-avatar/:id', [md_upload_Avatar], userCtrl.uploadAvatar);
router.get('/get-avatar/:avatarName', userCtrl.getAvatar)

export default router;
