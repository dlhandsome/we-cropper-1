export default function cut (vm) {
  const boundWidth = vm.width // 裁剪框默认宽度，即整个画布宽度
  const boundHeight = vm.height
  // 裁剪框默认高度，即整个画布高度
  let { x = 0, y = 0, width = boundWidth, height = boundHeight } = vm.cut

  /**
	 * 设置边界
	 * @param imgLeft 图片左上角横坐标值
	 * @param imgTop 图片左上角纵坐标值
	 */
  vm.outsideBound = (imgLeft, imgTop) => {
    vm.imgLeft = imgLeft >= x
      ? x
      : vm.scaleWidth + imgLeft - x <= width
        ? x + width - vm.scaleWidth
        :	imgLeft

    vm.imgTop = imgTop >= y
      ? y
      : vm.scaleHeight + imgTop - y <= height
        ? y + height - vm.scaleHeight
        : imgTop
  }

  /**
	 * 设置边界样式
	 * @param color	边界颜色
	 */
  vm.setBoundStyle = ({ color = '#04b00f', mask = 'rgba(0, 0, 0, 0.3)', lineWidth = 1 } = {}) => {
    const boundOption = [
      {
        start: { x: x - lineWidth, y: y + 10 - lineWidth },
        step1: { x: x - lineWidth, y: y - lineWidth },
        step2: { x: x + 10 - lineWidth, y: y - lineWidth }
      },
      {
        start: { x: x - lineWidth, y: y + height - 10 + lineWidth },
        step1: { x: x - lineWidth, y: y + height + lineWidth },
        step2: { x: x + 10 - lineWidth, y: y + height + lineWidth }
      },
      {
        start: { x: x + width - 10 + lineWidth, y: y - lineWidth },
        step1: { x: x + width + lineWidth, y: y - lineWidth },
        step2: { x: x + width + lineWidth, y: y + 10 - lineWidth }
      },
      {
        start: { x: x + width + lineWidth, y: y + height - 10 + lineWidth },
        step1: { x: x + width + lineWidth, y: y + height + lineWidth },
        step2: { x: x + width - 10 + lineWidth, y: y + height + lineWidth }
      }
    ]

    // 绘制半透明层
    vm.ctx.beginPath()
    vm.ctx.setFillStyle(mask)
    vm.ctx.fillRect(0, 0, x, boundHeight)
    vm.ctx.fillRect(x, 0, width, y)
    vm.ctx.fillRect(x, y + height, width, boundHeight - y - height)
    vm.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight)
    vm.ctx.fill()

    boundOption.forEach(op => {
      vm.ctx.beginPath()
      vm.ctx.setStrokeStyle(color)
      vm.ctx.setLineWidth(lineWidth)
      vm.ctx.moveTo(op.start.x, op.start.y)
      vm.ctx.lineTo(op.step1.x, op.step1.y)
      vm.ctx.lineTo(op.step2.x, op.step2.y)
      vm.ctx.stroke()
    })
  }
}
