import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

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


import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";


const AppRouter = (token) => createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },

    {
        path: "/Login",
        element: token ? <Navigate to="/dashboard" /> : <Login />
    },

    {
        path: "/Register",
        element: token ? <Navigate to="/dashboard" /> : <Register />
    },

    {
        path: "/Settings",
        element: <Settings />
    },

    {
        path: "/TeamMembers",
        element: <TeamMembers />
    },

    {
        path: "/Dashboard",
        element: <Dashboard />
    },

    {
        path: "/Customization",
        element: <Customization />
    },

    {
        path: "/ContactCenter",
        element: <ContactCenter />
    },

    {
        path: "/Analytics",
        element: <Analytics />
    },

    {
        path: "/User",
        element: <HomePage />
    },

    {
        path: "*",
        element: <NotFound />
    }
])


const MemberRouter = (token) => createBrowserRouter([
    {
        path: "/",
        element: <Welcome />
    },

    {
        path: "/Login",
        element: token ? <Navigate to="/dashboard" /> : <Login />
    },

    {
        path: "/Register",
        element: token ? <Navigate to="/dashboard" /> : <Register />
    },

    {
        path: "/Settings",
        element: <Settings />
    },

    {
        path: "/Dashboard",
        element: <Dashboard />
    },

    {
        path: "/Customization",
        element: <Customization />
    },

    {
        path: "/ContactCenter",
        element: <ContactCenter />
    },

    {
        path: "/Analytics",
        element: <Analytics />
    },

    {
        path: "*",
        element: <NotFound />
    }
])


const PublicRouter = () => createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },

    {
        path: "/Login",
        element: <Login />
    },

    {
        path: "/Register",
        element: <Register />
    },

    {
        path: "*",
        element: <NotFound />
    }
])



const App = () => {

    const token = useSelector((store) => store.USER.token)
    // console.log("token", token)

    const navRouter = useMemo(() => {
        let payload = null;
        try {
            payload = token ? jwtDecode(token) : null;
            console.log("payloadData", payload);
        } catch (e) {
            console.error("Invalid token");
        }

        if (payload?.role === "ADMIN" && !payload.isMember) {
            console.log("Default Admin");
            return AppRouter(token);
        } else if (payload?.role === "ADMIN" && payload.isMember) {
            console.log("Member Admin");
            return AppRouter(token);
        } else if (payload?.role === "MEMBER" && payload.isMember) {
            console.log("Normal Member");
            return MemberRouter(token);
        } else {
            console.log("Normal Users -> Raising Queries");
            return PublicRouter();
        }
    }, [token]);

    return (
        <RouterProvider router={navRouter} />
    )
}




export default App