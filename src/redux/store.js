import { isFunction } from "lodash";
import { createStore } from "redux";
import { SET_USER_INITIALS } from "./action";

const initialState = {
    userInitials: undefined
}

const reduce = {
    [SET_USER_INITIALS]: (state, payload) => ({
        ...state, 
        userInitials: payload
    })
}

export const reducer = (state = initialState, action) => {
    const reducerFunction = reduce[action.type];
    return isFunction(reducerFunction) ? reducerFunction(state, action.payload) : state
}

export const store = createStore(reducer)