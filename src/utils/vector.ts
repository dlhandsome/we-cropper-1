import { IPoint, IVector } from '../interface/Point'

/**
 * 创建向量
 * @param name 向量名称
 * @param startPoint 起始点
 * @param endPoint 终点
 */
export function createVector (
  name: string,
  startPoint: IPoint,
  endPoint: IPoint
): IVector {
  return {
    name,
    vx: endPoint.x - startPoint.x,
    vy: endPoint.y - startPoint.y
  }
}

/**
 * 根据缩放值获取最新向量值
 * @param vector 初始向量值
 * @param zoom 缩放值
 */
export function getVectorByZoom (
  vector: IVector,
  zoom: number
): IVector {
  return {
    name: vector.name,
    vx: zoom * vector.vx,
    vy: zoom * vector.vy
  }
}

/**
 * 根据起始点获取终点坐标
 * @param vector 向量值
 * @param startPoint 起始点
 */
export function getEndPointByStartPoint (
  vector: IVector,
  startPoint: IPoint
): IPoint {
  return {
    x: startPoint.x + vector.vx,
    y: startPoint.y + vector.vy
  }
}

/**
 * 根据终点获取起始点坐标
 * @param vector 向量值
 * @param endPoint 终点
 */
export function getStartPointByEndPoint (
  vector: IVector,
  endPoint: IPoint
): IPoint {
  return {
    x: endPoint.x - vector.vx,
    y: endPoint.y - vector.vy
  }
}