import { Button, Card, Modal } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { BsAlarm, BsCurrencyDollar } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrUserExpert } from "react-icons/gr";
import { MdWork } from "react-icons/md";
// import { BsAlarm, BsCurrencyDollar } from 'react-icons/bs';
// import { FcApproval, FcDisapprove } from 'react-icons/fc';
// import { GoLocation } from 'react-icons/go';
// import { GrUserExpert } from 'react-icons/gr';
// import { MdWork } from 'react-icons/md';
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const JobDetails = () => {
    const { user } = useContext(AuthContext);
    const job = useLoaderData().data;
    setTitle(job?.title);
    const [applyModal, setApplyModal] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [role, setRole] = useState("");
    const [refresh, setRefresh] = useState(false);

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setUserInfo(data.data);
                }
            });
    }, [user]);
    console.log(userInfo);

    // get user role
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/userRole/${user?.email}`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRole(data.data);
                }
            });
    }, [user]);

    // check is already applied or not
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}/application?email=${user?.email}&jobId=${job?._id}`,
            {
                headers: {
                    email: user?.email,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setIsApplied(true);
                }
            });
    }, [refresh, user, job]);

    // handle job apply
    const handleApply = (isConfirm) => {
        setApplyModal(false);
        if (!isConfirm) {
            return;
        } else {
            const application = {
                seeker_email: user?.email,
                job_id: job?._id,
                university: userInfo?.institute,
                cgpa: userInfo?.cgpa,
                name: userInfo?.name,
            };
            fetch(`${process.env.REACT_APP_API_URL}/application`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    email: user?.email,
                },
                body: JSON.stringify(application),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        setRefresh(!refresh);
                        toast.success("Applied Successfully for this Job.");
                    }
                });
        }
    };
    return (
        <>
            <Card className="max-w-2xl mx-2 md:mx-auto">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.title}
                </h5>

                <div>
                    <p className="text-base leading-relaxe dark:text-gray-400 mb-2">
                        Category: {job.category_title}
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
                    <p className="mt-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <span className="text-lg font-semibold text-black underline">
                            Requirements
                        </span>
                        <br /> {job.description}
                    </p>
                </div>
                {isApplied ? (
                    <button className="btn btn-disabled">
                        Already Applied
                    </button>
                ) : (
                    <button
                        onClick={() => setApplyModal(true)}
                        className={`btn btn-outline duration-300 ${
                            role !== "job-seeker" && "btn-disabled"
                        }`}
                    >
                        Apply
                    </button>
                )}
            </Card>

            {/* approve modal */}
            {applyModal && (
                <React.Fragment>
                    <Modal
                        show={applyModal}
                        size="md"
                        popup={true}
                        onClose={() => setApplyModal(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <FaQuestion className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to Apply for this Job?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => handleApply(true)}
                                    >
                                        Yes, I'm sure
                                    </Button>
                                    <Button
                                        color="gray"
                                        onClick={() => handleApply(false)}
                                    >
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            )}
        </>
    );
};

export default JobDetails;
