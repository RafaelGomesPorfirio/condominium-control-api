import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { router } from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'API de Controle de Condomínio',
    documentation: `/api-docs`,
    api: `/api`
  });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

export default app;