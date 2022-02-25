import dotenv from "dotenv"
dotenv.config();

const db = {
	client: process.env.CLIENT,
	connection: {
		port: process.env.DATABASE_PORT,
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
	}
};

const knex = require('knex')(db);

const all = async (req, res, next) => {
	knex.select('*').from('teams')
		.where({ void: 0 })
		.then(teams => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						teams
					});
				},
			})
		})
}

const findById = async (id) => {
	return knex.select('*').from('teams')
		.where({ void: 0, id })
}

const getTeam = async (req, res, next) => {
	const id = req.params.id
	const team = await findById(id)
	res.format({
		'application/json': function () {
			return res.status(200).json({
				team
			});
		},
	})
}

const create = async (req, res, next) => {
	const { name, description, year_found } = req.body
	knex('teams').insert({ name, description, year_found, created_at: new Date() })
		.then(async id => {
			const team = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(201).json({
						message: `Team created successfully`,
						team
					});
				},
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	knex('teams')
		.where({ id })
		.update({ void: 1 })
		.then(team => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Team was deleted'
					});
				},
			})
		})
}

const update = async (req, res, next) => {
	const id = req.params.id
	const { name, description, year_found } = req.body
	knex('teams')
		.where({ id: parseInt(id) })
		.update({ name, description, year_found, updated_at: new Date() })
		.then(async team => {
			const updated = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Team was updated',
						team: updated
					});
				},
			})
		})
}

module.exports = {
	all,
	create,
	remove,
	update,
	getTeam
}