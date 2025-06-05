import { Router } from 'express';
import visitanteRoutes from './visitante.routes';
import condominioRoutes from './condominio.route';
import unidadeRoutes from './unidade.route';
import movimentacaoRoutes from './movimentacoes.route';

export const router = Router();

router.use('/visitantes', visitanteRoutes);
router.use('/condominios', condominioRoutes);
router.use('/unidades', unidadeRoutes);
router.use('/movimentacoes', movimentacaoRoutes);

export default router;