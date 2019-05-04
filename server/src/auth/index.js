import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { login } from './controller'
import { password as passwordAuth, token, master } from '../services/passport'
import { showMe, create, updatePassword } from './controller'
import { schema } from '../entities/user/model'
const { username, password, roles } = schema.tree

const router = new Router()

/**
 Login
 */
router.put('/',
  passwordAuth(),
  login)

/**
 Check if logged in
 */
router.get('/',
  token(),
  showMe)

/**
 Update password
 */
router.put('/:id',
  token(),
  body({ password }),
  updatePassword)


export default router
