/**
 * @swagger
 * tags:
 *   name: Visitantes
 *   description: Gerenciamento de visitantes
 */

import { Router } from 'express';
import * as visitanteController from '../controllers/visitante.controller';
import { validate } from '../middlewares/validate';
import { createVisitanteSchema } from '../utils/validators/visitante.validator';

const router = Router();

/**
 * @swagger
 * /visitantes:
 *   get:
 *     summary: Lista todos os visitantes
 *     tags: [Visitantes]
 *     responses:
 *       200:
 *         description: Lista de visitantes.
 */
router.get('/', visitanteController.getAllVisitantes);

/**
 * @swagger
 * /visitantes:
 *   post:
 *     summary: Cria um novo visitante
 *     tags: [Visitantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - documento
 *             properties:
 *               nome:
 *                 type: string
 *               documento:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visitante criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 */
router.post('/', validate(createVisitanteSchema), visitanteController.createVisitante);

/**
 * @swagger
 * /visitantes/{id}:
 *   get:
 *     summary: Busca um visitante por ID
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do visitante
 *     responses:
 *       200:
 *         description: Visitante encontrado.
 *       404:
 *         description: Visitante não encontrado.
 */
router.get('/:id', visitanteController.getVisitanteById);

/**
 * @swagger
 * /visitantes/{id}:
 *   put:
 *     summary: Atualiza um visitante
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do visitante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               documento:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visitante atualizado.
 *       404:
 *         description: Visitante não encontrado.
 */
router.put('/:id', validate(createVisitanteSchema), visitanteController.updateVisitante);

/**
 * @swagger
 * /visitantes/{id}:
 *   delete:
 *     summary: Remove um visitante
 *     tags: [Visitantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do visitante
 *     responses:
 *       200:
 *         description: Visitante removido com sucesso.
 *       404:
 *         description: Visitante não encontrado.
 */
router.delete('/:id', visitanteController.deleteVisitante);

export default router;
