import { createStore, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import { AsyncStorage } from 'react-native'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import reducers from './Reducers/'
import rootSaga from '../Sagas/'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['creations', 'latestCreations', 'feedCreations']
}
const persistedReducer = persistReducer(persistConfig, reducers)

export default function configureStore () {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = compose(
    applyMiddleware(thunk),
    // applyMiddleware(logger),
    applyMiddleware(sagaMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  // const store = createStore(reducers, enhancer)
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  // TO DO : combineReducers was replaced with persistCombineReducers.
  // persistStore(store, { storage: AsyncStorage }, onCompletion);

  return { store, persistor }
}
