import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import 'nprogress/nprogress.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
