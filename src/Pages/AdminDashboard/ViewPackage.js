import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

const ViewPackage = () => {
    const [packages, setPackages] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState({});
    const [title, setTitle] = useState("");
    const [postNumber, setPostNumber] = useState(0);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/package`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPackages(data.data);
                }
            });
    }, []);
    // console.log(packages);

    // handle edit button click
    const handleEdit = (id) => {
        setUpdateModal(true);
        // get particular package data
        fetch(`${process.env.REACT_APP_API_URL}/package/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setSelectedPack(data.data);
                }
            });
        // set initial data
        setTitle(selectedPack?.title);
        setPostNumber(selectedPack?.postNumber);
        setPrice(selectedPack?.price);
    };

    // handle update package data
    const handleUpdate = () => {
        setUpdateModal(false);

        // set initial data
        // setTitle(selectedPack?.title);
        // setPostNumber(selectedPack?.postNumber);
        // setPrice(selectedPack?.price);

        console.log(title, postNumber, price);
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
            {/* update package modal */}
            <React.Fragment>
                <Modal
                    show={updateModal}
                    size="md"
                    popup={true}
                    onClose={() => setUpdateModal(false)}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                                Update Package
                            </h3>
                            {/* title */}
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="title"
                                        value="Package Title"
                                    />
                                </div>
                                <TextInput
                                    type="text"
                                    id="title"
                                    name="title"
                                    onBlur={(e) => setTitle(e.target.value)}
                                    defaultValue={selectedPack?.title}
                                    required={true}
                                />
                            </div>
                            {/* post number */}
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="postNumber"
                                        value="Number of Post"
                                    />
                                </div>
                                <TextInput
                                    type="number"
                                    id="postNumber"
                                    name="postNumber"
                                    onBlur={(e) =>
                                        setPostNumber(e.target.value)
                                    }
                                    defaultValue={selectedPack?.postNumber}
                                    required={true}
                                />
                            </div>
                            {/* Price */}
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="price" value="Price" />
                                </div>
                                <TextInput
                                    type="number"
                                    id="price"
                                    name="price"
                                    onBlur={(e) => setPrice(e.target.value)}
                                    defaultValue={selectedPack?.price}
                                    required={true}
                                />
                            </div>

                            <div className="w-full">
                                <Button
                                    onClick={() => handleUpdate()}
                                    type="submit"
                                    className="w-full"
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </div>
    );
};

export default ViewPackage;
