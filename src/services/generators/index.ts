export const piGenerator = async (
  PiIteration: any,
  existingPiDecimals: number,
  decimalIncrement: number,
  isGeneratorBusy: boolean,
) => {
  try {
    isGeneratorBusy = true

    const increaseDecimalCount = existingPiDecimals + decimalIncrement
    let decimals = existingPiDecimals

    let latestPiValue = ''

    while (decimals < increaseDecimalCount) {
      console.log(`[generatePi] Adding decimals ${decimals + 1} / ${increaseDecimalCount}`)

      const bigIntLength = BigInt(decimals + 20)

      let i = BigInt(1)
      let x = BigInt(3) * BigInt(10) ** bigIntLength
      let pi = x

      while (x > 0) {
        x = (x * i) / ((i + BigInt(1)) * BigInt(4))
        pi += x / (i + BigInt(2))
        i += BigInt(2)
      }

      const piBigInt = pi / BigInt(10) ** BigInt(20)

      latestPiValue = BigInt(piBigInt).toString()

      const timestamp = new Date()

      const newPiIteration = {
        decimals: decimals + 1,
        value: latestPiValue,
        createdAt: timestamp,
        createdBy: 'module-generate-pi',
        updatedAt: timestamp,
        updatedBy: 'module-generate-pi',
      }

      await PiIteration.create(newPiIteration)

      decimals++
    }

    isGeneratorBusy = false
    return latestPiValue
  } catch (error) {
    console.error(`[piGenerator] Failed to generate pi`, error)
    throw new Error(error)
  }
}
