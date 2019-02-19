const { jsOff, countSymbol } = require('..')
const deepfreeze = require('deep-freeze')
const assert = require('assert')

const sourceData = deepfreeze({
  foo: {
    bar: 4,
    baz: null
  },
  arr: [{ name: 'spock', age: 64 }, { name: undefined }]
})

describe('jsoff', () => {
  it('has counts available at a symbol', () => {
    const data = jsOff(sourceData)
    assert.ok(data.foo)
    assert.ok(data.foo)
    assert.deepEqual(data[countSymbol], { foo: 2, arr: 0 })
  })
  it('JSON.stringify() returns used keys only', () => {
    const data = jsOff(sourceData)
    assert.equal(data.foo.bar, 4)
    assert.deepEqual(data.arr.map(person => person.name), ['spock', undefined])
    assert.equal(JSON.stringify(data), JSON.stringify({ foo: { bar: 4 }, arr: [{ name: 'spock' }, { name: undefined }] }))
  })
})
