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

const all = async (_req, res, next) => {
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

const getMember = async (req, res, _next) => {
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

// Non team member
const create = async (req, res, _next) => {
	const { firstname, lastname, phone_number, address } = req.body
	knex('members').insert({ firstname, lastname, phone_number, address, member_type_id: 3, created_at: new Date() })
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

const remove = async (req, res, _next) => {
	const id = req.params.id
	knex('members')
		.where({ id })
		.update({ void: 1 })
		.then(_team => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Member was deleted'
					});
				},
			})
		})
}


const findMembersByMemberTypeId = async (typeId) => {
	return knex.select('*').from('members as m')
	.innerJoin('member_types as mt', 'mt.id', 'm.member_type_id')
	.where({ void: 0, 'mt.id': typeId })
}

// CREATE ROUTE
const fetchTeamMembersByType = async (req, res, _next) => {
	const id = req.params.type_id
	const members = await findMembersByMemberTypeId(id)
	res.format({
		'application/json': function () {
			return res.status(200).json({
				members
			});
		},
	})
}

const findMemberByMemberTypeId = async (memberId, typeId) => {
	return knex.select('*').from('members as m')
		.innerJoin('member_types as mt', 'mt.id', 'm.member_type_id')
		.where({ void: 0, 'm.id': memberId, 'mt.id': typeId })
}

// CREATE ROUTE
const fetchTeamMemberByType = async (req, res, _next) => {
	const id = req.params.type_id
	const memberId = req.params.member_id
	const members = await findMemberByMemberTypeId(memberId, id)
	res.format({
		'application/json': function () {
			return res.status(200).json({
				members
			});
		},
	})
}


const fetchATeamMember = async (req, res, _next) => {
	const id = req.params.id
	knex('members')
		.where({ id })
		.update({ void: 1 })
		.then(_team => {
			res.format({
				'application/json': function () {
					return res.status(200).json({
						message: 'Member was deleted'
					});
				},
			})
		})
}

// revoke captain if already exist
const update = async (req, res, _next) => {
	const id = req.params.id
	const { firstname, lastname, phone_number, address, member_type_id } = req.body
	knex('members')
		.where({ id: parseInt(id) })
		.update({ firstname, lastname, phone_number, address, member_type_id, updated_at: new Date() })
		.then(async _team => {
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
	getMember,
	fetchTeamMembersByType,
	fetchTeamMemberByType
}