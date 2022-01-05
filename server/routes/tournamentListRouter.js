const Router = require('express')
const router = new Router()
const tournamentListController = require('../controllers/tournamentListController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), tournamentListController.create) // checkRole('ADMIN'),
router.get('/', tournamentListController.getAll)
router.get('/:id', tournamentListController.getOne)

router.post('/updateStatus', tournamentListController.updateStatus)
router.post('/updateRegisteredUsers', tournamentListController.updateRegisteredUsers)

module.exports = router