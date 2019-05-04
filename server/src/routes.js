
import { Router } from 'express'
import { token } from './services/passport'
import log from './log'
import auth from './auth'


import user from './entities/user'

const router = new Router()

router.use('/api/log', log)
router.use('/api/auth', auth)


router.use('/api/user', user)

export default router
