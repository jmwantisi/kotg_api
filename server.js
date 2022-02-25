import dotenv from 'dotenv'
import app from './app'

const PORT = process.env.SERVER_PORT

const FILE_SIZE_LIMIT = process.env.FILE_SIZE_LIMIT

dotenv.config();


app.listen(5000, () => {
	console.log(`app is listening to port ${5000}`);
})