import observe from './observe.js'
import Watcher from './Watcher.js'

var obj = {
  a: {
    n: 5
  },
  b: 10,
  g: [21, 23, 414, 855]
}



observe(obj)
new Watcher(obj, 'a.n', function (value, oldValue) {
  console.log(value, oldValue)
})
obj.a.n = 50;
console.log(obj)