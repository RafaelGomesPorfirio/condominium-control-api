import { Router } from 'express';
import visitanteRoutes from './visitante.routes';
import condominioRoutes from './condominio.route';

export const router = Router();

router.use('/visitantes', visitanteRoutes);
router.use('/condominios', condominioRoutes);

export default router;