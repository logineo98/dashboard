import { ADD_QUARTER, DELETE_QUARTER, EDIT_QUARTER, ERROR_QUARTER, GET_ALL_QUARTERS, LOADING_QUARTER } from "../constants"

const initialState = {
    allQuaters: [] as any[],
    loadingQuarter: false,
    error: null
}

const quarterReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_QUARTER:
            return { ...state, loadingQuarter: true }

        case ERROR_QUARTER:
            return { ...state, error: payload, loadingQuarter: false }

        case GET_ALL_QUARTERS:
            return { ...state, allQuaters: payload, loadingQuarter: false, error: null }

        case ADD_QUARTER:
            return { ...state, allQuaters: [payload, ...state.allQuaters], loadingQuarter: false, error: null }

        case EDIT_QUARTER:
            return {
                ...state,
                allQuaters: state.allQuaters.map(quarter => {
                    if (quarter.id === payload.id) {
                        return payload
                    } else return quarter
                }),
                loadingQuarter: false, error: null
            }

        case DELETE_QUARTER:
            return {
                ...state,
                allQuaters: state.allQuaters.filter(quarter => quarter.id !== payload.id),
                loadingQuarter: false, error: null
            }

        default:
            return state
    }
}

export default quarterReducer
