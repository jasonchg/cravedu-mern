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

export { truncate, myTrim, generateSlug }
