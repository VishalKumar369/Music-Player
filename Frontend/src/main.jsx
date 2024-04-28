import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AdminRegistration from "./pages/Admin/AdminRegistration.jsx";
import AdminDashboard from "./pages/Dashboard.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AddMusic from "./components/AddMusic.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
	},
	{
		path: "/login",
		element: <Login/>,
	},
	{
		path: "/home",
		element: <Home/>,
	},
	{
		path: "admin/register",
		element: <AdminRegistration/>,
	},{
	path: "/admin/addMusic",
	element: <AddMusic/>,
	},
	{
		path:'/admin/login',
		element:<AdminLogin/>
	}
	,{
		path:'/admin/dashboard',
		element:<AdminDashboard/>
	}

]);


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);