import { Base } from '../core/Base'
import { IRect, IPoint, ILock, IVector } from '../interface/index'
import { getShapeId, setShapeId, getShapeQueue } from '../utils/store'
import { createVector, getVectorByZoom } from '../utils/vector'

/**
 * 向量名称
 * 
 * VECTOR_CENTER_LEFTTOP 中心点至图形左上角向量
 * VECTOR_OFFSET 偏移量
 */
const VECTOR_CENTER_LEFTTOP: string = 'VECTOR_CENTER_LEFTTOP'
const VECTOR_OFFSET: string = 'VECTOR_OFFSET'

export class BaseShape extends Base {
  /**
   * 私有属性：唯一ID
   */
  private _id: number = getShapeId()
  /**
   * 公有属性：单例
   */
  public static instance: BaseShape = null
  /**
   * 公有属性：是否懒渲染
   */
  public lazyRender: boolean = false
  /**
   * 渲染器上下文
   */
  public renderContext: any
  /**
   * 公有属性：旋转值
   */
  public rotate: number = 0
  /**
   * 公有属性：前置图形
   */
  public before: BaseShape
  /**
   * 公有属性：后置图形
   */
  public after: BaseShape
  /**
   * 公有属性：是否锁定
   */
  public locked: ILock = {
    rect: false,
    rotate: false,
    centerPoint: false
  }
  /**
   * 公有属性：有效区域
   */
  public rect: IRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  /**
   * 公有属性：中心点坐标
   */
  public centerPoint: IPoint = {
    x: 0,
    y: 0
  }
  /**
   * 公有属性：缩放系数
   */
  public zoom: number = 1
  /**
   * 公有属性：偏移量
   */
  public offset: IVector = {
    name: VECTOR_OFFSET,
    vx: 0,
    vy: 0
  }
  /**
   * 公有属性：初始参数
   */
  public initialOptions = {}
  
  constructor (options?: any) {
    super()

    const shapeId = getShapeId()
    setShapeId(shapeId + 1)

    this.setOptions(options)
  }
  /**
   * 公有属性：创建图形单例
   */
  static createShape (options?: any) {
    if (!BaseShape.instance) {
      BaseShape.instance = new BaseShape(options)
    }
    return BaseShape.instance
  }

  setOptions (options?: any) {
    options = options || {}

    this.renderContext = options.renderContext || this.renderContext
    this.rotate = options.rotate || this.rotate
    this.before = options.before || this.before,
    this.after = options.after || this.after,
    this.locked = options.locked || this.locked,
    this.rect = options.rect || this.rect,
    this.centerPoint = options.centerPoint || this.centerPoint,
    this.zoom = options.zoom || this.zoom,
    this.offset = options.offset || this.offset

    this.initialOptions = {
      renderContext: this.renderContext,
      rotate: this.rotate,
      before: this.before,
      after: this.after,
      locked: this.locked,
      rect: this.rect,
      centerPoint: this.centerPoint,
      zoom: this.zoom,
      offset: this.offset
    }
  }
  /**
   * 获取图形唯一ID
   */
  getId () {
    return this._id
  }
  /**
   * 获取层级值
   */
  getZIndex () {
    let index = undefined
    const queue = getShapeQueue()

    queue.forEach((q, i) => {
      if (q === this) {
        index = i
      }
    })
    if (index) {
      return index
    } else {
      console.warn(
        '暂时无法获取 zIndex 值，请将该 Shape 实例添加到容器中'
      )
    }
  }
  /**
   * 获取中心点坐标
   */
  getCenterPoint () {
    return this.centerPoint
  }
  /**
   * 设置中心点
   * @param centerPoint 中心点坐标
   * @param autoCalculateByRect 是否自动计算
   */
  setCenterPoint (
    centerPoint: IPoint,
    autoCalculateByRect?: boolean
  ) {
    if (autoCalculateByRect) {
      this.centerPoint.x = this.rect.x + this.rect.width / 2
      this.centerPoint.y = this.rect.y + this.rect.height / 2
    } else {
      this.centerPoint = centerPoint
    }
  }
  /**
   * 设置边距信息
   * @param rect 边距信息
   */
  setRect (zoom: number, offset: IVector) {
    this.setZoom(zoom)
    this.setOffset(offset)
  }
  /**
   * 获取边距信息
   */
  getRect () {
    return this.rect
  }
  /**
   * 设置旋转值
   * @param rotate 旋转值
   */
  setRotate (rotate: number) {
    this.rotate = rotate
  }
  /**
   * 获取旋转值
   */
  getRotate () {
    return this.rotate
  }
  /**
   * 设置缩放值
   * @param zoom 缩放值 
   */
  setZoom (zoom: number = 1) {    
    const centerPoint = this.getCenterPoint()
    const leftTopPoint: IPoint = {
      x: this.rect.x,
      y: this.rect.y
    } 

    const vector = createVector(VECTOR_CENTER_LEFTTOP, centerPoint, leftTopPoint)
    const nv = getVectorByZoom(vector, zoom)

    this.zoom = zoom
    this.rect.x = nv.vx + centerPoint.x
    this.rect.y = nv.vy + centerPoint.y
    this.rect.width *= zoom
    this.rect.height *= zoom
  }

  setOffset (offset: IVector = {
    vx: 0,
    vy: 0
  }) {
    this.offset.vx = offset.vx
    this.offset.vy = offset.vy

    this.rect.x += offset.vx
    this.rect.y += offset.vy
  }

  getOffset () {
    return this.offset
  }

  /**
   * 锁定图形
   */
  lockRect () {
    this.locked.rect = true
  }
  /**
   * 解锁图形
   */
  unlockRect () {
    this.locked.rect = false
  }
  /**
   * 锁定旋转
   */
  lockRotate () {
    this.locked.rotate = true
  }
  /**
   * 解锁旋转
   */
  unlockRotate () {
    this.locked.rotate = false
  }
  /**
   * 锁定中心点
   */
  lockCenterPoint () {
    this.locked.centerPoint = true
  }
  /**
   * 解锁中心点
   */
  unlockCenterPoint () {
    this.locked.centerPoint = false
  }

  /**
   * 重置图形属性
   * @param rect 边距信息
   * @param rotate 旋转值
   * @param centerPoint 中心点坐标
   * @param autoCalculateByRect 是否自动计算中心点坐标
   */
  resize (
    zoom: number,
    offset: IVector,
    rotate: number,
    centerPoint: IPoint,
    autoCalculateByRect?: boolean
  ) {
    this.setCenterPoint(centerPoint, autoCalculateByRect)
    this.setRect(zoom, offset)
    this.setRotate(rotate)
  }
  /**
   * 判断点坐标是否在图形内
   * @param point 
   */
  isPointInslide (point: IPoint) {
    return (
      point.x - this.rect.x < this.rect.width &&
      point.y - this.rect.y < this.rect.height
    )
  }
  /**
   * 渲染图形
   */
  async render<T> (context: T, lazy: boolean) {}
}
