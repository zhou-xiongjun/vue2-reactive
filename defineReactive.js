import observe from './observe.js'
import Dep from './Dep.js'


export default function defineReactive(data, key, val) {

  const dep = new Dep()

  if (arguments.length == 2) {
    val = data[key]
  }

  let childOb = observe(val)


  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      if (val == newValue) {
        return
      }
      val = newValue
      childOb = observe(newValue)
      dep.notify()
    }
  })
}