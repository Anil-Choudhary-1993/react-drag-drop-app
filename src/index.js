import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import TodoStore from './Reducers'
import TodoApp from './Containers/TodoApp'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

// Config for redux persist
const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, TodoStore)

const store = createStore(persistedReducer, applyMiddleware(logger))
const persistor = persistStore(store)

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <TodoApp />
    </PersistGate>
</Provider>, document.getElementById('root'));
