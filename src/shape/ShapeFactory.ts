import { BaseShape } from './BaseShape'
import { IPoint } from '../interface/index'
import { addShape, setShapeQueue, getShapeQueue, clearShapeQueue } from '../utils/store'

export class ShapeFactory {
    public renderContext: any

    add (shape: BaseShape) {
      addShape(shape)
    }
  
    getShapeById (id: number) {
      const queue = getShapeQueue()
  
      return queue.find((shape) => {
        return shape.getId() === id
      })
    }
  
    getShapeByZIndex (zIndex: number) {
      const queue = getShapeQueue()
      
      return queue.find((shape) => {
        return shape.getZIndex() === zIndex
      })
    }
  
    getSelectedShape (point: IPoint) {
      const queue = getShapeQueue()
      
      return queue.reverse().find(shape => {
        return shape.isPointInslide(point)
      })
    }
  
    insertShapeBefore (shape: BaseShape) {
      const result = []
      const queue = getShapeQueue()
      
      queue.forEach((s) => {
        if (shape.before === s) {
          result.push(shape)
        }
        result.push(s)
      })
      setShapeQueue(result)
    }
  
    insertShapeAfter (shape: BaseShape) {
      const result = []
      const queue = getShapeQueue()
      
      queue.forEach((s) => {
        result.push(s)
        if (shape.after === s) {
          result.push(shape)
        }
      })
      setShapeQueue(result)
    }

    clear () {
      // clear shape queue
      clearShapeQueue()
    }

    render (context?: any) {
      const renderContext = context || this.renderContext
      const queue = getShapeQueue()

      queue.forEach(shape => {
        shape.render(renderContext)
      })
    }
  }