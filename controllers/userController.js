const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, nickname, role) => {
    return jwt.sign(
        {id, nickname, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration (req, res, next) {
        const {nickname, password, role} = req.body
        if(!nickname || !password) {
            return next(ApiError.badRequest('Некорректный nickname или password'))
        }
        const candidate = await User.findOne({where: {nickname}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким nickname уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({nickname, role, password: hashPassword})
        const token = generateJwt(user.id, user.nickname, user.role)

        return res.json({token})
    }

    async login (req, res, next) {
        const {nickname, password} = req.body
        const user = await User.findOne({where: {nickname}})
        if(!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.nickname, user.role)

        return res.json({token})
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.nickname, req.user.role)
        return res.json({token})
    }

    // =====================
    async getAdmin (req, res) {
        const {role} = req.params
        const user = await User.findAll({where: {role}})
        return res.json(user)
    }

    async updateAdmin (req, res) {
        const {id, role} = req.body
        const user = await User.update({role}, {where: {id}})
        return res.json(user)
    }
}

module.exports = new UserController()