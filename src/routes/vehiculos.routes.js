import { Router } from 'express';
import vehiculoController from '../controllers/Vehiculo.Controller';

const router = Router();

router.post('/add', vehiculoController.addVehiculo);
router.get('/query/:id', vehiculoController.queryVehiculo);
router.get('/list', vehiculoController.listVehiculo);
router.put('/update/:id', vehiculoController.updateVehiculo);
router.delete('/remove/:id', vehiculoController.removeVehiculo);

export default router;
