export type ActionType =
  | { type: "add" }
  | { type: "giam" }
  | {type: "add3", payload:number};

export const additem = () => {
  return {
    type: "add",
  } as ActionType;
};

export const giamcount = () => {
  return {
    type: "giam",
  } as ActionType;
};

export const addeitem = (payload: number) => {
  return {
    type: "add3",
    payload,
  } as ActionType;
};
