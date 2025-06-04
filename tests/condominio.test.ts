import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

describe('Condominio API', () => {
  beforeAll(async () => {
    await prisma.condominio.deleteMany();
  });

  afterEach(async () => {
    await prisma.condominio.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /condominios', () => {
    it('should create a new condominio', async () => {
      const response = await request(app)
        .post('/condominios')
        .send({
          nome: 'Condomínio Teste',
          endereco: 'Rua Teste, 123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe('Condomínio Teste');
    });

    it('should return 400 for invalid data', async () => {
      await request(app)
        .post('/condominios')
        .send({
          nome: 'C', // muito curto
          endereco: 'R', // muito curto
        })
        .expect(400);
    });
  });

  // Adicione mais testes para as outras rotas...
});