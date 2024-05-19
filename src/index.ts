import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { isHttpError } from 'http-errors';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.use((err, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({ error: err.message });
  }else{
    next(err)
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
