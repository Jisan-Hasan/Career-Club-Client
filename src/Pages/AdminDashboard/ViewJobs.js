import { Button, Card, Modal, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsAlarm, BsCurrencyDollar } from "react-icons/bs";
import { FaExclamationTriangle, FaQuestion } from "react-icons/fa";
import { FcApproval, FcDisapprove } from "react-icons/fc";
import { GoLocation } from "react-icons/go";
import { GrUserExpert } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewJobs = () => {
    const [type, setType] = useState("all");
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/jobs/${type}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setJobs(data.data);
                }
            });
    }, [type, refresh]);
    // console.log(jobs);

    // handle approve
    const handleApprove = (job) => {
        setSelectedJob(job);
        setApproveModal(true);
    };
    // handle confirm approve
    const handleConfirmApprove = (isConfirm) => {
        setApproveModal(false);
        if (isConfirm) {
            fetch(
                `${process.env.REACT_APP_API_URL}/jobStatus/${selectedJob._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ status: true }),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        toast.success("Job Approved!");
                        setRefresh(!refresh);
                    }
                });
        }
    };

    // handle delete
    const handleDelete = (job) => {
        setSelectedJob(job);
        setDeleteModal(true);
    };
    // handle confirm delete
    const handleConfirmDelete = (isConfirm) => {
        setDeleteModal(false);
        if (isConfirm) {
            fetch(`${process.env.REACT_APP_API_URL}/job/${selectedJob._id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        setRefresh(!refresh);
                        toast.success("Job Deleted Successfully!");
                    }
                });
        }
    };
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">All Jobs</h2>
            {/* filter */}
            <div
                className="absolute right-7 lg:right-36 xl:right-44 mt-[-35px] flex items-center gap-2"
                id="select"
            >
                {/* <div>
                    <Label htmlFor="" value="Filter Jobs" />
                </div> */}
                <Select name="type" onChange={(e) => setType(e.target.value)}>
                    <option value="all">All Jobs</option>
                    <option value="approved">Approved</option>
                    <option value="disapproved">Disapproved</option>
                </Select>
            </div>

            {/* all jobs */}
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
                            <button
                                onClick={() => handleApprove(job)}
                                disabled={job.isApproved}
                                className="btn w-full btn-primary"
                            >
                                Approve
                            </button>
                            <Link className="btn w-full btn-outline">
                                Details
                            </Link>

                            <button
                                onClick={() => handleDelete(job)}
                                className="btn w-full btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
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
                                    Are you sure you want to delete this Job?
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

            {/* delete modal */}
            {approveModal && (
                <React.Fragment>
                    <Modal
                        show={approveModal}
                        size="md"
                        popup={true}
                        onClose={() => setApproveModal(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <FaQuestion className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to approve this Job?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() =>
                                            handleConfirmApprove(true)
                                        }
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() =>
                                            handleConfirmApprove(false)
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

export default ViewJobs;
