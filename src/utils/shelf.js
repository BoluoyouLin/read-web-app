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
