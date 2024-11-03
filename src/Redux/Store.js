import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from './Reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store)

export { store, persistor }