import { Card, Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Mypaymentage = () => {
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
    
    // calculate total costs
    const totalCost = payments.reduce((accumulator, object) => {
        return accumulator + Number(object.price);
    }, 0);

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
            <h2 className="text-3xl font-bold text-center">Package Summary</h2>

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
                                to="/employerDashboard/buypaymentage"
                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Buy More paymentage
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>

            {/* show all transaction history */}
            <h2 className="mt-10 text-2xl font-bold text-center">Payment History</h2>
            <div className="mt-4">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        <Table.HeadCell>Serial</Table.HeadCell>
                        <Table.HeadCell>Transaction Id</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {payments.map((payment, i) => (
                            <Table.Row
                                key={payment._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {payment.transactionId}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {payment.price}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {payment.email}
                                </Table.Cell>
                                
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default Mypaymentage;
