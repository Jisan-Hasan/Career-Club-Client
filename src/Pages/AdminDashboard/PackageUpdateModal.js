import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import { toast } from "react-hot-toast";

const PackageUpdateModal = ({ updateModal, setUpdateModal, selectedPack,refresh, setRefresh }) => {
    // handle update package data
    // console.log(selectedPack);
    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdateModal(false);

        const updatedPack = {
            title: e.target.title.value,
            postNumber: e.target.postNumber.value,
            price: e.target.price.value,
        };

        fetch(`${process.env.REACT_APP_API_URL}/package/${selectedPack?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedPack),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Package Updated Successfully!");
                    setRefresh(!refresh);
                } else {
                    toast.error("Can't Update Package!");
                }
            });

    };
    return (
        <>
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
                            <form onSubmit={handleUpdate} className="space-y-6">
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
                                        defaultValue={selectedPack?.price}
                                        required={true}
                                    />
                                </div>

                                <div className="w-full">
                                    <Button type="submit" className="w-full">
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </>
    );
};

export default PackageUpdateModal;
