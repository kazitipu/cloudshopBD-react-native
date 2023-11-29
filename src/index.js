import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import sagas from "@sagas";
import reducers from "@reducer";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./AppNavigator";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/Action";
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: () => true });
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(true);

let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunkMiddleware))
);

sagaMiddleware.run(sagas);
let persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default App;
