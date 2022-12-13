import {
    Button,
    Label,
    Radio,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { setTitle } from "../../api/title";

const PostJob = () => {
    setTitle("Post A Job");
    const [categories, setCategories] = useState([]);

    // get all categories
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/category`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setCategories(data.data);
                }
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // get form data
        const title = form.title.value;
    };
    return (
        <div className="max-w-2xl mx-auto mt-10  md:mt-14 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Post A Job</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Job Title */}
                <div className="mt-4">
                    <TextInput
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        required={true}
                    />
                </div>
                {/* Select Category */}
                <div className="mt-4">
                    <Select required={true}>
                        <option value="">Select Job Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </Select>
                </div>
                {/* Select JOb Duration */}
                <div className="mt-4">
                    <Select required={true}>
                        <option value="">Select Job Duration</option>
                        <option value="part-time">Part Time</option>
                        <option value="full-time">Full Time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                    </Select>
                </div>
                {/* Select Work Type */}
                <div className="mt-4">
                    <Select required={true}>
                        <option value="">Select Job Type</option>
                        <option value="on-site">On Site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </Select>
                </div>

                {/* Location */}
                <div className="mt-4">
                    <TextInput
                        type="text"
                        name="location"
                        placeholder="Location"
                        required={true}
                    />
                </div>
                {/* Salary */}
                <div className="mt-4">
                    <TextInput
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        required={true}
                    />
                </div>

                {/* experience */}
                <fieldset className="mt-4" id="radio">
                    <div>
                        <legend>Select Experince Level:</legend>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="flex items-center gap-x-2">
                            <Radio
                                id=""
                                name="experience"
                                value="Fresher"
                                defaultChecked={true}
                            />
                            <Label htmlFor="">Fresher</Label>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Radio id="" name="experience" value="1-3 years" />
                            <Label htmlFor="">1-3 years</Label>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Radio id="" name="experience" value="3-5 years" />
                            <Label htmlFor="">3-5 years</Label>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Radio id="" name="experience" value="5+ years" />
                            <Label htmlFor="">5+ years</Label>
                        </div>
                    </div>
                </fieldset>

                {/* Requirements */}
                <div className="mt-4">
                    <div id="textarea">
                        <Textarea
                            id="comment"
                            placeholder="Job Description..."
                            required={true}
                            rows={4}
                        />
                    </div>
                </div>

                <Button className="mt-6" type="submit">
                    Post Job
                </Button>
            </form>
        </div>
    );
};

export default PostJob;
