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
import TaskForm from './Pages/Dashboard/TaskForm.jsx';
import MyTasklist from './Pages/Dashboard/MyTasklist.jsx';
import AllTask from './Pages/Dashboard/AllTask.jsx';

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
      {
        path: "form",
        element:<TaskForm></TaskForm>,
      }
    ],
  },
  {
    path: "dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element:<UserDashboard></UserDashboard>,
      },
      {
        path: "addtask",
        element:<TaskForm></TaskForm>,
      },
      {
        path: "mytasklist",
        element:<MyTasklist></MyTasklist>,
      },
      {
        path: "alltasklist",
        element:<AllTask></AllTask>,
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
