import {
  isFunc,
  isPlainObject
} from '../utils/tools'
import {
  draw,
  getImageInfo,
  canvasToTempFilePath
} from '../utils/promisify'
import CanvasToBase64 from '../utils/canvas2base64'
import update from './update'

export default function methods (vm) {
  const boundWidth = vm.width // 裁剪框默认宽度，即整个画布宽度
  const boundHeight = vm.height // 裁剪框默认高度，即整个画布高度

  const {
    id,
    targetId,
    pixelRatio
  } = vm

  let {
    x = 0,
    y = 0,
    width = boundWidth,
    height = boundHeight
  } = vm.cut

  vm.updateCanvas = (done) => {
    if (vm.croperTarget) {
      //  画布绘制图片
      vm.ctx.drawImage(
        vm.croperTarget,
        vm.imgLeft,
        vm.imgTop,
        vm.scaleWidth,
        vm.scaleHeight
      )
    }
    vm.$emit('beforeDraw')

    vm.setBoundStyle(vm.boundStyle) //	设置边界样式

    vm.ctx.draw(false, done)
    return vm
  }

  vm.pushOrign = (src) => {
    vm.src = src

    vm.$emit('beforeImageLoad')

    return getImageInfo({ src })
      .then((res: any) => {
        let innerAspectRadio = res.width / res.height
        let customAspectRadio = width / height

        vm.croperTarget = res.path

        if (innerAspectRadio < customAspectRadio) {
          vm.rectX = x
          vm.baseWidth = width
          vm.baseHeight = width / innerAspectRadio
          vm.rectY = y - Math.abs((height - vm.baseHeight) / 2)
        } else {
          vm.rectY = y
          vm.baseWidth = height * innerAspectRadio
          vm.baseHeight = height
          vm.rectX = x - Math.abs((width - vm.baseWidth) / 2)
        }

        vm.imgLeft = vm.rectX
        vm.imgTop = vm.rectY
        vm.scaleWidth = vm.baseWidth
        vm.scaleHeight = vm.baseHeight

        update(vm)

        return new Promise((resolve) => {
          vm.updateCanvas(resolve)
        })
      })
      .then(() => {
        isFunc(vm.onImageLoad) && vm.onImageLoad(vm.ctx, vm)
      })
  }

  vm.getCropperBase64 = (done = () => {}) => {
    CanvasToBase64.convertToBMP({
      canvasId: id,
      x,
      y,
      width,
      height
    }, done)
  }

  vm.getCropperImage = (...args) => {
    const customOptions = args[0]
    const fn = args[args.length - 1]

    let canvasOptions = {
      canvasId: id,
      x: x,
      y: y,
      width: width,
      height: height
    }

    let task = (): any => Promise.resolve()

    if (
      isPlainObject(customOptions) &&
      customOptions.original
    ) {
      // original mode
      task = () => {
        vm.targetCtx.drawImage(
          vm.croperTarget,
          vm.imgLeft * pixelRatio,
          vm.imgTop * pixelRatio,
          vm.scaleWidth * pixelRatio,
          vm.scaleHeight * pixelRatio
        )

        canvasOptions = {
          canvasId: targetId,
          x: x * pixelRatio,
          y: y * pixelRatio,
          width: width * pixelRatio,
          height: height * pixelRatio
        }

        return draw(vm.targetCtx)
      }
    }

    return task()
      .then(() => {
        if (isPlainObject(customOptions)) {
          canvasOptions = Object.assign({}, canvasOptions, customOptions)
        }
        return canvasToTempFilePath(canvasOptions)
      })
      .then(res => {
        const tempFilePath = res.tempFilePath

        isFunc(fn) && fn.call(vm, tempFilePath)
        return tempFilePath
      })
      .catch(() => {
        isFunc(fn) && fn.call(vm, null)
      })
  }
}
