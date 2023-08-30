import { Button, Modal, Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";
import PackageUpdateModal from "./PackageUpdateModal";

const ViewPackage = () => {
    const { user } = useContext(AuthContext);
    const [packages, setPackages] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState({});
    const [refresh, setRefresh] = useState(false);

    // set Title
    setTitle("Packages");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/package`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPackages(data.data);
                }
            });
    }, [refresh]);

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

    // handle delete button click
    const handleDelete = (id) => {
        // get particular package data
        fetch(`${process.env.REACT_APP_API_URL}/package/${id}`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setSelectedPack(data.data);
                    setDeleteModal(true);
                }
            });
    };

    // handle confirm delete
    const handleConfirmDelete = (isConfirm) => {
        setDeleteModal(false);
        if (isConfirm) {
            fetch(
                `${process.env.REACT_APP_API_URL}/package/${selectedPack._id}`,
                {
                    method: "DELETE",
                    headers: {
                        email: user?.email,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        toast.success("Package Deleted Successfully!");
                        setRefresh(!refresh);
                    }
                });
        }
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
                                    <button
                                        onClick={() => handleDelete(pack._id)}
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
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

            {/* delete modal */}
            {deleteModal && (
                <React.Fragment>
                    <Modal
                        show={true}
                        size="md"
                        popup={true}
                        onClose={() => setDeleteModal(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <FaExclamationTriangle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this
                                    Package?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() =>
                                            handleConfirmDelete(true)
                                        }
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() =>
                                            handleConfirmDelete(false)
                                        }
                                    >
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            )}
        </div>
    );
};

export default ViewPackage;
