import {ADD_COUNTER} from "../actions/index";

const globalState = {
    countGlobal : 0
  };
  
  //reducer
  const counter = (state = globalState,action) => {
        if (action.type == "ADD_COUNT") {
          return {
            ...state,
            countGlobal : state.countGlobal+ 1
          }
        }
        if (action.type == "SUB_COUNT") {
          return {
            ...state,
            countGlobal : state.countGlobal-  1
          }
        }
        return state
  };

  export default counter;