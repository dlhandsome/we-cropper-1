export default function initPlugin (context) {
  let plugins = [
    '../plugins/event/event-transform',
    '../plugins/handle/touchstart',
    '../plugins/handle/touchmove',
    '../plugins/handle/touchend'
  ].map(v => require(v).call(context))
}