import { ERROR_PRE_PAY, EXPORT_PRE_PAY, FILTER_PRE_PAY, GET_ALL_PRE_PAYS, LOADING_PRE_PAY } from '../constants'

const initialState = {
    allPrePays: [] as any[],
    prePayFilter: false,
    loadingPrePay: false,
    error: null
}

const prePayReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_PRE_PAY:
            return { ...state, loadingPrePay: true }

        case ERROR_PRE_PAY:
            return { ...state, error: payload, loadingPrePay: false }

        case GET_ALL_PRE_PAYS:
            return { ...state, allPrePays: payload, prePayFilter: false, loadingPrePay: false, error: null }

        case FILTER_PRE_PAY:
            return { ...state, allPrePays: payload, prePayFilter: true, loadingPrePay: false, error: null }

        case EXPORT_PRE_PAY:
            return { ...state, loadingPrePay: false, error: null }

        default:
            return state
    }
}

export default prePayReducer