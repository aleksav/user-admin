import _ from 'underscore'

export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const failure = (res, next) => (error) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    res.statusMessage = "Duplicate keys";
    res.status(409).end()
  } else {
    next(error)
  }
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

/**
 * Promise is rejected with a not found response if entity (could be either array or object) is empty.
 * Otherwise promise is resolved with the entity back
 */
export const notFoundEmptyResponse = (res) => (entity) =>
  new Promise((resolve, reject) => _.isEmpty(entity) ? reject(res.sendStatus(404)) : resolve(entity))

export const notAuthorised = (res) => {
  res.status(403).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
