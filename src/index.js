import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Questions from './components/Questions';
import App from './App';
import './index.css';
import Result from './components/Result';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/:category",
    element: <Questions/>
  },
  {
    path: "/Result",
    element: <Result/>
  }

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
