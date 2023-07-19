import { ERROR_STAT, GET_ALL_STATS, LOADING_STAT } from '../constants'

const initialState = {
    allStats: null,
    loadingStat: false,
    error: null
}

const statReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_STAT:
            return { ...state, loadingStat: true }

        case ERROR_STAT:
            return { ...state, error: payload, loadingStat: false }

        case GET_ALL_STATS:
            return { ...state, allStats: payload, loadingStat: false, error: null }

        default:
            return state
    }
}

export default statReducer