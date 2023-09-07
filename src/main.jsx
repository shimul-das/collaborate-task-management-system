import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './Pages/Home/Home.jsx';
import Main from './Layout/Main.jsx';
import Login from './Pages/Login/Login.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import { UserProvider } from './Provider/UserContext.jsx';
import UserDashboard from './Pages/Dashboard/UserDashboard.jsx';
import Dashboard from './Layout/Dashboard.jsx';
import PrivateRoute from './Provider/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element:<Login></Login>
      },
      {
        path: "signup",
        element:<SignUp></SignUp>
      },
    ],
  },
  {
    path: "dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element:<UserDashboard></UserDashboard>,
      }
    ],

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
