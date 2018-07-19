import { PROPS_XY } from './constants'
import getDistance from './get-distance'

export const getScale = (start, end) => {
  return getDistance(end[0], end[1], PROPS_XY) / getDistance(start[0], start[1], PROPS_XY)
}
