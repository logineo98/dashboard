import { ERROR_POST_PAY, GET_ALL_POST_PAYS, LOADING_POST_PAY } from '../constants'

const initialState = {
    allPostPays: [] as any[],
    loadingPostPay: false,
    error: null
}

const postPayReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_POST_PAY:
            return { ...state, loadingPostPay: true }

        case ERROR_POST_PAY:
            return { ...state, error: payload, loadingPostPay: false }

        case GET_ALL_POST_PAYS:
            return { ...state, allPostPays: payload, loadingPostPay: false, error: null }


        default:
            return state
    }
}

export default postPayReducer