import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { register, login } from './controllers/Auth.js';
import { getLab, addMember, updateLab, getLabs } from './controllers/Lab.js';

dotenv.config();
const app = express();
const mongoKey = process.env.MONGO;

const PORT = process.env.PORT || 6001;
app.use(cors());
app.use(bodyParser.json({ limi: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.post('/register', register);
app.post('/login', login);
app.get('/lab/:id', getLab);
app.post('/lab/member/:id', addMember);
app.put('/lab/:id', updateLab);
app.get('/labs', getLabs);

mongoose
  .connect(`${mongoKey}`, {
    dbName: 'srl',
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error}, did not connect.`));
