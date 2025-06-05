import { Router } from 'express';
import * as movimentacaoController from '../controllers/movimentacao.controller';
import { 
  createMovimentacaoSchema, 
  updateMovimentacaoSchema, 
  filterMovimentacaoSchema 
} from '../utils/validators/movimentacao.validator';
import { validate } from '../middlewares/validate';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movimentações
 *   description: Gerenciamento de movimentações de visitantes
 */

/**
 * @swagger
 * /movimentacoes:
 *   get:
 *     summary: Lista movimentações com filtros
 *     tags: [Movimentações]
 *     parameters:
 *       - in: query
 *         name: dataInicio
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de início para filtro
 *       - in: query
 *         name: dataFim
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de fim para filtro
 *       - in: query
 *         name: visitanteId
 *         schema:
 *           type: integer
 *         description: ID do visitante
 *       - in: query
 *         name: unidadeId
 *         schema:
 *           type: integer
 *         description: ID da unidade
 *       - in: query
 *         name: somenteAbertas
 *         schema:
 *           type: boolean
 *         description: Retornar apenas movimentações abertas
 *     responses:
 *       200:
 *         description: Lista de movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movimentacao'
 */
router.get('/', validate(filterMovimentacaoSchema), movimentacaoController.getMovimentacoes);

/**
 * @swagger
 * /movimentacoes/{id}:
 *   get:
 *     summary: Obtém uma movimentação pelo ID
 *     tags: [Movimentações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da movimentação
 *     responses:
 *       200:
 *         description: Movimentação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movimentacao'
 *       404:
 *         description: Movimentação não encontrada
 */
router.get('/:id', movimentacaoController.getMovimentacao);

/**
 * @swagger
 * /movimentacoes:
 *   post:
 *     summary: Cria uma nova movimentação
 *     tags: [Movimentações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovimentacaoInput'
 *     responses:
 *       201:
 *         description: Movimentação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movimentacao'
 *       400:
 *         description: Dados inválidos ou visitante já possui movimentação aberta
 */
router.post('/', validate(createMovimentacaoSchema), movimentacaoController.createMovimentacao);

/**
 * @swagger
 * /movimentacoes/{id}:
 *   put:
 *     summary: Atualiza uma movimentação
 *     tags: [Movimentações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da movimentação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovimentacaoUpdate'
 *     responses:
 *       200:
 *         description: Movimentação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movimentacao'
 *       404:
 *         description: Movimentação não encontrada
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', validate(updateMovimentacaoSchema), movimentacaoController.updateMovimentacao);

/**
 * @swagger
 * /movimentacoes/{id}:
 *   delete:
 *     summary: Remove uma movimentação
 *     tags: [Movimentações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da movimentação
 *     responses:
 *       200:
 *         description: Movimentação removida com sucesso
 *       404:
 *         description: Movimentação não encontrada
 */
router.delete('/:id', movimentacaoController.deleteMovimentacao);

export default router;