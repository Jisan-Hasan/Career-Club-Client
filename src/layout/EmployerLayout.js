import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header/Header';

const EmployerLayout = () => {
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
                            <Link to='/employerDashboard/myPackage'>My Package</Link>
                        </li>
                        <li>
                            <Link to='/employerDashboard/buyPackage'>Buy Package</Link>
                        </li>
                        
                        <li></li>
                        <li>
                            <Link to='/employerDashboard/postJob'>Post A Job</Link>
                        </li>
                        <li>
                            <Link to='/employerDashboard/myPost'>My Post</Link>
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EmployerLayout;