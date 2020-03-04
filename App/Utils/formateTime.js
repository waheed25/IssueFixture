export function formatTime (seconds) {
  const ss = Math.floor(seconds) % 60
  const mm = Math.floor(seconds / 60) % 60
  const hh = Math.floor(seconds / 3600)

  if (hh > 0) {
    return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss)
  } else {
    return mm + ':' + formatTwoDigits(ss)
  }
}
export function formatTwoDigits (n) {
  return n < 10 ? '0' + n : n
}
export function convertMinutesIntoSeconds (time) {
  const conversion = time.split(':' || '.')
  const minutesIntoSec = parseInt(conversion[0]) * 60
  const seconds = parseInt(conversion[1])
  return minutesIntoSec + seconds
}

export function calculateTime (createdAt) {
  var diff = new Date() - new Date(createdAt * 1000)
  const seconds = Math.floor(diff / (1000))
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 7 * 30))
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 7 * 30 * 12))
  if (seconds < 60 && minutes < 1) {
    return `${seconds} seconds`
  }
  if (hours < 1 && minutes < 60) {
    return `${minutes} minutes`
  }
  if (hours > 0 && hours < 24) {
    return `${hours} hours`
  }
  if ((hours > 24 && days < 7) || hours === 24) {
    return `${days} days`
  }
  if ((days > 7 && days < 30) || days === 7) {
    return weeks > 1 ? `${weeks} weeks` : `${weeks} week`
  }
  if ((weeks > 4 && weeks < 48) || days === 30) {
    return months > 1 ? `${months} months` : (months === 0 ? '1 month' : `${months} month`)
  }
  if (months > 12) {
    return years > 1 ? `${years} years` : `${years} year`
  } else {
    return `${hours} hours`
  }
}
