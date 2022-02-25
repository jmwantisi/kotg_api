import dotenv from 'dotenv'
import app from './app'
import bodyParser from 'body-parser';

const PORT = process.env.SERVER_PORT

const FILE_SIZE_LIMIT = process.env.FILE_SIZE_LIMIT

dotenv.config();
app.use(bodyParser.json({
	limit: FILE_SIZE_LIMIT
}));

app.listen(PORT, () => {
	console.log(`app is listening to port ${5000}`);
})