import { combineReducers } from "redux";
import pinInputConfigReducer, {
  PinInputConfigState,
} from "./pinInputConfigReducer";

export interface ReducerData {
  pinInputConfig: PinInputConfigState;
}

const rootReducer = combineReducers({
  pinInputConfig: pinInputConfigReducer,
});

export default rootReducer;
