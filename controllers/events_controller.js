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
	knex.select('*').from('events')
		.where({ void: 0 })
		.then(events => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						events
					});
				},
			})
		})
}

const findById = async (id) => {
	return knex.select('*').from('events')
		.where({ void: 0, id })
}

const getEvent = async (req, res, next) => {
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
	const { name, description, event_date, event_time } = req.body
	knex('events').insert({ name, description, event_date, event_time, created_at: new Date() })
		.then(async id => {
			const events = await findById(id)
			res.format({
				'application/json': function () {
					return res.status(201).json({
						message: `Event created successfully`,
						events
					});
				},
			})
		})
}

const remove = async (req, res, next) => {
	const id = req.params.id
	knex('events')
		.where({ id })
		.update({ void: 1 })
		.then(team => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Event was deleted'
					});
				},
			})
		})
}

const update = async (req, res, next) => {
	const id = req.params.id
	const { name, description, event_date, event_time } = req.body
	knex('events')
		.where({ id: parseInt(id) })
		.update({ name, description, event_date, event_time, updated_at: new Date() })
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
	getEvent
}