import { createAction, createReducer } from "@reduxjs/toolkit";

export const getMainTag = createAction("getMainTag");

const getMainDataReducer = createReducer(null, {
  [getMainTag]: (state, action) => {
    return action.payload;
  },
});

export default getMainDataReducer;
