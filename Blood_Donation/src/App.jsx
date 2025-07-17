// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/Route";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadScript } from "@react-google-maps/api";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          <RouterProvider router={router} />
        </LoadScript>
      </PersistGate>
    </Provider>
  );
}

export default App;
