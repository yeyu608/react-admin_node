const router = require('express').Router()

const { register, login, info,chunk } = require('../controller/user.ts')


router.post('/register', register)

router.post('/login', login)

router.post('/home', info)

router.post('/chunk', chunk)




module.exports = router