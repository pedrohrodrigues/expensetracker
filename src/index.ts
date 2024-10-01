import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './db/db';
import { readdirSync } from 'fs';
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//routes
const routesPath = './src/routes';
const routes = readdirSync(routesPath);

Promise.all(
  routes.map(async (route) => {
    const module = await import(path.resolve(routesPath, route));
    app.use('/api/v1', module.default);
  })
).catch((err) => console.error('Error loading routes:', err));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  db();
  console.log(`Server running on http://localhost:${port}`);
});
