import { BaseShape } from '../../shape/BaseShape'

class WxCanvas {
  public context: any
  public canvasId: string

  constructor (context, canvasId) {
    this.context = context
    this.canvasId = canvasId

  }

  setFillStyle () {
  }

  drawImage () {
    this.context.drawImage.apply(this.context, arguments)
  }

  render (shape: BaseShape) {

  }
}