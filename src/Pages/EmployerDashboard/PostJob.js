import {
    Button,
    Label,
    Radio,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setPostNumber } from "../../api/pack";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const PostJob = () => {
    setTitle("Post A Job");
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [postLimit, setPostLimit] = useState(0);

    const navigate = useNavigate();

    // get available post number
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/postNumber/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.postNumber < 1) {
                    navigate("/employerDashboard/buyPackage");
                    toast.error("Please Buy a Package for Job Post");
                } else {
                    setPostLimit(Number(data.postNumber));
                }
            });
    }, [user]);

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
        const category_title = form.category.value.split("*")[0];
        const category_id = form.category.value.split("*")[1];
        const duration = form.duration.value;
        const type = form.type.value;
        const location = form.location.value;
        const salary = form.salary.value;
        const experience = form.experience.value;
        const description = form.description.value;

        // crate job object
        const job = {
            title,
            category_id,
            category_title,
            duration,
            type,
            location,
            salary,
            experience,
            description,
            employer_email: user?.email,
            isApproved: false,
        };
        // save to db
        fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(job),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    // reduce post limit
                    setPostNumber(user?.email, Number(postLimit-1));
                    // navigate to my job page
                    navigate("/employerDashboard/myPost");
                    // show toast
                    toast.success("Job Posted Successfully!");
                    
                }
            });
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
                    <Select name="category" required={true}>
                        <option value="">Select Job Category</option>
                        {categories.map((category) => (
                            <option
                                key={category._id}
                                value={category.title + "*" + category._id}
                            >
                                {category.title}
                            </option>
                        ))}
                    </Select>
                </div>
                {/* Select JOb Duration */}
                <div className="mt-4">
                    <Select name="duration" required={true}>
                        <option value="">Select Job Duration</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </Select>
                </div>
                {/* Select Work Type */}
                <div className="mt-4">
                    <Select name="type" required={true}>
                        <option value="">Select Job Type</option>
                        <option value="On Site">On Site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
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
                            name="description"
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
