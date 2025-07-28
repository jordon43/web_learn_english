import express from 'express'
import cors from 'cors'
import { router } from './routes/dictionaryRoutes.js'
import cookieParser from "cookie-parser";
import {auth} from "./middlewares/authMiddleware.js";
import {authRouter} from "./routes/authRoutes.js";
import {httpLogger, morganMiddleware} from "./middlewares/requestLogger.js";

const app = express()

const allowedOrigin = 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}))

app.use(express.json());
app.use(cookieParser('secret'))
app.use(morganMiddleware)
// app.use(httpLogger)


app.use('/api', authRouter)
app.use('/api', auth, router)

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

export default app