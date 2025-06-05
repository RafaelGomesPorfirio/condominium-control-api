import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Controle de Condomínio',
      version: '1.0.0',
      description: 'API para gerenciamento de visitantes, unidades, condomínios e movimentações',
    },
    servers: [
      { url: 'http://localhost:3000' },
    ],
    components: {
      schemas: {

        Visitante: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nomeVisitante: { type: 'string', example: 'João Silva' },
            documentoVisitante: { type: 'string', example: '12345678901' },
            telefoneVisitante: { type: 'string', example: '11999999999', nullable: true },
          },
        },
        VisitanteInput: {
          type: 'object',
          required: ['nomeVisitante', 'documentoVisitante'],
          properties: {
            nomeVisitante: { type: 'string', example: 'João Silva' },
            documentoVisitante: { type: 'string', example: '12345678901' },
            telefoneVisitante: { type: 'string', example: '11999999999', nullable: true },
          },
        },
        
        Condominio: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nomeCondominio: { type: 'string', example: 'Residencial Primavera' },
            enderecoCondominio: { type: 'string', example: 'Rua das Flores, 123' },
          },
        },
        CondominioWithUnidades: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nomeCondominio: { type: 'string', example: 'Residencial Primavera' },
            enderecoCondominio: { type: 'string', example: 'Rua das Flores, 123' },
            unidade: {
              type: 'array',
              items: { $ref: '#/components/schemas/Unidade' },
            },
          },
        },
        CondominioInput: {
          type: 'object',
          required: ['nomeCondominio', 'enderecoCondominio'],
          properties: {
            nomeCondominio: { type: 'string', example: 'Residencial Primavera' },
            enderecoCondominio: { type: 'string', example: 'Rua das Flores, 123' },
          },
        },
        
        Unidade: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            numeroUnidade: { type: 'string', example: '101' },
            blocoUnidade: { type: 'string', example: 'A', nullable: true },
            andarUnidade: { type: 'integer', example: 1, nullable: true },
            tipoUnidade: { type: 'string', example: 'Apartamento', nullable: true },
            condominioId: { type: 'integer', example: 1 },
            condominio: { $ref: '#/components/schemas/Condominio' },
          },
        },
        UnidadeInput: {
          type: 'object',
          required: ['numeroUnidade', 'condominioId'],
          properties: {
            numeroUnidade: { type: 'string', example: '101' },
            blocoUnidade: { type: 'string', example: 'A', nullable: true },
            andarUnidade: { type: 'integer', example: 1, nullable: true },
            tipoUnidade: { type: 'string', example: 'Apartamento', nullable: true },
            condominioId: { type: 'integer', example: 1 },
          },
        },
        
        Movimentacao: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            entrada: { type: 'string', format: 'date-time', example: '2023-01-01T10:00:00Z' },
            saida: { type: 'string', format: 'date-time', example: '2023-01-01T12:00:00Z', nullable: true },
            visitanteId: { type: 'integer', example: 1 },
            unidadeId: { type: 'integer', example: 1 },
            visitante: { $ref: '#/components/schemas/Visitante' },
            unidadeVisitada: { $ref: '#/components/schemas/Unidade' },
          },
        },
        MovimentacaoInput: {
          type: 'object',
          required: ['visitanteId', 'unidadeId'],
          properties: {
            visitanteId: { type: 'integer', example: 1 },
            unidadeId: { type: 'integer', example: 1 },
            entrada: { type: 'string', format: 'date-time', example: '2023-01-01T10:00:00Z', nullable: true },
          },
        },
        MovimentacaoUpdate: {
          type: 'object',
          properties: {
            saida: { type: 'string', format: 'date-time', example: '2023-01-01T12:00:00Z', nullable: true },
            unidadeId: { type: 'integer', example: 1, nullable: true },
          },
        },
        
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensagem de erro' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;