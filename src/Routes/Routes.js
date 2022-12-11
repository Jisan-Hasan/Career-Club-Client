import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import EmployerLayout from "../layout/EmployerLayout";
import Main from "../layout/Main";
import AddCategories from "../Pages/AdminDashboard/AddCategories";
import AddPackage from "../Pages/AdminDashboard/AddPackage";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import ViewCategories from "../Pages/AdminDashboard/ViewCategories";
import ViewPackage from "../Pages/AdminDashboard/ViewPackage";
import Blogs from "../Pages/Blogs/Blogs";
import BuyPackage from "../Pages/EmployerDashboard/BuyPackage";
import EmployerDashboard from "../Pages/EmployerDashboard/EmployerDashboard";
import MyPackage from "../Pages/EmployerDashboard/MyPackage";
import Payment from "../Pages/EmployerDashboard/Payment";
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
            {
                path: "/adminDashboard/addCategory",
                element: <AddCategories />,
            },
            {
                path: "/adminDashboard/viewCategory",
                element: <ViewCategories />,
            },
        ],
    },
    {
        path: "/employerDashboard",
        element: (
            <PrivateRoute>
                <EmployerLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <EmployerDashboard />,
            },
            {
                path: "/employerDashboard/buyPackage",
                element: <BuyPackage />,
            },
            {
                path: "/employerDashboard/myPackage",
                element: <MyPackage />,
            },
            {
                path: "/employerDashboard/payment/:id",
                element: <Payment />,
                loader: ({ params }) =>
                    fetch(
                        `${process.env.REACT_APP_API_URL}/package/${params.id}`
                    ),
            },
        ],
    },
]);

export default router;
