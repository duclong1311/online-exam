import { isError } from "lodash";
import { FETCH_USER_ERROR, FETCH_USER_REQUEST, FETCH_USER_SUCESS } from "../Actions/userActions";

const INITIAL_STATE = {
    listUsers: [],
    isLoading: false,
    isError: false
};
const fetchDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_USER_SUCESS:
            return {
                ...state, listUsers: action.dataUser,
                isLoading: false,
                isError: false
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default: return state;
    }
};

export default fetchDataReducer;