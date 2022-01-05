import { makeAutoObservable } from "mobx"

export default class TournamentStore {
    constructor () {
        this._statuses = [{id: 1, name: 'All'}, {id: 2, name: 'Upcoming'}, {id: 3, name: 'Ongoing'}, {id: 4, name: 'Finished'}]
        this._accesses = [{id: 1, name: 'Open'}, {id: 2, name: 'Closed'}]
        this._selectedStatus = {}
        this._selectedAccess = {}
        this._tournaments = []

        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)

    }

    setStatus (id, status) {
        this._tournaments[id].status = status
    }
    setSelectedStatus (status) {
        this.setPage(1)
        this._selectedStatus = status
    }
    setSelectedAccess (access) {
        this._selectedAccess = access
    }
    setTournament (tournaments) {
        this._tournaments = tournaments
    }

    setPage (page) {
        this._page = page
    }
    setTotalCount (count) {
        this._totalCount = count
    }


    get tournaments() {
        return this._tournaments
    }
    get selectedStatus() {
        return this._selectedStatus
    }
    get selectedAccess() {
        return this._selectedAccess
    }
    get statuses () {
        return this._statuses
    }
    get accesses () {
        return this._accesses
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
