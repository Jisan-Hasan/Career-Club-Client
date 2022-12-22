import { Card } from 'flowbite-react';
import React from 'react';
import { BsAlarm, BsCurrencyDollar } from 'react-icons/bs';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import { GoLocation } from 'react-icons/go';
import { GrUserExpert } from 'react-icons/gr';
import { MdWork } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const JobCard = ({job}) => {
    const navigate = useNavigate();
    return (
        <Card onClick={()=>navigate(`/jobs/${job?._id}`)} key={job._id} className='cursor-pointer'>
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
                        <p className="font-semibold text-md text-gray-700 dark:text-gray-400">
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
                        {/* <div className="grid gap-2">
                            
                            <button
                                className="btn w-full text-md font-bold btn-outline duration-500 tracking-wider"
                            >
                                Details
                            </button>

                            
                        </div> */}
                    </Card>
    );
};

export default JobCard;