import { Card } from "flowbite-react";
import React from "react";
import { BsAlarm, BsCurrencyDollar } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { GrUserExpert } from "react-icons/gr";
import { MdWork } from "react-icons/md";
// import { BsAlarm, BsCurrencyDollar } from 'react-icons/bs';
// import { FcApproval, FcDisapprove } from 'react-icons/fc';
// import { GoLocation } from 'react-icons/go';
// import { GrUserExpert } from 'react-icons/gr';
// import { MdWork } from 'react-icons/md';
import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const job = useLoaderData().data;
    console.log(job);
    return (
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
                        <span className="text-lg font-bold">{job.salary}</span>
                        /month
                    </p>
                </div>
                <p className="mt-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <span className="text-lg font-semibold text-black underline">Requirements</span><br/> {job.description}
                </p>
            </div>
            <button className="btn btn-outline duration-300">Apply</button>
        </Card>
    );
};

export default JobDetails;
