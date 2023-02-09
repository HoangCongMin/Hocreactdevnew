import React from "react";
import { ActionType } from'../reduccer/Action'
export const initState = {
  age: 9,
};

export default function reducer(state : typeof initState, Action:ActionType) {
  if (Action.type === "add") {
    return { ...state, age: state.age + 1 };
  }
  if (Action.type === "giam") {
    return { ...state, age: state.age -1 };
  }
  if(Action.type==='add3'){
    return{...state,age:state.age+Action.payload}
  }
  return state
}
