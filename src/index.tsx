import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvide } from './contexts/ThemeProvide';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvide>
      <App />
    </ThemeProvide>
  </React.StrictMode>,
  document.getElementById('root')
);