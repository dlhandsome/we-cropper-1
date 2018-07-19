module.exports = exports = function touchend () {
  this.register('handle-touchend', function (evt) {
    const _evt = this.hookSeq('event-transform', evt)
    // Todo
  })
}
