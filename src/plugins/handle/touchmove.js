module.exports = exports = function touchmove () {
  this.register('handle-touchmove', function (evt) {
    const _evt = this.hookSeq('event-transform', evt)
    // Todo
  })
}
