import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/services/prisma';

describe('Visitante API', () => {
  beforeAll(async () => {
    await prisma.visitante.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/visitantes', () => {
    it('deve criar um novo visitante', async () => {
      const res = await request(app)
        .post('/api/visitantes')
        .send({
          nome: 'Visitante Teste',
          documento: '12345678901',
          telefone: '11999999999',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nome).toBe('Visitante Teste');
    });

    it('deve retornar erro 400 para documento duplicado', async () => {
      const res = await request(app)
        .post('/api/visitantes')
        .send({
          nome: 'Visitante Teste 2',
          documento: '12345678901',
          telefone: '11999999999',
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/visitantes', () => {
    it('deve retornar todos os visitantes', async () => {
      const res = await request(app).get('/api/visitantes');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });
  });
});