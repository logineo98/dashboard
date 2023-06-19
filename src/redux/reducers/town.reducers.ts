import { ADD_TOWN, DELETE_TOWN, EDIT_TOWN, ERROR_TOWN, GET_ALL_TOWNS, GET_TOWN, LOADING_TOWN } from "../constants"

const initialState = {
    allTowns: [] as any[],
    town: null,
    loadingTown: false,
    error: null
}

const townReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_TOWN:
            return { ...state, loadingTown: true }

        case ERROR_TOWN:
            return { ...state, error: payload, loadingTown: false }

        case GET_ALL_TOWNS:
            return { ...state, allTowns: payload, loadingTown: false, error: null }

        case GET_TOWN:
            return { ...state, town: payload, loadingTown: false, error: null }

        case ADD_TOWN:
            return { ...state, allTowns: [payload, ...state.allTowns], loadingTown: false, error: null }

        case EDIT_TOWN:
            return {
                ...state,
                allTowns: state.allTowns.map(town => {
                    if (town.id === payload.id) {
                        return payload
                    } else return town
                }),
                loadingTown: false, error: null
            }

        case DELETE_TOWN:
            return {
                ...state,
                allTowns: state.allTowns.filter(town => town.id !== payload.id),
                loadingTown: false, error: null
            }

        default:
            return state
    }
}

export default townReducer
