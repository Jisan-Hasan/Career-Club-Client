import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import EmployerLayout from "../layout/EmployerLayout";
import Main from "../layout/Main";
import AddCategories from "../Pages/AdminDashboard/AddCategories";
import AddPackage from "../Pages/AdminDashboard/AddPackage";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AllPayment from "../Pages/AdminDashboard/AllPayment";
import ViewCategories from "../Pages/AdminDashboard/ViewCategories";
import ViewJobs from "../Pages/AdminDashboard/ViewJobs";
import ViewPackage from "../Pages/AdminDashboard/ViewPackage";
import Blogs from "../Pages/Blogs/Blogs";
import BuyPackage from "../Pages/EmployerDashboard/BuyPackage";
import EmployerDashboard from "../Pages/EmployerDashboard/EmployerDashboard";
import ModifyPost from "../Pages/EmployerDashboard/ModifyPost";
import MyPackage from "../Pages/EmployerDashboard/MyPackage";
import MyPosts from "../Pages/EmployerDashboard/MyPosts";
import Payment from "../Pages/EmployerDashboard/Payment";
import PostJob from "../Pages/EmployerDashboard/PostJob";
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
            {
                path: "/adminDashboard/jobs",
                element: <ViewJobs />,
            },
            {
                path: "/adminDashboard/payments",
                element: <AllPayment />,
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
            {
                path: "/employerDashboard/postJob",
                element: <PostJob />,
            },
            {
                path: "/employerDashboard/myPost",
                element: <MyPosts />,
            },
            {
                path: "/employerDashboard/modifyPost/:id",
                element: <ModifyPost />,
                loader: ({ params }) =>
                    fetch(`${process.env.REACT_APP_API_URL}/job/${params.id}`),
            },
        ],
    },
    {
        path: "/userDashboard",
        element: (
            <PrivateRoute>
                <p>User Dashboard</p>
            </PrivateRoute>
        ),
    },
]);

export default router;
