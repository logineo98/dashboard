import { ACTIVE_ADMIN_USER, ADD_ADMIN, DELETE_ADMIN, EDIT_ADMIN, EMPTY_ERROR_USER, ERROR_USER, FILTER_CLIENT, GET_ADMIN, GET_ADMIN_BY_USERNAME_OR_PHONE, GET_ALL_ADMINS, GET_ALL_USERS, IS_CONNECTED, LOADING_USER, RESEND_CODE, RESET_FORGET, RESET_PASSWORD, SEND_PIN } from "../constants"

const initialState = {
    connected: false,
    admin: null,
    adminForget: null,
    idForget: null,
    chooseForget: null,
    codeForget: null,
    pinForget: null,
    passwordModifyForget: false,
    allAdmins: [] as any[],
    allUsers: [] as any[],
    clientFilter: false,
    loadingUser: false,
    error: null
}

const userReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_USER:
            return { ...state, loadingUser: true }

        case ERROR_USER:
            return { ...state, error: payload, loadingUser: false }

        case EMPTY_ERROR_USER:
            return { ...state, error: payload, loadingUser: false }

        case IS_CONNECTED:
            return { ...state, connected: payload }

        case GET_ADMIN:
            return { ...state, admin: payload, loadingUser: false, error: null }

        case GET_ADMIN_BY_USERNAME_OR_PHONE:
            return { ...state, adminForget: payload.data, loadingUser: false, error: null }

        case SEND_PIN:
            return { ...state, pinForget: payload.pin, chooseForget: payload.choose, loadingUser: false, error: null }

        case RESET_FORGET:
            return { ...state, adminForget: null, idForget: null, chooseForget: null, codeForget: null, pinForget: null, passwordModifyForget: false, loadingUser: false, error: null }

        case RESEND_CODE:
            return { ...state, pinForget: payload.pin, loadingUser: false, error: null }

        case RESET_PASSWORD:
            return { ...state, passwordModifyForget: payload, loadingUser: false, error: null }

        case ADD_ADMIN:
            return { ...state, allAdmins: [payload, ...state.allAdmins], loadingUser: false, error: null }

        case GET_ALL_ADMINS:
            return { ...state, allAdmins: payload, loadingUser: false, error: null }

        case EDIT_ADMIN:
            return {
                ...state,
                admin: payload.admin_connected,
                allAdmins: state.allAdmins.map(admin => {
                    if (admin.id === payload.data.id) {
                        return payload.data
                    } else return admin
                }),
                loadingUser: false, error: null
            }

        case DELETE_ADMIN:
            return {
                ...state,
                allAdmins: state.allAdmins.filter(admin => admin.id !== payload.id),
                loadingUser: false, error: null
            }

        case GET_ALL_USERS:
            return { ...state, allUsers: payload, clientFilter: false, loadingUser: false, error: null }

        case ACTIVE_ADMIN_USER:
            return {
                ...state,
                allAdmins: state.allAdmins.map(admin => {
                    if (admin.id === payload.id) {
                        return payload
                    } else return admin
                }),
                allUsers: state.allUsers.map(client => {
                    if (client.id === payload.id) {
                        return payload
                    } else return client
                }),
                loadingUser: false, error: null
            }

        case FILTER_CLIENT:
            return { ...state, allUsers: payload, clientFilter: true, loadingUser: false, error: null }

        default:
            return state
    }
}

export default userReducer