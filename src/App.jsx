import { createBrowserRouter , Navigate, RouterProvider } from "react-router-dom";

import Register from "./pages/RegisterPage/Register.jsx";
import Login from "./pages/LoginPage/Login.jsx"
import Settings from "./pages/SettingsPage/Settings.jsx"
import TeamMembers from "./pages/TeamMembersPage/TeamMembers.jsx"
import Dashboard from "./pages/DashboardPage/Dashboard.jsx"
import Customization from "./pages/CustomizationPage/Customization.jsx"
import ContactCenter from "./pages/ContactCenterPage/ContactCenter.jsx"
import Analytics from "./pages/AnalyticsPage/Analytics.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx";
import Welcome from "./pages/WelcomePage/Welcome.jsx"
import HomePage from "./pages/HomePage/HomePage.jsx";
import { useSelector } from "react-redux";



const App = () => {

    const token = useSelector((store) => store.USER.token)

    const AppRouter = createBrowserRouter([
        {
            path: "/",
            element: <Welcome />
        } ,
    
        {
            path: "/Login",
            element: token ? <Navigate to="/dashboard" /> : <Login />
        } ,
    
        {
            path: "/Register",
            element: token ? <Navigate to="/dashboard" /> : <Register />
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
            path: "/User",
            element: <HomePage />
        } ,
    
        {
            path: "*",
            element: <NotFound />
        }
    ]) 

    return <RouterProvider router={AppRouter} />
}




export default App