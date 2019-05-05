import { BaseShape } from '../shape/BaseShape'

let _shapeId: number = 0
let shapeQueue: Array<BaseShape> = []

export function setShapeId (id: number): void {
  _shapeId = id
}

export function getShapeId (): number {
  return _shapeId
}

export function addShape (shape: BaseShape): void {
  shapeQueue.push(shape)
}

export function clearShapeQueue () {
  shapeQueue = []
}

export function setShapeQueue (queue: Array<BaseShape>) {
  shapeQueue = queue
}

export function getShapeQueue () {
  return shapeQueue
}