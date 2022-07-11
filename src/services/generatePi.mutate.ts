import mongoose from 'mongoose'

import { PiIterationSchema } from './schemas/PiIteration.schema'

import { piGenerator } from './generators'

const db = mongoose.createConnection(process.env.WRITE_DB_CONN)
const PiIteration = db.model('PiIteration', PiIterationSchema)

export const generatePi = async (request, reply) => {
  try {
    let decimalIncrement = 1
    let existingPiDecimals = 0

    const hasValidIncrementBody = !!(request.body && request.body.increase) && !!Number(request.body.increase)

    if (hasValidIncrementBody) decimalIncrement = Number(request.body.increase)

    const existingPi = await PiIteration.findOne().sort({ _id: -1 }).lean()

    const hasExistingPi = !!(existingPi && existingPi.decimals && existingPi.decimals > 0)

    if (hasExistingPi) existingPiDecimals = existingPi.decimals

    const { decimals, value } = piGenerator(existingPiDecimals, decimalIncrement)

    const timestamp = new Date()

    const newPiIteration = {
      decimals,
      value,
      createdAt: timestamp,
      createdBy: 'module-generate-pi',
      updatedAt: timestamp,
      updatedBy: 'module-generate-pi',
    }

    await PiIteration.create(newPiIteration)

    reply.send(value)
  } catch (error) {
    console.error(`[generatePi] Failed to generate pi`, error)
    throw new Error(error)
  }
}
