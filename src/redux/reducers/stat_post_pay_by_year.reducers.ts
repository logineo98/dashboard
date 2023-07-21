import { ERROR_STAT_POST_PAY_BY_YEAR, GET_ALL_STATS_POST_PAY_BY_YEAR, LOADING_STAT_POST_PAY_BY_YEAR } from '../constants'

const initialState = {
    allStatsPostPayByYear: null,
    loadingStatPostPayByYear: false,
    error: null
}

const statPostPayByYearReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_STAT_POST_PAY_BY_YEAR:
            return { ...state, loadingStatPostPayByYear: true }

        case ERROR_STAT_POST_PAY_BY_YEAR:
            return { ...state, error: payload, loadingStatPostPayByYear: false }

        case GET_ALL_STATS_POST_PAY_BY_YEAR:
            return { ...state, allStatsPostPayByYear: payload, loadingStatPostPayByYear: false, error: null }

        default:
            return state
    }
}

export default statPostPayByYearReducer