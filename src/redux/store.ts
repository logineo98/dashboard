import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'

// dev extension
import { composeWithDevTools } from '@redux-devtools/extension'

// importation des reducers
import userReducer from './reducers/user.reducers'
import newReducer from './reducers/news.reducers'
import informationReducer from './reducers/information.reducers'
import townReducer from './reducers/town.reducers'
import devisReducer from './reducers/devis.reducers'
import postPayReducer from './reducers/post_pay.reducers'
import prePayReducer from './reducers/pre_pay.reducers'
import statByYearReducer from './reducers/stat_by_year.reducers'
import statReducer from './reducers/stat.reducers'

// regrouper tous les reducers
const rootReducer = combineReducers({
    user: userReducer,
    news: newReducer,
    information: informationReducer,
    town: townReducer,
    devis: devisReducer,
    post_pay: postPayReducer,
    pre_pay: prePayReducer,
    stat: statReducer,
    statByYear: statByYearReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store