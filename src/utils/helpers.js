import moment from 'moment'
import R from 'ramda'

// General helpers
const get = (prop) => R.prop(prop)

/**
 * Concatenate arrays with similar objects
 * Useful for concatenating artists to one string for example
 */
export const concatenate = R.curry(
  (array = [], separator = ', ', property = 'name') =>
    array
      .map(get(property))
      .join(separator)
)

/**
 * Takes a value in seconds and returns a parsed duration
 * @param {int} milliseconds - Seconds to parse
 * @return {string} - The parsed string
 *
 * i.e. duration(929) -> 06:22
 */
export const duration = (milliseconds) => {
  const seconds = milliseconds / 1000
  const minutes = seconds / 60

  const h = Math.floor(seconds / 3600)
  let min = Math.floor(minutes - (60 * h))
  let s = Math.round(minutes % 1 * 60)

  if (min < 10 && h > 0) {
    min = `0${min}`
  }

  if (s < 10) {
    s = `0${s}`
  }

  return `${h > 0 ? `${h}:` : ''}${min}:${s}`
}

/**
 * Display the time from now
 * @param {string} date
 */
export const timeAgo = (date) => moment(date).fromNow()

/**
 * Create a track object for the API
 * @param {object} track
 */
export const wejayTrack = (track) => 
  R.omit(['duration_ms', 'id'])(Object.assign({}, track, {
    duration: track.duration_ms || track.duration,
    spotifyId: track.id || track.spotifyId,
    started: null,
    position: null,
    user: localStorage.user ? JSON.parse(localStorage.user) : null
  }))