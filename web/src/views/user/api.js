
import { api } from '../../api'


export const post_user = (user) => api
    .post(`/user`, user)
    .then(response => response.data) 

export const list_user = () => api
    .get(`/user`)
    .then(response => response.data) 

export const put_user = (user) => api
    .put(`/user/${user.id}`, user)
    .then(response => response.data) 

export const delete_user = (user) => api
    .delete(`/user/${user.id}`)
    .then(response => response.data) 

export const get_user = (id) => api
    .get(`/user/${id}`)
    .then(response => response.data) 

