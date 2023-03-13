var uid = 0


export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = []
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }

  // 添加依赖
  depend() {
    console.log("depend 添加依赖")
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  // 通知更新
  notify() {
    const subs = this.subs.slice()

    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}