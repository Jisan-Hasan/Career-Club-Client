import { createBrowserRouter } from "react-router-dom";
import AddCategories from "../Pages/AdminDashboard/AddCategories";
import AddPackage from "../Pages/AdminDashboard/AddPackage";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AllPayment from "../Pages/AdminDashboard/AllPayment";
import AllUsers from "../Pages/AdminDashboard/AllUsers";
import UserActivity from "../Pages/AdminDashboard/UserActivity";
import ViewCategories from "../Pages/AdminDashboard/ViewCategories";
import ViewJobs from "../Pages/AdminDashboard/ViewJobs";
import ViewPackage from "../Pages/AdminDashboard/ViewPackage";
import Blogs from "../Pages/Blogs/Blogs";
import ApplicantProfile from "../Pages/EmployerDashboard/ApplicantProfile";
import BuyPackage from "../Pages/EmployerDashboard/BuyPackage";
import JobApplication from "../Pages/EmployerDashboard/JobApplication";
import ModifyPost from "../Pages/EmployerDashboard/ModifyPost";
import MyPackage from "../Pages/EmployerDashboard/MyPackage";
import MyPosts from "../Pages/EmployerDashboard/MyPosts";
import Payment from "../Pages/EmployerDashboard/Payment";
import PostJob from "../Pages/EmployerDashboard/PostJob";
import Home from "../Pages/Home/Home";
import JobDetails from "../Pages/JobDetails/JobDetails";
import Jobs from "../Pages/Jobs/Jobs";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import UserBlocked from "../Pages/Shared/UserBlocked";
import UpdateProfile from "../Pages/UserProfile/UpdateProfile";
import UserProfile from "../Pages/UserProfile/UserProfile";
import AdminLayout from "../layout/AdminLayout";
import EmployerLayout from "../layout/EmployerLayout";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <p>Error</p>,
        children: [
            {
                index: true,
                element: <Home />,
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
                element: <Blogs />,
            },
            {
                path: "/jobs",
                element: <Jobs />,
            },
            {
                path: "/jobs/:id",
                element: <JobDetails />,
                loader: ({ params }) =>
                    fetch(`${process.env.REACT_APP_API_URL}/job/${params.id}`),
            },
            {
                path: "/profile",
                element: <UserProfile />,
            },
            {
                path: "/updateProfile",
                element: <UpdateProfile />,
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
            {
                path: "/adminDashboard/logs",
                element: <UserActivity />,
            },
            {
                path: "/adminDashboard/users",
                element: <AllUsers />,
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
                element: <MyPackage />,
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
            {
                path: "/employerDashboard/application/:id",
                element: <JobApplication />,
            },
            {
                path: "/employerDashboard/applicantProfile/:email",
                element: <ApplicantProfile />,
                loader: ({ params }) =>
                    fetch(
                        `${process.env.REACT_APP_API_URL}/user/${params.email}`
                    ),
            },
        ],
    },
    {
        path: "/blocked",
        element: <UserBlocked />,
    },
]);

export default router;
