import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaHamburger, FaPersonBooth, FaSignOutAlt } from "react-icons/fa";
import { BsFillPersonPlusFill, BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { MdOutlineForwardToInbox } from "react-icons/md";

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
                                <span className="block text-sm text-center">
                                    {user?.displayName}
                                </span>
                                <span className="block truncate text-sm font-medium text-center">
                                    {user?.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item className="flex gap-2">
                                <BsPersonCircle /> My Profile
                            </Dropdown.Item>
                            <Dropdown.Item className="flex gap-2">
                                <BsFillPersonPlusFill /> Update Profile
                            </Dropdown.Item>
                            <Dropdown.Item className="flex gap-2">
                                <MdOutlineForwardToInbox /> My Inbox
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                className="flex gap-2"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    )}
                    {!user && (
                        // <Button
                        //     onClick={handleLogout}
                        //     color="failure"
                        //     pill={true}
                        // >
                        //     Sign Out
                        // </Button>
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
                    <Link to={`${path}`} className="hover:text-blue-600">
                        Dashboard
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;
