const countSymbol = Symbol.for('count')

const jsoff = (data) => {
  if (typeof data !== 'object' || data === undefined || data === null) {
    return data
  }
  if (Array.isArray(data)) {
    return data.map(i => jsoff(i))
  }
  const readCalls = {}
  const output = {}
  for (const [key, value] of Object.entries(data)) {
    readCalls[key] = 0
    const proxyValue = jsoff(value)
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

module.exports.jsoff = jsoff
module.exports.countSymbol = countSymbol
