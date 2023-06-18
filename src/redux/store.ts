import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

// dev extension
import { composeWithDevTools } from '@redux-devtools/extension'

// importation des reducers
import userReducer from './reducers/user.reducers'


// regrouper tous les reducers
const rootReducer = combineReducers({
    user: userReducer,
    // news: newReducer,
    // information: informationReducer,
    // town: townReducer,
    // devis: devisReducer,
    // post_pay: postPayReducer,
    // pre_pay: prePayReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store