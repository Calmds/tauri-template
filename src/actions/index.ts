import reducers from "./reducer";
import { thunk } from "redux-thunk";
import { legacy_createStore, compose, applyMiddleware } from "redux";

// export type RootState = ReturnType<typeof reducers>;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = legacy_createStore(reducers, enhancer);

export default store;