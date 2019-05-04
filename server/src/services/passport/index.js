import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import { user_model, schema, roles } from '../../entities/user/model'
import logger from '../logger'
import _ from 'underscore'

const unauthorized = (logger_level, message, res) => {
  logger_level(message)
  res.status(401).end()
}

const authorized = (auth, req, res, next) => {
  return req.logIn(auth, { session: false }, (err) => {
    if (err) return unauthorized(logger.error, `Passport login error: ${err}`, res)
    next()
  })
}

const rolesMatch = (authorised_roles, user_roles) => {
  return _.intersection(authorised_roles, user_roles).length > 0
}

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, auth, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    }
    if (err) {
      return unauthorized(logger.error, `Passport authenticate error: ${err}`, res)
    }
    if (!auth) {
      return unauthorized(logger.info, `No auth user returned`, res)
    }
    return authorized(auth, req, res, next)
  })(req, res, next)

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ authorised_roles = roles } = {}) => (req, res, next) =>
  passport.authenticate(['master', 'token'], { session: false }, (err, auth, info) => {
    if (err) {
      return unauthorized(logger.error, `Passport authenticate error: ${err}`, res)
    }
    if (!auth) {
      return unauthorized(logger.info, `No auth user returned`, res)
    }
    if (auth.type === 'master_key') {
      logger.info('Using master_key auth!')
      return authorized(auth, req, res, next)
    }
    if (rolesMatch(authorised_roles, auth.roles)) {
      return authorized(auth, req, res, next)
    }
    return unauthorized(logger.info, `Unauthorised due to user roles mismatch`, res)
  })(req, res, next)

passport.use('password', new BasicStrategy((username, password, done) => {
  const authSchema = new Schema({ username: schema.tree.username, password: schema.tree.password })

  authSchema.validate({ username, password }, (err) => {
    if (err) done(err)
  })

  user_model.findOne({ username })
    .then(user => {
      if (!user) {
        done(null, false)
        return null
      }
      return user.authenticate(password)
        .then(valid => {
          if (!valid) {
            done(null, false)
            return null
          }
          done(null, user)
          return null
        })
    })
    .catch(done)
}))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    logger.info('Master key autheticated.')
    done(null, { type: 'master_key' })
  } else {
    done(null, false)
  }
}))

const cookieTokenExtractor = (req) => {
  if (req && req.cookies) return req.cookies['access_token']
  return null
}

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromHeader('access_token'),
    ExtractJwt.fromExtractors([cookieTokenExtractor]),
  ])
}, ({ sub, user, aud }, done) => {
  if (aud == 'user-admin') {
    done(null, new user_model({ _id: sub, ...user }))
  } else {
    done(new Error(`Invalid audience ${aud}`), null)
  }
}))
