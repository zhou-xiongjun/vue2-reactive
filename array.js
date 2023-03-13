import { def } from "./utils.js"

const arrayPrototype = Array.prototype
export const arrayMethods = Object.create(arrayPrototype)
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  const original = arrayPrototype[methodName];

  def(arrayMethods, methodName, function () {
    const result = original.apply(this, arguments)
    let ob = this.__ob__;
    let inserted = []
    const args = [...arguments]

    switch (methodName) {
      case 'push':
      case 'shift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
    }

    if (inserted) {
      ob.observeArray(inserted)
    }
    ob.dep.notify()
    return result
  }, false)

})