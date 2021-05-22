import { Router } from 'express';
import conductorController from '../controllers/conductor.controller';

const router = Router();

router.post('/add', conductorController.addConductor);
router.get('/query/:id', conductorController.queryConductor);
router.get('/list', conductorController.listConductor);
router.put('/update/:id', conductorController.updateConductor);
router.delete('/remove/:id', conductorController.removeConductor);

export default router;
