import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
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
]);

export default router;
