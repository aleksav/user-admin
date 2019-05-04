
import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import mongoose from 'mongoose'
import { create, list, update, destroy, show, destroyMany} from './controller'
import { schema } from './model'
import { token } from '../../services/passport'


const { id, email, name, roles, username, password, verified } = schema.tree

const router = new Router()


router.post(
  '/',
  token({ authorised_roles: ['admin'] }),
  body({ username, password, roles, email, name }),
  create
)

      
router.get(
  '/',
  token({ authorised_roles: ['admin'] }),
  query({
    id: {
      type: [mongoose.Types.ObjectId],
      paths: ['_id'],
      operator: '$in'
    },
  
    email: {
      paths: ['email']
    },
    
  
    name: {
      paths: ['name']
    },
    
  
    roles: {
      paths: ['roles']
    },
    
  }),
  list
)

      
router.put(
  '/',
  token({ authorised_roles: ['admin'] }),
  body({ id, email, name, roles }),
  update
)

      
router.delete(
  '/:id([0-9a-f]{24})',
  token({ authorised_roles: ['admin'] }),
  destroy
)

router.delete(
  '/',
  token({ authorised_roles: ['admin'] }),
  query({
    id: {
      type: [mongoose.Types.ObjectId],
      paths: ['_id'],
      operator: '$in'
    }
  }),
  destroyMany
)

      
router.get(
  '/:id([0-9a-f]{24})',
  token({ authorised_roles: ['admin'] }),
  show
)




export default router
