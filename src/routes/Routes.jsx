import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import MyBookings from "../pages/MyBookings";
import PrivetRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/rooms",
                element: <Rooms></Rooms>
            },
            {
                path: "/room/:id",
                element: <RoomDetails></RoomDetails>
            },
            {
                path: "/myBookings",
                element: <PrivetRoute><MyBookings></MyBookings></PrivetRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/aboutUs",
                element: <AboutUs></AboutUs>
            }
        ]
    }
])

export default router;