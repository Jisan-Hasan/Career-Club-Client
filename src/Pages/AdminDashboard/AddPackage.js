import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const AddPackage = () => {
    // set title
    setTitle("Add Package");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        // get form data
        const title = form.title.value;
        const postNumber = form.postNumber.value;
        const price = form.price.value;

        const pack = { title, postNumber, price };

        // save package in db
        fetch(`${process.env.REACT_APP_API_URL}/package`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                email: user?.email,
            },
            body: JSON.stringify(pack),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Package added Successfully!");
                    navigate("/adminDashboard/viewPackage");
                }
            });
    };
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Add Package</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Title */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Package Title" />
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Basic Plan"
                        required={true}
                    />
                </div>
                {/* Post number */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="postNumber" value="Number of Post" />
                    </div>
                    <TextInput
                        id="postNumber"
                        type="number"
                        name="postNumber"
                        placeholder="5"
                        required={true}
                    />
                </div>
                {/* Price */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price" />
                    </div>
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        placeholder="100"
                        required={true}
                    />
                </div>

                <Button className="mt-6" type="submit">
                    Add
                </Button>
            </form>
        </div>
    );
};

export default AddPackage;
