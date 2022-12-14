import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";

const AdminLayout = () => {
    return (
        <div className="container mx-auto">
            <Header />
            <div className="drawer drawer-mobile">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet/>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li>
                            <Link to='/adminDashboard'>Dashboard</Link>
                        </li>
                        <li></li>
                        <li>
                            <Link to='/adminDashboard/addPackage'>Add Package</Link>
                        </li>
                        <li>
                            <Link to='/adminDashboard/viewPackage'>View Package</Link>
                        </li>
                        <li></li>
                        <li>
                            <Link to='/adminDashboard/addCategory'>Add Categories</Link>
                        </li>
                        <li>
                            <Link to='/adminDashboard/viewCategory'>View Categories</Link>
                        </li>
                        <li></li>
                        <li><Link to='/adminDashboard/jobs'>All Jobs</Link></li>
                        <li></li>
                        <li><Link to='/adminDashboard/payments'>All Payments</Link></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
