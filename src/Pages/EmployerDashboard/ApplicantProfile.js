import { Card } from 'flowbite-react';
import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { FaHouseUser, FaUniversity } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';

const ApplicantProfile = () => {
    const profile = useLoaderData().data;
    return (
        <div className="mt-10 grid justify-center">
            <div className="md:flex md:space-x-5 md:items-center">
                <div>
                    <img
                        className="w-64"
                        src={profile?.image}
                        alt={profile?.name}
                    />
                </div>
                <div className="space-y-4 mt-3 md:mt-0">
                    <h2 className="text-4xl font-bold">{profile?.name}</h2>
                    <p className="text-xl font-semibold flex items-center gap-3">
                        <MdEmail />
                        {profile?.email}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <MdPhone />
                        {profile?.phone}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <FaHouseUser />
                        {profile?.address}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <FaUniversity />
                        {profile?.institute} - CGPA: {profile?.cgpa}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <AiOutlineLink />{" "}
                        <Link target="_blank" to={profile?.github}>
                            GitHub
                        </Link>{" "}
                        ||{" "}
                        <Link target="_blank" to={profile?.portfolio}>
                            Portfolio
                        </Link>{" "}
                        ||{" "}
                        <Link target="_blank" to={profile?.linkedin}>
                            LinkedIn
                        </Link>
                    </p>
                </div>
            </div>
            {/* Bio */}
            <Card className="mt-12">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    About {profile?.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {profile?.bio}
                </p>
            </Card>

            {/* Skills set */}
            <Card className="mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between items-center">
                    Skills
                </h5>
                <div className="mt-2 space-x-2">
                    {!profile?.skills
                        ? "No Skills Found"
                        : profile?.skills.map((skill,i) => (
                              <span key={i} className="font-normal text-gray-700 dark:text-gray-400 bg-red-400 px-4 py-2 rounded-2xl">
                                  {skill}
                              </span>
                          ))}
                </div>
            </Card>

            
        </div>
    );
};

export default ApplicantProfile;