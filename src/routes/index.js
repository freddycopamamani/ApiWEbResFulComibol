import { Router } from 'express';
import vehiculoRouter from './vehiculos.routes';
import conductorRouter from './conductores.routes';
import empresaRouter from './empresa.routes';

const router = Router();

router.use('/vehiculo', vehiculoRouter);
router.use('/conductor', conductorRouter);
router.use('/empresa', empresaRouter)

export default router;
