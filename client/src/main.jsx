import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./index.css";
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import MedicineReducer from './features/MedicineSlice.js'



const store = configureStore({
  reducer: {
    medicines: MedicineReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
