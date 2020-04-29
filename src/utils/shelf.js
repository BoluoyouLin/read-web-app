import { getBookShelf, setBookShelf } from './localStorage'

export function addToShelf (list) {
    list.push({
        id: -1,
        type: 3
    })
    return list
}

export function removeToShelf (list) {
    return list.filter(item => item.type !== 3)
}

export function goBookMall (vue) {
    vue.$router.push({
        path: '/bookMall/home'
    })
}

export function computedId (list) {
    return list.map((book, index) => {
        if (book.type !== 3) {
            book.id = index + 1
            if (book.itemList) {
                book.itemList = computedId(book.itemList)
            }
        }
        return book
    })
}

export function addBookToShelf (book) {
    let shelfList = getBookShelf()
    shelfList = removeToShelf(shelfList)
    book.type = 1
    shelfList.push(book)
    shelfList = computedId(shelfList)
    shelfList = addToShelf(shelfList)
    setBookShelf(shelfList)
}

export function deleteBookInShelf (book) {
    return getBookShelf().filter(item => {
        if (item.itemList) {
            item.itemList = item.itemList.filter(subItem => subItem.fileName !== book.fileName)
        }
        return item.fileName !== book.fileName
    })
}
