import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/services/prisma';

describe('Movimentacao Controller', () => {
  let visitanteId: number;
  let unidadeId: number;
  let movimentacaoId: number;

  beforeAll(async () => {
    await prisma.movimentacao.deleteMany();
    await prisma.visitante.deleteMany();
    await prisma.unidade.deleteMany();
    await prisma.condominio.deleteMany();

    const condominio = await prisma.condominio.create({
      data: {
        nomeCondominio: 'Condomínio Teste',
        enderecoCondominio: 'Endereço Teste'
      }
    });

    const unidade = await prisma.unidade.create({
      data: {
        numeroUnidade: '101',
        condominioId: condominio.id
      }
    });
    unidadeId = unidade.id;

    const visitante = await prisma.visitante.create({
      data: {
        nomeVisitante: 'Visitante Teste',
        documentoVisitante: '12345678901'
      }
    });
    visitanteId = visitante.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new movimentacao', async () => {
    const response = await request(app)
      .post('/api/movimentacoes')
      .send({
        visitanteId,
        unidadeId
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.visitanteId).toBe(visitanteId);
    expect(response.body.unidadeId).toBe(unidadeId);
    expect(response.body.saida).toBeNull();
    movimentacaoId = response.body.id;
  });

  it('should fail to create movimentacao for visitor with open movimentacao', async () => {
    const response = await request(app)
      .post('/api/movimentacoes')
      .send({
        visitanteId,
        unidadeId
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('já possui uma movimentação em aberto');
  });

  it('should get movimentacao by id', async () => {
    const response = await request(app).get(`/api/movimentacoes/${movimentacaoId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(movimentacaoId);
  });

  it('should update movimentacao to close it', async () => {
    const response = await request(app)
      .put(`/api/movimentacoes/${movimentacaoId}`)
      .send({
        saida: new Date().toISOString()
      });
    
    expect(response.status).toBe(200);
    expect(response.body.saida).not.toBeNull();
  });

  it('should get filtered movimentacoes', async () => {
    
    const response = await request(app)
      .get('/api/movimentacoes')
      .query({
        dataInicio: new Date(0).toISOString(), 
        dataFim: new Date().toISOString(),
        visitanteId
      });
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); 
    expect(response.body[0].id).toBe(movimentacaoId); 
  });

  it('should delete movimentacao', async () => {
    const response = await request(app).delete(`/api/movimentacoes/${movimentacaoId}`);
    expect(response.status).toBe(200);
    
    const checkResponse = await request(app).get(`/api/movimentacoes/${movimentacaoId}`);
    expect(checkResponse.status).toBe(404);
  });
});