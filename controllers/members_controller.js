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
	knex.select('*').from('members')
		.where({ void: 0 })
		.then(member => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						member
					});
				},
			})
		})
}

const findById = async (id) => {
	return knex.select('*').from('members')
		.where({ void: 0, id })
}

const getTeam = async (req, res, next) => {
	const id = req.params.id
	const member = await findById(id)
	res.format({
		'application/json': function () {
			return res.status(200).json({
				member
			});
		},
	})
}

const create = async (req, res, next) => {
	const { firstname, lastname, phone_number, address, } = req.body
	knex('members').insert({ firstname, lastname, phone_number, address, created_at: new Date() })
		.then(async id => {
			const member = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(201).json({
						message: `Member created successfully`,
						member
					});
				},
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	knex('members')
		.where({ id })
		.update({ void: 1 })
		.then(team => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Member was deleted'
					});
				},
			})
		})
}

const update = async (req, res, next) => {
	const id = req.params.id
	const { firstname, lastname, phone_number, address } = req.body
	knex('members')
		.where({ id: parseInt(id) })
		.update({ firstname, lastname, phone_number, address, updated_at: new Date() })
		.then(async team => {
			const updated = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Member was updated',
						member: updated
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