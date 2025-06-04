import { Router } from 'express';
import * as condominioController from '../controllers/condominio.controller';
import { validate } from '../middlewares/validate';
import { createCondominioSchema } from '../utils/validators/condominio.validator';

const router = Router();

router.get('/', condominioController.getAllCondominios);

router.post('/', validate(createCondominioSchema), condominioController.createCondominio);

router.get('/:id', condominioController.getCondominioById);

// Rota para listar unidades do condomínio
router.get('/:id/unidades', condominioController.getUnidadesByCondominio);

router.put('/:id', validate(createCondominioSchema), condominioController.updateCondominio);

router.delete('/:id', condominioController.deleteCondominio);

export default router;
