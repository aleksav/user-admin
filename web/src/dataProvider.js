import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY,
  fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
import { apiUrl } from './config';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      let queryField;
      switch (order) {
        case 'ASC':
          queryField = field;
          break;
        case 'DESC':
          queryField = `-${field}`;
          break;
        default:
          console.log('Order is not defined')
      }

      const query = {
        page: page,
        limit: perPage,
        sort: `${queryField},-createdAt`
      };

      if (params.filter) {
        for (let property in params.filter) {
          if (params.filter.hasOwnProperty(property)) {
            query[property] = params.filter[property];
          }
        }
      }

      return { url: `${apiUrl}/${resource}?${stringify(query)}` };
    }
    case GET_ONE:
      return { url: `${apiUrl}/${resource}/${params.id}` };
    case GET_MANY: {
      const query = {
        id: params.ids
      };
      return { url: `${apiUrl}/${resource}?${stringify(query)}` };
    }
    case GET_MANY_REFERENCE: {
      const query = {
        [params.target]: params.id
      }
      return { url: `${apiUrl}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
      params.data.id = params.id;
      return {
        url: `${apiUrl}/${resource}`,
        options: { method: 'PUT', body: JSON.stringify(params.data) },
      };
    case CREATE:
      return {
        url: `${apiUrl}/${resource}`,
        options: { method: 'POST', body: JSON.stringify(params.data) },
      };
    case DELETE:
      return {
        url: `${apiUrl}/${resource}/${params.id}`,
        options: { method: 'DELETE' },
      };
    case DELETE_MANY:
      const query = {
        id: params.ids,
      };
      return {
        url: `${apiUrl}/${resource}?${stringify(query)}`,
        options: { method: 'DELETE' }
      }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
  const { headers, json } = response;

  switch (type) {
    case GET_LIST:
      let total = parseInt(headers.get('content-range'), 10);
      return {
        data: json,
        total: total ? total : 10
      };
    case GET_MANY_REFERENCE:
      return {
        data: json,
        total: json.length
      };
    case CREATE:
      return { data: { ...params.data, id: json.id } };
    case DELETE:
      return { data: { ...params.previousData, id: params.id } };
    case DELETE_MANY:
      return { data: [] };
    default:
      return { data: json };
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;
  const { url, options={} } = convertDataProviderRequestToHTTP(type, resource, params);

  options.credentials = 'include';

  return fetchJson(url, options)
    .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
