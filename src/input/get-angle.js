import { PROPS_XY } from './constants'

export const getAngle = (p1, p2, props) => {
  if (!props) {
    props = PROPS_XY
  }
  const x = p2[props[0]] - p1[props[0]]
  const y = p2[props[1]] - p2[props[1]]
  return Math.atan2(y, x) * 180 / Math.PI
}
