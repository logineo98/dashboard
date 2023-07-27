import { ADD_COMMUNE, DELETE_COMMUNE, EDIT_COMMUNE, ERROR_COMMUNE, GET_ALL_COMMUNES, LOADING_COMMUNE } from "../constants"

const initialState = {
    allCommunes: [] as any[],
    loadingCommune: false,
    error: null
}

const communeReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_COMMUNE:
            return { ...state, loadingCommune: true }

        case ERROR_COMMUNE:
            return { ...state, error: payload, loadingCommune: false }

        case GET_ALL_COMMUNES:
            return { ...state, allCommunes: payload, loadingCommune: false, error: null }

        case ADD_COMMUNE:
            return { ...state, allCommunes: [payload, ...state.allCommunes], loadingCommune: false, error: null }

        case EDIT_COMMUNE:
            return {
                ...state,
                allCommunes: state.allCommunes.map(commune => {
                    if (commune.id === payload.id) {
                        return payload
                    } else return commune
                }),
                loadingCommune: false, error: null
            }

        case DELETE_COMMUNE:
            return {
                ...state,
                allCommunes: state.allCommunes.filter(commune => commune.id !== payload.id),
                loadingCommune: false, error: null
            }

        default:
            return state
    }
}

export default communeReducer
