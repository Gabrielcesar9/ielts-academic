import { combineReducers } from "redux";
import listeningReducer from "./listening";
import writingReducer from "./writing";
import readingReducer from "./reading";
import emailReducer from "./email";

const allReducers = combineReducers({
    Listening:listeningReducer,
    Reading:readingReducer,
    Writing:writingReducer,
    Email:emailReducer
})

export default allReducers
