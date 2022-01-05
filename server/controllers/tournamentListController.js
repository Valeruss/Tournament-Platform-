const uuid = require('uuid') // генерирует рандомные айди, которые не будут повторятся
const {TournamentList} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')

class TournamentListController {
    async create (req, res, next) {
        try {
            const {name, description, open, size, date, startTime, endTime, status} = req.body
            
            if (startTime > endTime) {
                next(ApiError.badRequest(e.message))                                // ОБРАБОТАТЬ 2 ОШИБКИ !!!!!!!!!!!!!!!!!!!
            }
            // date = new Date(date)  // преобразовываем, что бы можно было сравнить
            // if (date < Date.now()) {
            //     next(ApiError.badRequest(e.message))
            // }

            const tournament = await TournamentList.create({name, description, open, size, date, startTime, endTime, status})
            return res.json(tournament)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res) {
        let {status, limit, page} = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit

        let tournamentList 

        if(status === 'All') {
            tournamentList = await TournamentList.findAndCountAll({limit, offset})
        }
        if(status === 'Upcoming') {
            tournamentList = await TournamentList.findAndCountAll({where: {status}, limit, offset})
        }
        if(status === 'Ongoing') {
            tournamentList = await TournamentList.findAndCountAll({where: {status}, limit, offset})
        }
        if(status === 'Finished') {
            tournamentList = await TournamentList.findAndCountAll({where: {status}, limit, offset})
        }
        if(!status) {
            tournamentList = await TournamentList.findAndCountAll({limit, offset})
        }
        
        return res.json(tournamentList)
    }

    async getOne (req, res) {
        const {id} = req.params
        const tournamentList = await TournamentList.findOne({where: {id}})
        return res.json(tournamentList)
    }

    async updateStatus (req, res) {
        const {id, status} = req.body
        const tournamentList = await TournamentList.update({status: status}, {where: {id: id}})
        return res.json(tournamentList)
    }
    
    async updateRegisteredUsers (req, res) {
        const {trn_id, user_id} = req.body
        const tournamentList = await TournamentList.update(
            {registeredUsers: Sequelize.fn('array_append', Sequelize.col('registeredUsers'), user_id)},
            {where: {id: trn_id}}
        )
        return res.json(tournamentList)
    }
}

module.exports = new TournamentListController()