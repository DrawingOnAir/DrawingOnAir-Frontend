import { createAction, createReducer } from "@reduxjs/toolkit";

import COMPOSITING_TYPE from "../config/compositingType";

export const changeCompositingType = createAction("changeCompositingType");

const compositeDataReducer = createReducer(COMPOSITING_TYPE[0], {
  [changeCompositingType]: (state, action) => {
    return action.payload;
  },
});

export default compositeDataReducer;
