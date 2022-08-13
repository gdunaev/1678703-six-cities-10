import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store/index';
import {ToastContainer} from 'react-toastify';
import {checkAuthAction, fetchOffersAction, fetchFavoritesOffersAction} from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';


store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoritesOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
