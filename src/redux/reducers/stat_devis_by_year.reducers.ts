import { ERROR_STAT_DEVIS_BY_YEAR, GET_ALL_STATS_DEVIS_BY_YEAR, LOADING_STAT_DEVIS_BY_YEAR } from '../constants'

const initialState = {
    allStatsDevisByYear: null,
    loadingStatDevisByYear: false,
    error: null
}

const statDevisByYearReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_STAT_DEVIS_BY_YEAR:
            return { ...state, loadingStatDevisByYear: true }

        case ERROR_STAT_DEVIS_BY_YEAR:
            return { ...state, error: payload, loadingStatDevisByYear: false }

        case GET_ALL_STATS_DEVIS_BY_YEAR:
            return { ...state, allStatsDevisByYear: payload, loadingStatDevisByYear: false, error: null }

        default:
            return state
    }
}

export default statDevisByYearReducer