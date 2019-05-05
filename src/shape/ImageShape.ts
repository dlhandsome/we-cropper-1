import { BaseShape } from './BaseShape'

class ImageShape extends BaseShape {
  constructor () {
    super()
  }

  async render<T> (context: T, lazy: boolean) {
    const renderContext = context || this.renderContext
    this.$emit('shape.before-render')
    await renderContext.render(this)
    this.$emit('shape.after-render')
    await renderContext.update(this, lazy)
    this.$emit('shape.after-update')
  }
}