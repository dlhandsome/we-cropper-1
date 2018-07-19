import {
  RECORGNIZE_START,
  RECORGNIZE_SUCCESS,
  RECORGNIZE_END
} from './constants'
import { getNowTime } from '../utils/timer'
import Event from './event'

class Tap extends Event {
  constructor (vm, options = {}) {
    super(vm)
    this.options = Object.assign({}, {
      event: 'tap',
      interval: 300, // max time between the multi-tap taps
      time: 250, // max time of the pointer to be down (like finger on the screen)
      threshold: 9 // a minimal movement is ok, but keep it low
    }, options)

    this._startTimestamp = null
    this._endTimestamp = null
    this._deltaTime = null
    this._lastestRecorgnizeState = null

    this._vm.register('touch-tap', () => {
      this._lastestRecorgnizeState = RECORGNIZE_SUCCESS
    })
  }

  testAttr () {
    
  }

  process (evt) {
    const {
      interval,
      time,
      threshold
    } = this.options
    if (this._recorgnizeState === RECORGNIZE_START) {
      // recorgnize start
      this._startTimestamp = getNowTime()
      if (this._endTimestamp) {
        this._deltaTime = this._startTimestamp - this._endTimestamp
      }
    }

    if (this._recorgnizeState === RECORGNIZE_END) {
      this._endTimestamp = getNowTime()
      if (this._endTimestamp - this._startTimestamp < time) {
        // current tap success
        // then judge last recorgnize
        if (
          !this._deltaTime ||
          this._deltaTime > interval
        ) {
          // tap recorgnized success !
          this._vm.hook('touch-tap', evt)
        } else if (
          this._lastestRecorgnizeState === RECORGNIZE_SUCCESS
        ) {
          this._vm.hook('touch-double-tap', evt)
        }
      }
    }
  }

  reset () {
    this._startTimestamp = null
    this._endTimestamp = null
    this._deltaTime = null
    this._lastestRecorgnizeState = null
  }
}
