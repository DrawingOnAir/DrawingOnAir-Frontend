import { createAction, createReducer } from "@reduxjs/toolkit";

import CIRCLE_COLORS from "../config/circleColors";

export const changeColors = createAction("changeColors");

const selectColorReducer = createReducer(CIRCLE_COLORS[0], {
  [changeColors]: (state, action) => {
    return action.payload;
  },
});

export default selectColorReducer;
