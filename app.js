import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import { ExtractJwt, passport } from 'passport-jwt'

const app = express();
const PORT = process.env.SERVER_PORT
const FILE_SIZE_LIMIT = process.env.FILE_SIZE_LIMIT

dotenv.config();
app.use(bodyParser.json({
	limit: FILE_SIZE_LIMIT
}));
app.use(cors())
app.options('*', cors())

app.listen(PORT, () => {
	console.log(`app is listening to port ${5000}`);
})
