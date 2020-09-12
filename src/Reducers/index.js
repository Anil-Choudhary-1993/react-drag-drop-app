import { combineReducers } from "redux";
import TodoReducer from "./TodoReducers";

const rootReducer = combineReducers({
    todoReducer: TodoReducer
});

export default rootReducer;
