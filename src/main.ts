import {
  validator,
  setTouchState
} from './utils/helper'
import { Base } from './core/Base'
import DEFAULT from './default'
import prepare from './patch/prepare'
import methods from './patch/methods'
import update from './patch/update'
import cut from './patch/cut'
import {
  version
} from './version'

export default class WeCropper extends Base {
  /**
   * private
   */
  private src: string
  private __oneTouchStart: (touch: any) => void
  private __oneTouchMove: (touch: any) => void
  private __twoTouchStart: (touch0: any, touch1: any) => void
  private __twoTouchMove: (touch0: any, touch1: any) => void
  private __xtouchEnd: () => void

  /**
   * public
   */
  public readonly version: string = version
  public ctx: object
  public oldScale: number
  public newScale: number
  public attachPage: () => void
  public createCtx: () => void
  public pushOrign: (src: string) => void
  public updateCanvas: () => void
  public onReady?: (canvasContext: any, vm: this) => void

  constructor (params) {

    super()
    const self = this
    const _default = {}

    validator(self, DEFAULT)

    Object.keys(DEFAULT).forEach(key => {
      _default[key] = DEFAULT[key].default
    })
    Object.assign(self, _default, params)

    prepare(self)
    cut(self)
    methods(self)
    self.init()
    update(self)

    return self
  }

  init () {
    const self = this
    const { src }: any = self

    self.$emit('ready')

    if (src) {
      self.pushOrign(src)
    } else {
      self.updateCanvas()
    }
    setTouchState(self, false, false, false)

    self.oldScale = 1
    self.newScale = 1

    return self
  }

  //  图片手势初始监测
  touchStart (e) {
    const self = this
    const [touch0, touch1] = e.touches

    if (!self.src) return

    setTouchState(self, true, null, null)

    // 计算第一个触摸点的位置，并参照改点进行缩放
    self.__oneTouchStart(touch0)

    // 两指手势触发
    if (e.touches.length >= 2) {
      self.__twoTouchStart(touch0, touch1)
    }
  }

  //  图片手势动态缩放
  touchMove (e) {
    const self = this
    const [touch0, touch1] = e.touches

    if (!self.src) return

    setTouchState(self, null, true)

    // 单指手势时触发
    if (e.touches.length === 1) {
      self.__oneTouchMove(touch0)
    }
    // 两指手势触发
    if (e.touches.length >= 2) {
      self.__twoTouchMove(touch0, touch1)
    }
  }

  touchEnd (e) {
    const self = this

    if (!self.src) return

    setTouchState(self, false, false, true)
    self.__xtouchEnd()
  }
}

