import {
  RECORGNIZE_START,
  RECORGNIZE_END
} from './constants'

export default class Event {
  constructor (vm) {
    this.manager = []
    this._vm = vm

    this._recorgnizeState = null
    this._pointer = {}
  }

  handler (options) {
    if (options.name === 'touchstart') {
      // started recorgnize touch
      this._recorgnizeState = RECORGNIZE_START
      // this.addTouchStart(options.evt, options.props)
    }
    if (options.name === 'touchmove') {
      // this.addTouchMove(options.evt, options.props)
    }
    if (options.name === 'touchend') {
      this._recorgnizeState = RECORGNIZE_END
      // this.addTouchEnd(options.evt, options.props)
    }

    this.process(options.evt)
  }

  process () {}

  testAttr () {}

  emit () {}
}
