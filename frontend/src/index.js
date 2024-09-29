import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Si tienes un archivo CSS global
import App from './App.jsx';  // El componente principal

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);