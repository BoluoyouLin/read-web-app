import Mock from 'mockjs'
import home from './bookHome'
import flatList from './bookFlatList'
import list from './bookList'
import shelf from './bookShelf'

Mock.mock(/\/book\/home/, 'get', home)
Mock.mock(/\/book\/flat-list/, 'get', flatList)
Mock.mock(/\/book\/list/, 'get', list)
Mock.mock(/\/book\/shelf/, 'get', shelf)
