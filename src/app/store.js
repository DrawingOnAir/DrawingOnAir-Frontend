import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import compositeDataReducer from "../features/compositeDataReducer";
import getMainDataReducer from "../features/getMainDataReducer";
import selectColorReducer from "../features/selectColorReducer";
import selectLineThicknessReducer from "../features/selectLineThicknessReducer";

const reducer = {
  compositingData: compositeDataReducer,
  selectingColor: selectColorReducer,
  selectingLineThickness: selectLineThicknessReducer,
  gettingMainData: getMainDataReducer,
};

const store = configureStore({
  reducer,
  middleware: [logger],
});

export default store;

const rootReducerForTestingLibrary = combineReducers({ ...reducer });

export function TestSetupStore(preloadedState) {
  return configureStore({
    reducer: rootReducerForTestingLibrary,
    preloadedState,
  });
}
