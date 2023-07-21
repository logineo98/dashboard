import { ERROR_STAT_PRE_PAY_BY_YEAR, GET_ALL_STATS_PRE_PAY_BY_YEAR, LOADING_STAT_PRE_PAY_BY_YEAR } from '../constants'

const initialState = {
    allStatsPrePayByYear: null,
    loadingStatPrePayByYear: false,
    error: null
}

const statPrePayByYearRducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_STAT_PRE_PAY_BY_YEAR:
            return { ...state, loadingStatPrePayByYear: true }

        case ERROR_STAT_PRE_PAY_BY_YEAR:
            return { ...state, error: payload, loadingStatPrePayByYear: false }

        case GET_ALL_STATS_PRE_PAY_BY_YEAR:
            return { ...state, allStatsPrePayByYear: payload, loadingStatPrePayByYear: false, error: null }

        default:
            return state
    }
}

export default statPrePayByYearRducer