import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.routes.js';
import { sequelize } from './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced successfully');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

export default app;
