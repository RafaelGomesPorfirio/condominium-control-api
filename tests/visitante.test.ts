import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/services/prisma';

describe('Visitante Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.visitante.deleteMany();
  });

  it('should create a new visitante', async () => {
    const response = await request(app)
      .post('/api/visitantes')
      .send({
        nomeVisitante: 'João Silva',
        documentoVisitante: '12345678901',
        telefoneVisitante: '11999999999'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nomeVisitante).toBe('João Silva');
  });

  it('should get all visitantes', async () => {
    await prisma.visitante.create({
      data: {
        nomeVisitante: 'Maria Souza',
        documentoVisitante: '10987654321',
        telefoneVisitante: '11988888888'
      }
    });

    const response = await request(app).get('/api/visitantes');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nomeVisitante).toBe('Maria Souza');
  });
});
