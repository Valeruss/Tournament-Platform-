const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const tournamentListRouter = require('./tournamentListRouter')
const profileRouter = require('./profileRouter')

router.use('/user', userRouter)
router.use('/tournament_list', tournamentListRouter)
router.use('/profile', profileRouter)

module.exports = router