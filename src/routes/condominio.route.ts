import { Router } from 'express';
import * as condominioController from '../controllers/condominio.controller';
import { validate } from '../middlewares/validate';
import { createCondominioSchema, updateCondominioSchema } from '../utils/validators/condominio.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Condomínios
 *   description: Gerenciamento de condomínios
 */

/**
 * @swagger
 * /condominios:
 *   get:
 *     summary: Lista todos os condomínios
 *     tags: [Condomínios]
 *     responses:
 *       200:
 *         description: Lista de condomínios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Condominio'
 */
router.get('/', condominioController.getAllCondominios);

/**
 * @swagger
 * /condominios/with-unidades:
 *   get:
 *     summary: Lista todos os condomínios com suas unidades
 *     tags: [Condomínios]
 *     responses:
 *       200:
 *         description: Lista de condomínios com unidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondominioWithUnidades'
 */
router.get('/with-unidades', condominioController.getAllCondominiosWithUnidades);

/**
 * @swagger
 * /condominios/{id}:
 *   get:
 *     summary: Obtém um condomínio pelo ID
 *     tags: [Condomínios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Condomínio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condominio'
 *       404:
 *         description: Condomínio não encontrado
 */
router.get('/:id', condominioController.getCondominioById);

/**
 * @swagger
 * /condominios:
 *   post:
 *     summary: Cria um novo condomínio
 *     tags: [Condomínios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CondominioInput'
 *     responses:
 *       201:
 *         description: Condomínio criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condominio'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', validate(createCondominioSchema), condominioController.createCondominio);

/**
 * @swagger
 * /condominios/{id}:
 *   put:
 *     summary: Atualiza um condomínio
 *     tags: [Condomínios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do condomínio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CondominioInput'
 *     responses:
 *       200:
 *         description: Condomínio atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condominio'
 *       404:
 *         description: Condomínio não encontrado
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', validate(updateCondominioSchema), condominioController.updateCondominio);

/**
 * @swagger
 * /condominios/{id}:
 *   delete:
 *     summary: Remove um condomínio
 *     tags: [Condomínios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Condomínio removido com sucesso
 *       404:
 *         description: Condomínio não encontrado
 */
router.delete('/:id', condominioController.deleteCondominio);

export default router;