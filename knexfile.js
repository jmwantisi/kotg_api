// Update with your config settings.
const dotenv = require("dotenv");

dotenv.config();

// Get authentication
const db = {
	BD_PORT: process.env.DATABASE_PORT,
	CLIENT: process.env.CLIENT,
	DATABASE_HOST: process.env.DATABASE_HOST,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME,
};

module.exports = {

	development: {
		client: db.CLIENT,
		connection: {
			port: db.BD_PORT,
			host: db.DATABASE_HOST,
			user: db.DATABASE_USERNAME,
			password: db.DATABASE_PASSWORD,
			database: db.DATABASE_NAME
		}
	},

	staging: {
		client: db.CLIENT,
		connection: {
			user: db.DATABASE_USERNAME,
			password: db.DATABASE_PASSWORD,
			database: db.DATABASE_NAME
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: db.CLIENT,
		connection: {
			user: db.DATABASE_USERNAME,
			password: db.DATABASE_PASSWORD,
			database: db.DATABASE_NAME
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
