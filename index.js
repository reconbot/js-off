const countSymbol = Symbol.for('count')

const jsOff = (data) => {
  if (typeof data !== 'object' || data === undefined || data === null) {
    return data
  }
  if (Array.isArray(data)) {
    return data.map(i => jsOff(i))
  }
  const readCalls = {}
  const output = {}
  for (const [key, value] of Object.entries(data)) {
    readCalls[key] = 0
    const proxyValue = jsOff(value)
    Object.defineProperty(output, key, {
      enumerable: true,
      get() {
        readCalls[key]++
        return proxyValue
      }
    })
  }

  Object.defineProperty(output, countSymbol, {
    get() { return readCalls }
  })


  Object.defineProperty(output, 'toJSON', {
    enumerable: false,
    value: () => {
      const data = {}
      for (const key of Object.keys(output)) {
        if (readCalls[key] > 0) {
          data[key] = output[key]
        }
      }
      return data
    }
  })
  return output
}

module.exports.jsOff = jsOff
module.exports.countSymbol = countSymbol
