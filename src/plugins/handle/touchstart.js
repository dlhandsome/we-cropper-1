module.exports = exports = function touchstart () {
  this.register('handle-touchstart', function (evt) {
    const _evt = this.hookSeq('event-transform', evt)
    // Todo
  })
}
