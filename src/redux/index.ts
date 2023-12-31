import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import home from './modules/home'

// create reducer
const reducer = combineReducers({
  home
})

// redux persist
const persistConfig = {
  key: 'redux-state',
  storage: storage
}
const persistReducerConfig = persistReducer(persistConfig, reducer)

// redux middleWares
const middleWares = [reduxThunk, reduxPromise]

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: middleWares,
  devTools: true
})

// create persist store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()
