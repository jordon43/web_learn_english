import express from 'express'
import cors from 'cors'
import { router } from './routes/dictionaryRoutes.js'


const app = express()

const allowedOrigin = 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin
}))

app.use(express.json());
app.use('/api', router)


app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

export default app