const minio = require('minio');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.MINIO_PORT
const ACCESS_KEY = process.env.MINIO_ACCESS_KEY
const SECRET_KEY = process.env.MINIO_SECRET_KEY
const END_POINT = process.env.MINIO_END_POINT
const BUCKET = process.env.BUCKET_NAME

const minioClient = new minio.Client({
	endPoint: END_POINT,
	port: parseInt(PORT),
	useSSL: false,
	accessKey: ACCESS_KEY,
	secretKey: SECRET_KEY
});

const createInit = () => {
	minioClient.makeBucket(BUCKET, 'us-east-1', function (err) {
		if (err) {
			console.log(`Failed to create bucket: '${BUCKET}'. ${err}`)
		} else {
			console.log(`Bucket: '${BUCKET}' was created successfully`)
		}
	});
}

createInit()