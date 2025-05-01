import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Register from "./pages/RegisterPage/Register.jsx";
import Login from "./pages/LoginPage/Login.jsx"
import Settings from "./pages/SettingsPage/Settings.jsx"
import TeamMembers from "./pages/TeamMembersPage/TeamMembers.jsx"
import Dashboard from "./pages/DashboardPage/Dashboard.jsx"
import Customization from "./pages/CustomizationPage/Customization.jsx"
import ContactCenter from "./pages/ContactCenterPage/ContactCenter.jsx"
import Analytics from "./pages/AnalyticsPage/Analytics.jsx"
import HomePage from "./pages/HomePage/HomePage.jsx";
import { useDispatch, useSelector } from "react-redux";

import NotFound from "./pages/NotFound/NotFound.jsx"

import { jwtDecode } from "jwt-decode";
import { addPayload } from "./Redux/slices/userSlice.js";



const AppRouter = (token , isMember , isAdmin) => createBrowserRouter([
    {
        path: "/",
        element: token ? <Navigate to="/Dashboard" /> : <HomePage />
    },

    {
        path: "/Login",
        element: token ? <Navigate to="/Dashboard" /> : <Login />
    },

    {
        path: "/Register",
        element: token ? <Navigate to="/Dashboard" /> : <Register />
    },

    {
        path: "/Settings",
        element: token ? <Settings /> : <Navigate to="/Login" />
    },

    {
        path: "/TeamMembers",
        element: token
            ? (isMember && !isAdmin
                ? <NotFound /> 
                : <TeamMembers />)
            : <Navigate to="/Login" />,
    },

    {
        path: "/Dashboard",
        element: token ? <Dashboard /> : <Navigate to="/Login" />
    },

    {
        path: "/Customization",
        element: token ? <Customization /> : <Navigate to="/Login" />
    },

    {
        path: "/ContactCenter",
        element: token ? <ContactCenter /> : <Navigate to="/Login" />
    },

    {
        path: "/Analytics",
        element: token ? <Analytics /> : <Navigate to="/Login" />
    },

    {
        path: "*",
        element: <NotFound />
    }
])




const App = () => {
    const token = useSelector((store) => store.USER.token);
    const dispatch = useDispatch()

    let isMember = false;
    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            isMember = decoded.isMember;
            isAdmin = decoded.role === "ADMIN";

            dispatch(addPayload({
                data: decoded
            }))
        } catch (err) {
            console.error("Invalid token");
        }
    }

    console.log("isMember" , isMember)
    console.log("isAdmin" , isAdmin)

    return <RouterProvider router={AppRouter(token , isMember , isAdmin)} />
};




export default App