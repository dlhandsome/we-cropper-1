import Hook from '../core/hook'
import initPlugin from './init/plugin'
import * as logger from './share/logger'

const initHooks = (vm, plugins) => {
  if (typeof plugins === 'function') {
    plugins = [plugins]
  }

  plugins.forEach(plugin => plugin.call(vm))
}

export default class WeCropper extends Hook {
  constructor (opt) {
    super()

    initPlugin(this)
    this.context = {}
  }

  use (plugin) {
    if (typeof plugin === 'function') {
      initHooks(this, plugin)
    } else {
      logger.error('plugin must be a function')
    }
  }

  handleproxy (name, evt) {
    this.hook('handle-' + name, evt)
  }
}
