const ApiError = require('../error/ApiError')
const {User} = require('../models/models')

class ProfileController {
    async getAll (req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit

        let profiles = await User.findAndCountAll({limit, offset})
        return res.json(profiles)
    }

    async getOne (req, res) {
        const {id} = req.params
        const profile = await User.findOne(
            {
                where: {id},
            },
        )
        return res.json(profile)
    }
}

module.exports = new ProfileController()