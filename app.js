import express from 'express';
import cors from 'cors'
import teamsRoutes from './routes/teams_route';
import bodyParser from 'body-parser';
import { ExtractJwt, passport } from 'passport-jwt'

const app = express();
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json({
	limit: 1000000000000
}));

app.use('/teams', teamsRoutes);

module.exports = app;

