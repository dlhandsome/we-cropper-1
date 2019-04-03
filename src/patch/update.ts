import {
  getNewScale
} from '../core/scale'

export default function update (vm) {
  if (!vm.src) return

  vm.__oneTouchStart = (touch) => {
    vm.touchX0 = Math.round(touch.x)
    vm.touchY0 = Math.round(touch.y)
  }

  vm.__oneTouchMove = (touch) => {
    let xMove, yMove
    // 计算单指移动的距离
    if (vm.touchended) {
      return vm.updateCanvas()
    }
    xMove = Math.round(touch.x - vm.touchX0)
    yMove = Math.round(touch.y - vm.touchY0)

    const imgLeft = Math.round(vm.rectX + xMove)
    const imgTop = Math.round(vm.rectY + yMove)

    vm.outsideBound(imgLeft, imgTop)

    vm.updateCanvas()
  }

  vm.__twoTouchStart = (touch0, touch1) => {
    let xMove, yMove, oldDistance

    vm.touchX1 = Math.round(vm.rectX + vm.scaleWidth / 2)
    vm.touchY1 = Math.round(vm.rectY + vm.scaleHeight / 2)

    // 计算两指距离
    xMove = Math.round(touch1.x - touch0.x)
    yMove = Math.round(touch1.y - touch0.y)
    oldDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove))

    vm.oldDistance = oldDistance
  }

  vm.__twoTouchMove = (touch0, touch1) => {
    const { oldScale, oldDistance, scale, zoom }: any = vm

    vm.newScale = getNewScale(oldScale, oldDistance, zoom, touch0, touch1)

    //  设定缩放范围
    vm.newScale <= 1 && (vm.newScale = 1)
    vm.newScale >= scale && (vm.newScale = scale)

    vm.scaleWidth = Math.round(vm.newScale * vm.baseWidth)
    vm.scaleHeight = Math.round(vm.newScale * vm.baseHeight)
    const imgLeft = Math.round(vm.touchX1 - vm.scaleWidth / 2)
    const imgTop = Math.round(vm.touchY1 - vm.scaleHeight / 2)

    vm.outsideBound(imgLeft, imgTop)

    vm.updateCanvas()
  }

  vm.__xtouchEnd = () => {
    vm.oldScale = vm.newScale
    vm.rectX = vm.imgLeft
    vm.rectY = vm.imgTop
  }
}
