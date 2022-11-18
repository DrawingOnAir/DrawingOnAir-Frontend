import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import compositeDataReducer from "../features/compositeDataReducer";
import selectColorReducer from "../features/selectColorReducer";

const reducer = {
  compositingData: compositeDataReducer,
  selectingColor: selectColorReducer,
};

const store = configureStore({
  reducer,
  middleware: [logger],
});

export default store;
