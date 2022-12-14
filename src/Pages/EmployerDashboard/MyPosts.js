import { Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { MdWork } from "react-icons/md";
import { BsAlarm, BsCurrencyDollar } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";
import { Link } from "react-router-dom";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const MyPosts = () => {
    setTitle("My Posts");
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    // get employer posted jobs
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/jobPost/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setJobs(data.data);
                }
            });
    }, [user]);
    console.log(jobs);
    return (
        <div>
            <h3 className="text-2xl font-bold text-center">My Posts</h3>
            <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {jobs.map((job) => (
                    <Card key={job._id}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {job.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {job.category_title}
                        </p>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <GoLocation />
                                {job.location}
                            </p>
                            <p className="flex items-center gap-2">
                                <BsAlarm />
                                {job.duration}
                            </p>
                            <p className="flex items-center gap-2">
                                <MdWork />
                                {job.type}
                            </p>
                            <p className="flex items-center gap-2">
                                <GrUserExpert />
                                {job.experience}
                            </p>
                            <p className="flex items-center gap-2">
                                <BsCurrencyDollar />
                                <span className="text-lg font-bold">
                                    {job.salary}
                                </span>
                                /month
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Link className="btn w-full btn-outline">
                                Details
                            </Link>
                            <Link className="btn w-full btn-success">
                                Modify
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyPosts;
