import { createBrowserRouter , Navigate } from "react-router-dom";

import Register from "./pages/RegisterPage/Register.jsx";
import Login from "./pages/LoginPage/Login.jsx"
import Settings from "./pages/SettingsPage/Settings.jsx"
import TeamMembers from "./pages/TeamMembersPage/TeamMembers.jsx"
import Dashboard from "./pages/DashboardPage/Dashboard.jsx"
import Customization from "./pages/CustomizationPage/Customization.jsx"
import ContactCenter from "./pages/ContactCenterPage/ContactCenter.jsx"
import Analytics from "./pages/AnalyticsPage/Analytics.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx";


const AppRouter = createBrowserRouter([
    {
        path: "/Login",
        element: <Login />
    } ,

    {
        path: "/Register",
        element: <Register />
    } ,

    {
        path: "/Settings",
        element: <Settings />
    } ,

    {
        path: "/TeamMembers",
        element: <TeamMembers />
    } ,

    {
        path: "/Dashboard",
        element: <Dashboard />
    } ,

    {
        path: "/Customization",
        element: <Customization />
    } ,

    {
        path: "/ContactCenter",
        element: <ContactCenter />
    } ,

    {
        path: "/Analytics",
        element: <Analytics />
    } , 

    {
        path: "*",
        element: <NotFound />
    }
]) 


export default AppRouter