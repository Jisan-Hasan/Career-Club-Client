import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Main from "../layout/Main";
import AddPackage from "../Pages/AdminDashboard/AddPackage";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import ViewPackage from "../Pages/AdminDashboard/ViewPackage";
import Blogs from "../Pages/Blogs/Blogs";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <p>Error</p>,
        children: [
            {
                index: true,
                element: <p>Home</p>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/blogs",
                element: (
                    <PrivateRoute>
                        <Blogs />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/adminDashboard",
        element: (
            <PrivateRoute>
                <AdminLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
            {
                path: "/adminDashboard/addPackage",
                element: <AddPackage />,
            },
            {
                path: "/adminDashboard/viewPackage",
                element: <ViewPackage />,
            },
        ],
    },
]);

export default router;
