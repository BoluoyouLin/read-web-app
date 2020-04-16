// eslint-disable-next-line no-extend-native
Array.prototype.pushNoRepeat = function () {
    for (let i = 0; i < arguments.length; i++) {
        const item = arguments[i]
        if (this.indexOf(item) === -1) {
            this.push(item)
        }
    }
}
