import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ViewCategories = () => {
    const [categories, setCategories] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/category`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setCategories(data.data);
                }
            });
    }, [refresh]);

    // handle edit category
    const handleEdit = (id) => {
        // get category for edit
        fetch(`${process.env.REACT_APP_API_URL}/category/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setSelectedCategory(data.data);
                    setUpdateModal(true);
                }
            });
    };

    // handle update category
    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdateModal(false);
        const updatedCategory = {title: e.target.title.value};
        
        fetch(`${process.env.REACT_APP_API_URL}/category/${selectedCategory._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedCategory)
        }).then(res => res.json()).then(data => {
            if(data.status){
                setRefresh(!refresh);
                toast.success('Category Updated Successfully!');
            }
        }).catch(err => {
            toast.error("Can't Update! Try Again.");
        })
    };

    // handle delete category

    return (
        <div>
            <h3 className="text-center text-3xl font-bold">All Categories</h3>
            <div className="mt-10">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        <Table.HeadCell>Serial</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {categories.map((category, i) => (
                            <Table.Row
                                key={category._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {category.title}
                                </Table.Cell>

                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white space-x-3">
                                    <button
                                        onClick={() => handleEdit(category._id)}
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

            {/* update modal */}
            {updateModal && (
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
                                <form
                                    onSubmit={handleUpdate}
                                    className="space-y-6"
                                >
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
                                            defaultValue={
                                                selectedCategory?.title
                                            }
                                            required={true}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            )}
        </div>
    );
};

export default ViewCategories;
