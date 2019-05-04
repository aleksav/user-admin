
import { success, notFound, notAuthorised, failure } from '../../services/response/'
import logger from '../../services/logger'
import { user_model } from './model'


    
    
    
    

export const create = ({ bodymen: { body }, user:_user }, res, next) => {
  
          user_model.create(body)
          
          .then(success(res, 201))
          .catch(failure(res, next))
}


export const list = ({ querymen: { query, select, cursor }, user:_user }, res, next) => {
  const _query = query
    
          user_model.find(_query, select, cursor)
          
          .then(success(res))
          .catch(failure(res, next))
}


export const update = ({ bodymen: { body }, user:_user }, res, next) => {
  const _query = { _id: body.id }
    
          user_model.findOne(_query)
          .then(notFound(res))
          
          .then((user) => user ? Object.assign(user, body).save() : null)
          
          .then(success(res))
          .catch(failure(res, next))
}


export const destroy = ({ params, user:_user }, res, next) => {
  const _query = { _id: params.id }
    
          user_model.findOne(_query)
          .then(notFound(res))
          
          .then((user) => user ? user.remove() : null)
          
          .then(success(res, 204))
          .catch(failure(res, next))
}

export const destroyMany = ({ querymen: { query, select, cursor }, user:_user }, res, next) => {
  const _query = query
    
          user_model.find(_query, select, cursor)
          
          .then((users) => users.map((user) => user.remove()))
          
          .then(success(res, 204))
          .catch(failure(res, next))
}


export const show = ({ params, user:_user }, res, next) => {
  const _query = { _id: params.id }
    
          user_model.findOne(_query)
          .then(notFound(res))
          
          .then(success(res))
          .catch(failure(res, next))
}

