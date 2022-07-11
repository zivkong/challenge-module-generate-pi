import dotenv from 'dotenv'

dotenv.config()

import Fastify, { FastifyInstance } from 'fastify'

import { healthCheck } from './services/generatePi.query'
import { generatePi } from './services/generatePi.mutate'

const fastify: FastifyInstance = Fastify({})

// GETTERS
fastify.get('/health/check', healthCheck)

// SETTERS
fastify.post('/pi/generate', generatePi)

const start = async () => {
  try {
    await fastify.listen({ port: 3002 })

    const address = fastify.server.address()
    const port = typeof address === 'string' ? address : address?.port

    console.log(`Pi Generator Module is serving at http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
