import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PlanningProvider } from "./components/context/Planningcontext";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlanningProvider>
        <App />
      </PlanningProvider>
    </BrowserRouter>
  </React.StrictMode>
);
