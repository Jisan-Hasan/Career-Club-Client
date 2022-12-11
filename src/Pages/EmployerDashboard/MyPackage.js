import { Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const MyPackage = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [availablePost, setAvailablePost] = useState(0);

    // get all payment for the logged in user
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/payments/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPayments(data.data);
                }
            });
    }, [user]);
    
    const totalCost = payments.reduce((accumulator, object) => {
        return accumulator + Number(object.price);
    }, 0);
    console.log(totalCost);

    // get available post number
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/postNumber/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setAvailablePost(Number(data.postNumber));
            });
    }, [user]);
    return (
        <div>
            <h2 className="text-3xl font-bold text-center">My Package</h2>

            <div className="max-w-sm mx-auto mt-8">
                <Card>
                    <div className="flex justify-end px-4 pt-4"></div>
                    <div className="flex flex-col items-center pb-10">
                        <img
                            className="mb-3 h-24 w-24 rounded-full shadow-lg"
                            src={user?.photoURL}
                            alt={user?.displayName}
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {user?.displayName}
                        </h5>
                        <span className="text-md font-bold text-primary dark:text-gray-400">
                            {availablePost} Post Available
                        </span>
                        <span className="mt-2 text-md font-bold text-error dark:text-gray-400">
                            Total Cost: ${totalCost}
                        </span>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <Link
                                to="/employerDashboard/buyPackage"
                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Buy More Package
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MyPackage;
