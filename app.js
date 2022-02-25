import express from 'express';
import cors from 'cors'
import { ExtractJwt, passport } from 'passport-jwt'

const app = express();
app.use(cors())
app.options('*', cors())

module.exports = app;

