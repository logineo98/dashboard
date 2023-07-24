import { ERROR_ASSISTANCE, GET_ALL_ASSISTANCES, GET_ASSISTANCE, LOADING_ASSISTANCE, REPLY_ASSISTANCE, } from '../constants'

const initialState = {
    allAssistances: [] as any[],
    loadingAssistance: false,
    assistance: null,
    error: null
}

const assistanceReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_ASSISTANCE:
            return { ...state, loadingAssistance: true }

        case ERROR_ASSISTANCE:
            return { ...state, error: payload, loadingAssistance: false }

        case GET_ALL_ASSISTANCES:
            return { ...state, allAssistances: payload, loadingAssistance: false, error: null }

        case GET_ASSISTANCE:
            return { ...state, assistance: payload, loadingAssistance: false, error: null }

        case REPLY_ASSISTANCE:
            return { ...state, assistance: payload, loadingAssistance: false, error: null }

        default:
            return state
    }
}

export default assistanceReducer