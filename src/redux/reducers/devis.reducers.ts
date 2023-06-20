import { ERROR_DEVIS, GET_ALL_DEVIS, LOADING_DEVIS, VALIDATE_DEVIS } from "../constants"

const initialState = {
    allDevis: [] as any[],
    loadingDevis: false,
    error: null
}

const devisReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_DEVIS:
            return { ...state, loadingDevis: true }

        case ERROR_DEVIS:
            return { ...state, error: payload, loadingDevis: false }

        case GET_ALL_DEVIS:
            return { ...state, allDevis: payload, loadingDevis: false, error: null }

        case VALIDATE_DEVIS:
            return {
                ...state,
                allDevis: state.allDevis.map(devis => {
                    if (devis.id === payload.id) {
                        return payload.data
                    } else return devis
                }),
                loadingDevis: false, error: null
            }

        default:
            return state
    }
}

export default devisReducer
