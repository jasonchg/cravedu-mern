// cut down all the over texts
const truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' '
    new_str = str.substr(0, len)
    new_str = str.substr(0, new_str.lastIndexOf(' '))
    new_str = new_str.length > 0 ? new_str : str.substr(0, len)
    return new_str + '...'
  }
  return str
}

const myTrim = (name) => {
  return String(name.replace(/ /g, '').toLowerCase())
}

const generateSlug = (name) => {
  let ranText = Math.random().toString(36).substring(7)
  return String(name.replace(/ /g, '-').toLowerCase() + '-' + ranText)
}

<<<<<<< HEAD
const getTotalDuration = (courseContents) => {
  if (courseContents && courseContents.length !== 0) {
    const contentsDuration = courseContents.map((x) => x.duration)
    const reducer = (acc, cur) => Number(acc) + Number(cur)
    const total = contentsDuration.reduce(reducer)
    return Number(total / 60).toFixed(2)
  } else {
    return 0
  }
}

export { truncate, myTrim, generateSlug, getTotalDuration }
=======
export { truncate, myTrim, generateSlug }
>>>>>>> f4a828b (initial)
