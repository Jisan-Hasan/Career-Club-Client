import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { setTitle } from "../../api/title";

const AllPayment = () => {
    setTitle("All Payments");
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/payments`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPayments(data.data);
                }
            });
    }, []);
    // console.log(payments);
    return (
        <div>
            <h3 className="text-center text-3xl font-bold">All Payments!</h3>
            <div className="mt-10">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        <Table.HeadCell>Serial</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Transaction ID</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
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
                                    {payment.email}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {payment.transactionId}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {payment.price}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AllPayment;
