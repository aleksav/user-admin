import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import uuidv4 from 'uuid/v4'
import _ from 'underscore'
import { jwtSecret } from '../../config'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (user, options, method = jwtSign) =>
  method({
    sub: user._id,
    user: _.omit(user.toObject(), ['_id', 'password', 'keywords', '__v']),
    aud: 'user-admin',
    iss: 'user-admin',
    jti: uuidv4()
  }, jwtSecret, options)

export const signSync = (user, options) => sign(user, options, jwt.sign)

export const verify = (token) => jwtVerify(token, jwtSecret)
