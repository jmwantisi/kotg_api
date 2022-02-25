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
	knex.select('*').from('member_types')
		.where({ void: 0 })
		.then(types => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						types
					});
				},
			})
		})
}

const findById = async (id) => {
	return knex.select('*').from('member_types')
		.where({ void: 0, id })
}

const getMemberTypes = async (req, res, next) => {
	const id = req.params.id
	const event = await findById(id)
	res.format({
		'application/json': function () {
			return res.status(200).json({
				event
			});
		},
	})
}

const create = async (req, res, next) => {
	const { name, description} = req.body
	knex('member_types').insert({ name, description, created_at: new Date() })
		.then(async id => {
			const types = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(201).json({
						message: `Member Type created successfully`,
						types
					});
				},
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	knex('member_types')
		.where({ id })
		.update({ void: 1 })
		.then(team => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Member Type was deleted'
					});
				},
			})
		})
}

const update = async (req, res, next) => {
	const id = req.params.id
	const { name, description } = req.body
	knex('member_types')
		.where({ id: parseInt(id) })
		.update({ name, description, updated_at: new Date() })
		.then(async team => {
			const updated = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Event was updated',
						event: updated
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
	getMemberTypes
}