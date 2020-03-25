import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage (key, value) {
    return localStorage.set(key, value)
}
export function getLocalStorage (key) {
    return localStorage.get(key)
}
export function deleteLocalStorage (key) {
    return localStorage.delete(key)
}
export function clearLocalStorage () {
    return localStorage.clear()
}

export function setBookInfo (fileName, key, value) {
    let book = getLocalStorage(`${fileName}-info`)
    if (!book) {
        book = {}
    }
    book[key] = value
    setLocalStorage(`${fileName}-info`, book)
}

export function getBookInfo (fileName, key) {
    const book = getLocalStorage(`${fileName}-info`)
    if (book) {
        return book[key]
    } else {
        return null
    }
}

export function setFontFamily (fileName, fontFamily) {
    return setBookInfo(fileName, 'fontFamily', fontFamily)
}

export function getFontFamily (fileName) {
    return getBookInfo(fileName, 'fontFamily')
}

export function setFontSize (fileName, fontSize) {
    return setBookInfo(fileName, 'fontSize', fontSize)
}

export function getFontSize (fileName) {
    return getBookInfo(fileName, 'fontSize')
}

export function getLocale () {
    return getLocalStorage('locale')
}

export function setLocale (locale) {
    return setLocalStorage('locale', locale)
}

export function setTheme (theme) {
   return setLocalStorage('theme', theme)
}

export function getTheme () {
   return getLocalStorage('theme')
}

export function getBookLocation (fileName) {
    return getBookInfo(fileName, 'location')
}

export function setBookLocation (fileName, location) {
    return setBookInfo(fileName, 'location', location)
}

export function getBookmark (fileName) {
    return getBookInfo(fileName, 'bookmark')
}

export function setBookmark (fileName, bookmark) {
    return setBookInfo(fileName, 'bookmark', bookmark)
}
