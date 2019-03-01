import express from 'express'
import morgan from 'morgan'
import Router from './routes'
import { db } from '../helpers'

export default async function() {
	return new Promise(async (resolve, reject) => {
		try {
			const server = express()
			const config = await db.get('config')
			const PORT = config.port
			server.set('PORT', PORT)
			server.use((req, res, next) => {
				res.header('Access-Control-Allow-Origin', '*')
				res.header(
					'Access-Control-Allow-Headers',
					'Origin, X-Requested-With, Content-Type, Accept'
				)
				return next()
			})
			server.use(
				morgan(
					process.env.NODE_ENV !== 'production'
						? 'tiny'
						: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
				)
			)
			server.use(Router)

			// eslint-disable-next-line no-unused-vars
			server.use((err, req, res, next) => {
				console.log(err)
				res.status(500).json({ err })
			})

			return resolve(server)
		} catch (error) {
			return reject(error)
		}
	})
}
