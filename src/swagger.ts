import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Controle de Condomínio',
      version: '1.0.0',
      description: 'API para gerenciamento de visitantes, unidades e condomínios',
    },
    servers: [
      { url: 'http://localhost:3000/api' },
    ],
    components: {
      schemas: {
        Visitante: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'João Silva' },
            documento: { type: 'string', example: '12345678901' },
            telefone: { type: 'string', example: '11999999999' },
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