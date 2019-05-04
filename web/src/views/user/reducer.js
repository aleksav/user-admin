
import moment from 'moment'
import _ from 'underscore'

import { user_create_INITIATED, user_create_SUCCESS, user_create_ERROR, user_list_INITIATED, user_list_SUCCESS, user_list_ERROR, user_update_INITIATED, user_update_SUCCESS, user_update_ERROR, user_destroy_INITIATED, user_destroy_SUCCESS, user_destroy_ERROR, user_show_INITIATED, user_show_SUCCESS, user_show_ERROR } from './actions'

const initial_state = {
    data : {},
    synced : undefined,
    dirty : false,
    loading : false,
    errors : []
}

export const user = ( state = initial_state, action) => {
    switch(action.type) {
        
            case user_create_INITIATED.name:
                return {
                    ...state,
                    dirty : true,
                    loading : true
                }
            case user_create_SUCCESS.name:
                return {
                    ...state, // TODO
                    loading : false,
                    dirty : false
                }
            case user_create_ERROR.name:
                return {
                    ...state,
                    loading : false,
                    dirty : false,
                    errors : action.errors
                }

            case user_list_INITIATED.name:
                return {
                    ...state,
                    loading : true
                }
            case user_list_SUCCESS.name:
                return {
                    ...state,
                    synced : moment.utc(),
                    loading : false,
                    dirty : false,
                    data : _.object(action.data.map(e => e.id), action.data)
                }
            case user_list_ERROR.name:
                return {
                    ...state,
                    loading : false,
                    dirty : false,
                    errors : action.errors
                }

            case user_update_INITIATED.name:
                return {
                    ...state,
                    dirty : true,
                    loading : true
                }
            case user_update_SUCCESS.name:
                return {
                    ...state,
                    loading : false,
                    dirty : false
                }
            case user_update_ERROR.name:
                return {
                    ...state,
                    loading : false,
                    dirty : false,
                    errors : action.errors
                }

            case user_destroy_INITIATED.name:
                return {
                    ...state,
                    dirty : true,
                    loading : true
                }
            case user_destroy_SUCCESS.name:
                return {
                    ...state,
                    loading : false,
                    dirty : false
                }
            case user_destroy_ERROR.name:
                return {
                    ...state,
                    loading : false,
                    dirty : false,
                    errors : action.errors
                }

            case user_show_INITIATED.name:
                return {
                    ...state,
                }
            case user_show_SUCCESS.name:
                return {
                    ...state,
                    data : _(state.data).extend(_.object([[action.data.id, action.data]]))
                }
            case user_show_ERROR.name:
                return {
                    ...state,
                }

        default:
            return state
    }
}
