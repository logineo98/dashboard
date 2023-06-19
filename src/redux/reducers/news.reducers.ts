import { ADD_NEWS, DELETE_NEWS, EDIT_NEWS, ERROR_NEWS, GET_ALL_NEWS, LOADING_NEWS } from "../constants"

const initialState = {
    allNews: [] as any[],
    loadingNews: false,
    error: null
}

const newReducer = (state = initialState, action: { type: string, payload: any }) => {
    const { type, payload } = action

    switch (type) {
        case LOADING_NEWS:
            return { ...state, loadingNews: true }

        case ERROR_NEWS:
            return { ...state, error: payload, loadingNews: false }

        case GET_ALL_NEWS:
            return { ...state, allNews: payload, loadingNews: false, error: null }

        case ADD_NEWS:
            return { ...state, allNews: [payload, ...state.allNews], loadingNews: false, error: null }

        case EDIT_NEWS:
            return {
                ...state,
                allNews: state.allNews.map(news => {
                    if (news.id === payload.id) {
                        return payload
                    } else return news
                }),
                loadingNews: false, error: null
            }

        case DELETE_NEWS:
            return {
                ...state,
                allNews: state.allNews.filter(news => news.id !== payload.id),
                loadingNews: false, error: null
            }

        default:
            return state
    }
}

export default newReducer
