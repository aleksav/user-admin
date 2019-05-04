
import {
    post_user,
    list_user,
    put_user,
    delete_user,
    get_user
} from './api'


export const user_create_INITIATED = (new_user) => ({
    type : user_create_INITIATED.name,
    data : new_user
})
export const user_create_SUCCESS = (saved_user) => ({
    type : user_create_SUCCESS.name,
    data : saved_user
})
export const user_create_ERROR = (error) => ({
    type : user_create_ERROR.name,
    errors : [error]
})
export const user_create = (new_user) => dispatch => {
    dispatch( user_create_INITIATED(new_user) )
    post_user(new_user)
    .then(saved_user => dispatch(user_create_SUCCESS(saved_user)))
    .catch(error => dispatch(user_create_ERROR(error)))
}


export const user_list_INITIATED = (requested_user) => ({
    type : user_list_INITIATED.name,
    data : requested_user
})
export const user_list_SUCCESS = (retrieved_user) => ({
    type : user_list_SUCCESS.name,
    data : retrieved_user
})
export const user_list_ERROR = (error) => ({
    type : user_list_ERROR.name,
    errors : [error]
})
export const user_list = (requested_user) => dispatch => {
    dispatch( user_list_INITIATED(requested_user) )
    list_user(requested_user)
    .then(retrieved_user => dispatch(user_list_SUCCESS(retrieved_user)))
    .catch(error => dispatch(user_list_ERROR(error)))
}


export const user_update_INITIATED = (updated_user) => ({
    type : user_update_INITIATED.name,
    data : updated_user
})
export const user_update_SUCCESS = (saved_user) => ({
    type : user_update_SUCCESS.name,
    data : saved_user
})
export const user_update_ERROR = (error) => ({
    type : user_update_ERROR.name,
    errors : [error]
})
export const user_update = (updated_user) => dispatch => {
    dispatch( user_update_INITIATED(updated_user) )
    put_user(updated_user)
    .then(saved_user => dispatch(user_update_SUCCESS(saved_user)))
    .catch(error => dispatch(user_update_ERROR(error)))
}


export const user_destroy_INITIATED = (doomed_user) => ({
    type : user_destroy_INITIATED.name,
    data : doomed_user
})
export const user_destroy_SUCCESS = (deleted_user) => ({
    type : user_destroy_SUCCESS.name,
    data : deleted_user
})
export const user_destroy_ERROR = (error) => ({
    type : user_destroy_ERROR.name,
    errors : [error]
})
export const user_destroy = (doomed_user) => dispatch => {
    dispatch( user_destroy_INITIATED(doomed_user) )
    delete_user(doomed_user)
    .then(deleted_user => dispatch(user_destroy_SUCCESS(deleted_user)))
    .catch(error => dispatch(user_destroy_ERROR(error)))
}


export const user_show_INITIATED = (requested_user_id) => ({
    type : user_show_INITIATED.name,
    data : requested_user_id
})
export const user_show_SUCCESS = (retrieved_user) => ({
    type : user_show_SUCCESS.name,
    data : retrieved_user
})
export const user_show_ERROR = (error) => ({
    type : user_show_ERROR.name,
    errors : [error]
})
export const user_show = (requested_user_id) => dispatch => {
    dispatch( user_show_INITIATED(requested_user_id) )
    get_user(requested_user_id)
    .then(retrieved_user => dispatch(user_show_SUCCESS(retrieved_user)))
    .catch(error => dispatch(user_show_ERROR(error)))
}
