import mongoose from 'mongoose'

import { PiIterationSchema } from './schemas/PiIteration.schema'

import { piGenerator } from './generators'

const db = mongoose.createConnection(process.env.WRITE_DB_CONN)
const PiIteration = db.model('PiIteration', PiIterationSchema)

let isGeneratorBusy = false

export const generatePi = async (request, reply) => {
  try {
    let decimalIncrement = 1
    let existingPiDecimals = 0

    const hasValidIncrementBody = !!(request.body && request.body.increase) && !!Number(request.body.increase)

    if (hasValidIncrementBody) decimalIncrement = Number(request.body.increase)

    const existingPi = await PiIteration.findOne().sort({ decimals: -1 }).lean()

    const hasExistingPi = !!(existingPi && existingPi.decimals && existingPi.decimals > 0)

    if (hasExistingPi) existingPiDecimals = existingPi.decimals

    // Return latest generated Pi if the generator is busy or going to be busy
    const isLongProcess = !!(isGeneratorBusy || decimalIncrement + existingPiDecimals > 200)
    if (isLongProcess) reply.send({ latestPiValue: hasExistingPi ? existingPi.value : null })

    const latestPiValue = await piGenerator(PiIteration, existingPiDecimals, decimalIncrement, isGeneratorBusy)

    return { latestPiValue }
  } catch (error) {
    console.error(`[generatePi] Failed to generate pi`, error)
    throw new Error(error)
  }
}
