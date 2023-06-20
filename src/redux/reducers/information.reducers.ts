import { ADD_INFORMATION, DELETE_INFORMATION, EDIT_INFORMATION, ERROR_INFORMATION, GET_ALL_INFORMATIONS, LOADING_INFORMATION } from "../constants"

const initialState = {
    allInformations: [] as any[],
    loadingInfo: false,
    error: null
}

const informationReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_INFORMATION:
            return { ...state, loadingInfo: true }

        case ERROR_INFORMATION:
            return { ...state, error: payload, loadingInfo: false }

        case GET_ALL_INFORMATIONS:
            return { ...state, allInformations: payload, loadingInfo: false, error: null }

        case ADD_INFORMATION:
            return { ...state, allInformations: [payload, ...state.allInformations], loadingInfo: false, error: null }

        case EDIT_INFORMATION:
            return {
                ...state,
                allInformations: state.allInformations.map(information => {
                    if (information.id === payload.id) {
                        return payload
                    } else return information
                }),
                loadingInfo: false, error: null
            }

        case DELETE_INFORMATION:
            return {
                ...state,
                allInformations: state.allInformations.filter(information => information.id !== payload.id),
                loadingInfo: false, error: null
            }

        default:
            return state
    }
}

export default informationReducer
