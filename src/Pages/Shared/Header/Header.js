import { Avatar, Button, Navbar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaHamburger } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch((err) => {
                toast.error(`err.message`);
            });
    };

    const [path, setPath] = useState("/userDashboard");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/userRole/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    if (data.data === "admin") {
                        setPath("/adminDashboard");
                    } else if (data.data === "employer") {
                        setPath("/employerDashboard");
                    } else if (data.data === "job-seeker") {
                        setPath("/userDashboard");
                    }
                }
            });
        // if(user?.)
    }, [user]);

    return (
        <>
            <Navbar className="my-4 shadow-sm" fluid={true} rounded={true}>
                <label
                    htmlFor="my-drawer-2"
                    className="drawer-button lg:hidden"
                >
                    <FaHamburger />
                </label>
                <Link to="/">
                    <span className="self-center text-emerald-600 whitespace-nowrap text-4xl font-bold dark:text-white">
                        CareerClub
                    </span>
                </Link>
                <div className="flex gap-2 md:order-2">
                    {
                        user?.uid && <Avatar
                        img={user.photoURL}
                        rounded={true}
                        bordered={true}
                        color="success"
                      />
                    }
                    {user ? (
                        <Button
                            onClick={handleLogout}
                            color="failure"
                            pill={true}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Button color="success" pill={true}>
                                Login
                            </Button>
                        </Link>
                    )}
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link to="/" className="hover:text-blue-600">
                        Home
                    </Link>
                    <Link className="hover:text-blue-600" to="/services">
                        Services
                    </Link>
                    <Link to="/blogs" className="hover:text-blue-600">
                        Blogs
                    </Link>
                    <Link
                        to={`${path}`}
                        className="hover:text-blue-600"
                    >
                        Dashboard
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
