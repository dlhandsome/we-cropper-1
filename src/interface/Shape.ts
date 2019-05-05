import {
  IPoint
} from './Point'

export interface IRect extends IPoint {
  /**
   * 
   */
  width: number
  height: number
}

/**
 * 锁定图形
 */
export interface ILock {
  /**
   * 坐标及长宽
   */
  rect: boolean
  /**
   * 旋转
   */
  rotate: boolean
  /**
   * 中心点
   */
  centerPoint: boolean
}
