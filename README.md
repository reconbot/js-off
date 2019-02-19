# js-off

Count which JSON fields you've accessed and remove the rest.

```js
const { jsOff, countSymbol } = require('js-off')
const input = {
  foo: {
    bar: 4,
    baz: null
  },
  arr: [{ name: 'spock', age: 64 }, { name: undefined }]
}

const data = jsOff(input)

console.log(data.foo.bar)
console.log(data.arr.map(i => i.name ))

console.log(data[countSymbol])
// { foo: 1, arr: 1 })
console.log(data.arr[0][countSymbol])
// { name: 1, age: 0 }
console.log(JSON.stringify(data))
// {"foo":{"bar":4},"arr":[{"name":"spock"},{}]}
```
