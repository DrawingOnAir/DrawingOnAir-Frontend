import { createAction, createReducer } from "@reduxjs/toolkit";

import COMPOSITE_TYPE from "../config/compositeType";

export const changeCompositeType = createAction("chageCompositeType");

const compositeDataReducer = createReducer(COMPOSITE_TYPE[0], {
  [changeCompositeType]: (state, action) => {
    return action.payload;
  },
});

export default compositeDataReducer;
