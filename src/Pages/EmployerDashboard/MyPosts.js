import { Card } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsAlarm, BsCurrencyDollar } from "react-icons/bs";
import { FcApproval, FcDisapprove } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { GrUserExpert } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import { Link } from "react-router-dom";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";
import { FaUser } from "react-icons/fa";

const MyPosts = () => {
    setTitle("My Posts");
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [refresh, setRefresh] = useState(false);
    // get employer posted jobs
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/jobPost/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setJobs(data.data);
                }
            });
    }, [user, refresh]);
    // console.log(jobs);

    // handle delete
    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/job/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRefresh(!refresh);
                    toast.success("Job Deleted Successfully!");
                }
            });
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-center">My Posts</h3>
            <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {jobs.map((job) => (
                    <Card key={job._id}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-between">
                            <span>{job.title}</span>
                            <span>
                                {job.isApproved ? (
                                    <FcApproval />
                                ) : (
                                    <FcDisapprove />
                                )}
                            </span>
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
                        <div className="grid grid-cols-3 gap-2">
                            <Link
                                to={`/employerDashboard/application/${job?._id}`}
                                className={`btn w-full btn-primary ${job?.isApproved ? '' : 'btn-disabled'}`}
                            >
                                Application
                            </Link>
                            <Link
                                to={`/employerDashboard/modifyPost/${job._id}`}
                                className="btn w-full btn-outline"
                            >
                                Modify
                            </Link>
                            <button
                                onClick={() => handleDelete(job._id)}
                                className="btn w-full btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyPosts;
