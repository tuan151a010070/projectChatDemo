import {
  createSlice,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";


let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const configStore = () =>{
  const store = configureStore({
  reducer: {
  },
  middleware
  });

  sagaMiddleware.run(saga);
  return store;
}


export default configStore;
