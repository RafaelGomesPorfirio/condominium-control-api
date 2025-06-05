import { Router } from 'express';
import * as unidadeController from '../controllers/unidade.controller';
import { validate } from '../middlewares/validate';
import { createUnidadeSchema, updateUnidadeSchema } from '../utils/validators/unidade.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Unidades
 *   description: Gerenciamento de unidades
 */

/**
 * @swagger
 * /unidades:
 *   get:
 *     summary: Lista todas as unidades
 *     tags: [Unidades]
 *     responses:
 *       200:
 *         description: Lista de unidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unidade'
 */
router.get('/', unidadeController.getAllUnidades);

/**
 * @swagger
 * /unidades/condominio/{condominioId}:
 *   get:
 *     summary: Lista unidades de um condomínio
 *     tags: [Unidades]
 *     parameters:
 *       - in: path
 *         name: condominioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Lista de unidades do condomínio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unidade'
 */
router.get('/condominio/:condominioId', unidadeController.getUnidadesByCondominio);

/**
 * @swagger
 * /unidades/{id}:
 *   get:
 *     summary: Obtém uma unidade pelo ID
 *     tags: [Unidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da unidade
 *     responses:
 *       200:
 *         description: Unidade encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unidade'
 *       404:
 *         description: Unidade não encontrada
 */
router.get('/:id', unidadeController.getUnidadeById);

/**
 * @swagger
 * /unidades:
 *   post:
 *     summary: Cria uma nova unidade
 *     tags: [Unidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnidadeInput'
 *     responses:
 *       201:
 *         description: Unidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unidade'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', validate(createUnidadeSchema), unidadeController.createUnidade);

/**
 * @swagger
 * /unidades/{id}:
 *   put:
 *     summary: Atualiza uma unidade
 *     tags: [Unidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da unidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnidadeInput'
 *     responses:
 *       200:
 *         description: Unidade atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unidade'
 *       404:
 *         description: Unidade não encontrada
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', validate(updateUnidadeSchema), unidadeController.updateUnidade);

/**
 * @swagger
 * /unidades/{id}:
 *   delete:
 *     summary: Remove uma unidade
 *     tags: [Unidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da unidade
 *     responses:
 *       200:
 *         description: Unidade removida com sucesso
 *       404:
 *         description: Unidade não encontrada
 */
router.delete('/:id', unidadeController.deleteUnidade);

export default router;