import { ERROR_DEVIS, EXPORT_DEVIS, FILTER_DEVIS, GET_ALL_DEVIS, IMPORT_DEVIS, LOADING_DEVIS, VALIDATE_DEVIS } from "../constants"

const initialState = {
    allDevis: [] as any[],
    devisFilter: false,
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
            return { ...state, allDevis: payload, devisFilter: false, loadingDevis: false, error: null }

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

        case FILTER_DEVIS:
            return { ...state, allDevis: payload, devisFilter: true, loadingDevis: false, error: null }

        case EXPORT_DEVIS:
            return { ...state, loadingDevis: false, error: null }

        case IMPORT_DEVIS:
            return { ...state, loadingDevis: false, error: null }

        default:
            return state
    }
}

export default devisReducer
