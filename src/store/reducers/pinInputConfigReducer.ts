export interface PinInputConfigState {
  validatePattern: string;
  defaultValue: string;
  isEnableAutoSubmit: boolean;
}

export const UPDATE_VALUE = "UPDATE_VALUE";
export const RESET_DEFAULT = "RESET_DEFAULT";

const initialState: PinInputConfigState = {
  validatePattern: "/[0-9]/",
  defaultValue: "",
  isEnableAutoSubmit: false,
};

const pinInputConfigReducer = (
  state = initialState,
  action: any
): PinInputConfigState => {
  switch (action.type) {
    case UPDATE_VALUE:
      return { ...action.value };
    case RESET_DEFAULT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default pinInputConfigReducer;
