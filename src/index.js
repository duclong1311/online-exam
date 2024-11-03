import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/Store';
import 'nprogress/nprogress.css';
import { PersistGate } from 'redux-persist/integration/react'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
