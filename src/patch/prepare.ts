import {
  getDevice
} from '../utils/helper'

const {
  windowWidth
} = getDevice()

export default function prepare (vm) {
  // v1.4.0 版本中将不再自动绑定we-cropper实例
  vm.attachPage = () => {
    const pages = getCurrentPages()
    // 获取到当前page上下文
    const pageContext = pages[pages.length - 1]
    // 把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
    Object.defineProperty(pageContext, 'wecropper', {
      get () {
        console.warn(
          'Instance will not be automatically bound to the page after v1.4.0\n\n' +
          'Please use a custom instance name instead\n\n' +
          'Example: \n' +
          'this.mycropper = new WeCropper(options)\n\n' +
          '// ...\n' +
          'this.mycropper.getCropperImage()'
        )
        return vm
      }
    })
  }

  vm.createCtx = () => {
    const {
      id,
      targetId
    } = vm

    if (id) {
      vm.ctx = vm.ctx || wx.createCanvasContext(id)
      vm.targetCtx = vm.targetCtx || wx.createCanvasContext(targetId)
    } else {
      console.error(`constructor: create canvas context failed, 'id' must be valuable`)
    }
  }

  vm.deviceRadio = windowWidth / 750
  vm.attachPage()
  vm.createCtx()
}
