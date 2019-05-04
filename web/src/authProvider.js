import { AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT, AUTH_GET_PERMISSIONS, fetchUtils } from 'react-admin';
import { apiUrl } from './config';
import Cookies from 'js-cookie';
import logger from './logger'

const {fetchJson} = fetchUtils;

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const {username, password} = params;
    return fetchJson(`${apiUrl}/auth`, {
      method: 'PUT',
      user: {
        authenticated: true,
        token: `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`
      },
      credentials: 'include'
    })
      .then(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.statusText);
        }
        localStorage.setItem('user', JSON.stringify(res.json.user));
        return Promise.resolve()
      })
      .catch(err => {
        logger.error(`authProvider ${type}`, {
          error: err
        });
        return Promise.reject()
      })
  }
  if (type === AUTH_LOGOUT) {
    Cookies.remove('access_token');
    localStorage.removeItem('user');
    return Promise.resolve()
  }
  if (type === AUTH_ERROR) {
    const {status} = params;
    if (status === 401) {
      logger.error(`authProvider ${type}`);
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return fetchJson(`${apiUrl}/auth`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.json.user));
        return Promise.resolve()
      })
      .catch(err => {
        logger.error(`authProvider ${type}`, {
          error: err
        });
        return Promise.reject()
      })
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const { roles } = JSON.parse(localStorage.getItem('user'));
    return roles ? Promise.resolve(roles) : Promise.resolve(['anonymous']);
  }
  return Promise.resolve();
};
