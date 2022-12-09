import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import PackageUpdateModal from "./PackageUpdateModal";

const ViewPackage = () => {
    const [packages, setPackages] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/package`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPackages(data.data);
                }
            });
    }, [refresh]);
    // console.log(packages);

    // handle edit button click
    const handleEdit = (id) => {
        // get particular package data
        fetch(`${process.env.REACT_APP_API_URL}/package/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setSelectedPack(data.data);
                    setUpdateModal(true);
                }
            });
    };

    return (
        <div>
            <h3 className="text-center text-3xl font-bold">All Packages</h3>
            <div className="mt-10">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        <Table.HeadCell>Serial</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Post Number</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {packages.map((pack, i) => (
                            <Table.Row
                                key={pack._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {pack.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {pack.postNumber}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {pack.price}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white space-x-3">
                                    <button
                                        onClick={() => handleEdit(pack._id)}
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Edit
                                    </button>
                                    <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            {updateModal && (
                <PackageUpdateModal
                    selectedPack={selectedPack}
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </div>
    );
};

export default ViewPackage;
