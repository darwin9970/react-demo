import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { Provider } from "react-redux"
import { persistor, store } from "@/redux"
import { PersistGate } from "redux-persist/integration/react"

const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

