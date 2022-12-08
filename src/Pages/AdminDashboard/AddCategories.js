import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCategories = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const category = { title: e.target.title.value };

        fetch(`${process.env.REACT_APP_API_URL}/category`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(category),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Category Added Successfully");
                    navigate("/adminDashboard/viewCategory");
                }
            });
    };
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">
                Add Category
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Title */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Category Title" />
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Graphics Design"
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

export default AddCategories;
