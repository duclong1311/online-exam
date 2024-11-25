import { combineReducers } from "redux";
import userReducer from "./userReducer";
import counterReducer from './counterReducer';
import fetchDataReducer from './fetchDataReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    fetchData: fetchDataReducer,
});

export default rootReducer;