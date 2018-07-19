module.exports = exports = function transform () {
  this.register('event-transform', function (evt) {
    return evt
  })
}
