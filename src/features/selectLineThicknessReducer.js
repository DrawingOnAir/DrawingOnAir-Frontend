import { createAction, createReducer } from "@reduxjs/toolkit";

import LINE_THICKNESSES from "../config/lineThicknesses";

export const changelineThicknesses = createAction("changelineThicknesses");

const selectLineThicknessReducer = createReducer(LINE_THICKNESSES[0], {
  [changelineThicknesses]: (state, action) => {
    return action.payload;
  },
});

export default selectLineThicknessReducer;
