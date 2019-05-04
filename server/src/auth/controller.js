import { sign } from '../services/jwt'
import { success, notFound } from '../services/response/'
import { user_model } from '../entities/user/model'
import { failure } from "../services/response";
import _ from 'underscore'

const auth_view = user => ({
  user: _.omit(user.toObject(), ['password', 'keywords', '__v'])
})

export const login = ({ user }, res, next) =>
  sign(user, {expiresIn:'1h'})
    .then(token => {
      res.cookie('access_token', token)
      return auth_view(user)
    })
    .then(success(res, 200))
    .catch(failure(res, next))

export const showMe = ({ user }, res) =>
  res.json(auth_view(user))

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) => {
  const isSelfUpdate = user.id === params.id

  if (!isSelfUpdate) {
    return res.status(401).json({
      valid: false,
      param: 'password',
      message: 'You can\'t change other user\'s password'
    })
  }

  return user_model.findById(user.id)
    .then(notFound(res))
    .then((user) => user ? user.set({password: body.password}).save() : null)
    .then((user) => user ? auth_view(user): null)
    .then(success(res))
    .catch(failure(res, next))
}
