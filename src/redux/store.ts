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
import statReducer from './reducers/stat.reducers'
import statDevisByYearReducer from './reducers/stat_devis_by_year.reducers'
import statPostPayByYearReducer from './reducers/stat_post_pay_by_year.reducers'
import statPrePayByYearRducer from './reducers/stat_pre_pay_by_year.reducers'
import assistanceReducer from './reducers/assistance.reducers'

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
    statDevisByYear: statDevisByYearReducer,
    statPostPayByYear: statPostPayByYearReducer,
    statPrePayByYear: statPrePayByYearRducer,
    assistance: assistanceReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store