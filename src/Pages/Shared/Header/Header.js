import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle, BsPersonPlusFill } from "react-icons/bs";
import { FaHamburger, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [role, setRole] = useState("");

    // get user role
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/userRole/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRole(data.data);
                }
            });
    }, [user]);

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
    }, [user]);

    return (
        <>
            <Navbar
                className="mb-4 shadow-sm sticky top-0 z-50"
                fluid={true}
                rounded={true}
            >
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
                    {user?.uid && (
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={
                                <Avatar
                                    img={user?.photoURL}
                                    rounded={true}
                                    bordered={true}
                                    color="success"
                                    title={user?.displayName}
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-xl font-semibold text-center">
                                    {user?.displayName}
                                </span>
                                <span className="block truncate text-sm font-medium text-center">
                                    {user?.email}
                                </span>
                            </Dropdown.Header>
                            {role === "job-seeker" && (
                                <div className="space-y-2">
                                    <Link
                                        to="/profile"
                                        className="flex gap-2 pl-4 items-center"
                                    >
                                        <BsPersonCircle /> My Profile
                                    </Link>
                                    <Link
                                        to="/updateProfile"
                                        className="flex gap-2 pl-4 items-center"
                                    >
                                        <BsPersonPlusFill /> Update Profile
                                    </Link>
                                    <Link className="flex gap-2 pl-4 items-center">
                                        <MdOutlineForwardToInbox /> My Inbox
                                    </Link>
                                    <Dropdown.Divider />
                                </div>
                            )}

                            <Dropdown.Item
                                className="flex gap-2 text-red-600"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    )}
                    {!user && (
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
                    <Link className="hover:text-blue-600" to="/jobs">
                        Jobs
                    </Link>
                    <Link to="/blogs" className="hover:text-blue-600">
                        Blogs
                    </Link>
                    {role !== "job-seeker" && (
                        <Link to={`${path}`} className="hover:text-blue-600">
                            Dashboard
                        </Link>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
