import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor () {
        this._isAuth = false
        this._users = []
        this._usersList = []
        this._authUser = []

        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)
    }

    setIsAuth (bool) {
        this._isAuth = bool
    }
    setUser (users) {
        this._users = users
    }
    setUsers (users) {
        this._usersList = users
    }
    setAuthUser (data) {
        this._authUser = data
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get isAuth() {
        return this._isAuth
    }
    get users() {
        return this._users
    }
    get usersList() {
        return this._usersList
    }
    get authUser() {
        return this._authUser
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}