import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import compositeDataReducer from "../features/compositeDataReducer";
import selectColorReducer from "../features/selectColorReducer";
import selectLineThicknessReducer from "../features/selectLineThicknessReducer";

const reducer = {
  compositingData: compositeDataReducer,
  selectingColor: selectColorReducer,
  selectingLineThickness: selectLineThicknessReducer,
};

const store = configureStore({
  reducer,
  middleware: [logger],
});

export default store;
