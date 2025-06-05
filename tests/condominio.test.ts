import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/services/prisma';

interface Condominio {
  id: number;
  nomeCondominio: string;
  enderecoCondominio: string;
}

describe('Condominio Controller', () => {
  beforeAll(async () => {
    await prisma.movimentacao.deleteMany();
    await prisma.unidade.deleteMany();
    await prisma.condominio.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.movimentacao.deleteMany();
    await prisma.unidade.deleteMany();
    await prisma.condominio.deleteMany();
  });

  it('should create a new condominio', async () => {
    const response = await request(app)
      .post('/api/condominios')
      .send({
        nomeCondominio: 'Residencial Primavera',
        enderecoCondominio: 'Rua das Flores, 123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nomeCondominio).toBe('Residencial Primavera');
    expect(response.body.enderecoCondominio).toBe('Rua das Flores, 123');
  });

  it('should fail to create condominio with invalid data', async () => {
    const response = await request(app)
      .post('/api/condominios')
      .send({
        nomeCondominio: '', 
        enderecoCondominio: 'Rua das Flores, 123'
      });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeInstanceOf(Array);
  });

  it('should get all condominios', async () => {
    await prisma.condominio.createMany({
      data: [
        {
          nomeCondominio: 'Condomínio Solar',
          enderecoCondominio: 'Avenida Central, 456'
        },
        {
          nomeCondominio: 'Residencial Verde',
          enderecoCondominio: 'Rua das Árvores, 789'
        }
      ]
    });

    const response = await request(app).get('/api/condominios');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    
    const condominios = response.body as Condominio[];
    expect(condominios.some(c => c.nomeCondominio === 'Condomínio Solar')).toBe(true);
    expect(condominios.some(c => c.nomeCondominio === 'Residencial Verde')).toBe(true);
  });

  it('should get condominio by id', async () => {
    const createdCondominio = await prisma.condominio.create({
      data: {
        nomeCondominio: 'Condomínio para Busca',
        enderecoCondominio: 'Rua Busca, 123'
      }
    });

    const response = await request(app).get(`/api/condominios/${createdCondominio.id}`);
    expect(response.status).toBe(200);
    
    const condominio = response.body as Condominio;
    expect(condominio.id).toBe(createdCondominio.id);
    expect(condominio.nomeCondominio).toBe('Condomínio para Busca');
    expect(condominio.enderecoCondominio).toBe('Rua Busca, 123');
  });

  it('should return 404 for non-existent condominio', async () => {
    const response = await request(app).get('/api/condominios/999999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/não encontrado/i);
  });

  it('should update condominio', async () => {
    const createdCondominio = await prisma.condominio.create({
      data: {
        nomeCondominio: 'Condomínio Antigo',
        enderecoCondominio: 'Rua Antiga, 123'
      }
    });

    const response = await request(app)
      .put(`/api/condominios/${createdCondominio.id}`)
      .send({
        nomeCondominio: 'Condomínio Atualizado',
        enderecoCondominio: 'Rua Nova, 456'
      });
    
    expect(response.status).toBe(200);
    
    const updatedCondominio = response.body as Condominio;
    expect(updatedCondominio.id).toBe(createdCondominio.id);
    expect(updatedCondominio.nomeCondominio).toBe('Condomínio Atualizado');
    expect(updatedCondominio.enderecoCondominio).toBe('Rua Nova, 456');
  });

  it('should delete condominio', async () => {
    const createdCondominio = await prisma.condominio.create({
      data: {
        nomeCondominio: 'Condomínio para Deletar',
        enderecoCondominio: 'Rua Deletar, 123'
      }
    });

    const checkBefore = await request(app).get(`/api/condominios/${createdCondominio.id}`);
    expect(checkBefore.status).toBe(200);

    const deleteResponse = await request(app).delete(`/api/condominios/${createdCondominio.id}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message');
    expect(deleteResponse.body.message).toMatch(/sucesso/i);


    const checkAfter = await request(app).get(`/api/condominios/${createdCondominio.id}`);
    expect(checkAfter.status).toBe(404);
  });
});