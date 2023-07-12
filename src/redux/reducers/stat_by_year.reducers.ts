import { ERROR_STAT_BY_YEAR, GET_ALL_STATS_BY_YEAR, LOADING_STAT_BY_YEAR } from '../constants'

const initialState = {
    allStatsByYear: null,
    loadingStatByYear: false,
    error: null
}

const statByYearReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_STAT_BY_YEAR:
            return { ...state, loadingStatByYear: true }

        case ERROR_STAT_BY_YEAR:
            return { ...state, error: payload, loadingStatByYear: false }

        case GET_ALL_STATS_BY_YEAR:
            return { ...state, allStatsByYear: payload, loadingStatByYear: false, error: null }

        default:
            return state
    }
}

export default statByYearReducer