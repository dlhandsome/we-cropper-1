import { PROPS_XY } from './constants'

export const getDistance = (p1, p2, props) => {
  if (!props) {
    props = PROPS_XY
  }
  const x = p2[props[0]] - p1[props[0]]
  const y = p2[props[1]] - p2[props[1]]
  return Math.sqrt(x * x + y * y)
}
