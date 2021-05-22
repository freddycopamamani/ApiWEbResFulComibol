import { Router } from 'express';
import empresaController from '../controllers/empresas.controller';

const router = Router();

router.post('/add', empresaController.addEmpresa);
router.get('/query/:id', empresaController.queryEmpresa);
router.get('/list', empresaController.listEmpresa);
router.put('/update/:id', empresaController.updateEmpresa);
router.delete('/remove/:id', empresaController.removeEmpresa);

export default router;
