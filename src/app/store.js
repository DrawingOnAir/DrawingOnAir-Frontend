import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import compositeDataReducer from "../features/compositeDataReducer";

const reducer = {
  compositingData: compositeDataReducer,
};

const store = configureStore({
  reducer,
  middleware: [logger],
});

export default store;
