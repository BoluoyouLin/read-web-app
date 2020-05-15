import { getCurrentUser } from './localStorage'
import { addBookToShelfInDataBase, getBookShelfId, removeBookOfShelf } from '../api/shelf'

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

// 添加图书到书架
export function addBookToShelf (book, vue) {
    const userId = getCurrentUser().id
    addBookToShelfInDataBase(book.id, userId).then(() => {
        vue.setShelfList(vue.getShelfList())
    })
}

// 将图书移除书架
export function deleteBookInShelf (book, vue) {
    const userId = getCurrentUser().id
    getBookShelfId(book.id, userId).then(res => {
        if (res.data.error_code === 0) {
            removeBookOfShelf(res.data.data[0].id).then(() => {
                return vue.getShelfList()
            })
        } else {
            const toast = vue.toast({
                text: res.data.msg
            })
            toast.updateCurrentText(res.data.msg)
            vue.$nextTick(() => {
                toast.show()
            })
        }
    })
}
