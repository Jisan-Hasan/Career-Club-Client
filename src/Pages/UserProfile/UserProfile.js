import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaHouseUser, FaUniversity } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { setTitle } from "../../api/title";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { GrAdd } from "react-icons/gr";

const UserProfile = () => {
    setTitle("My Profile");
    const { user } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    // get userinfo from db
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setUserProfile(data.data);
                }
            });
    }, [user]);
    return (
        <div className="mt-10 grid justify-center">
            <div className="md:flex md:space-x-5 md:items-center">
                <div>
                    <img
                        className="w-64"
                        src={userProfile?.image}
                        alt={userProfile?.name}
                    />
                </div>
                <div className="space-y-4 mt-3 md:mt-0">
                    <h2 className="text-4xl font-bold">{userProfile?.name}</h2>
                    <p className="text-xl font-semibold flex items-center gap-3">
                        <MdEmail />
                        {userProfile?.email}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <MdPhone />
                        {userProfile?.phone}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <FaHouseUser />
                        {userProfile?.address}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <FaUniversity />
                        {userProfile?.institute} - CGPA: {userProfile?.cgpa}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <AiOutlineLink />{" "}
                        <Link target="_blank" to={userProfile?.github}>
                            GitHub
                        </Link>{" "}
                        ||{" "}
                        <Link target="_blank" to={userProfile?.portfolio}>
                            Portfolio
                        </Link>{" "}
                        ||{" "}
                        <Link target="_blank" to={userProfile?.linkedin}>
                            LinkedIn
                        </Link>
                    </p>
                </div>
            </div>
            {/* Bio */}
            <Card className="mt-12">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    About {userProfile?.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {userProfile?.bio}
                </p>
            </Card>

            {/* Skills set */}
            <Card className="mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between items-center">
                    Skills <GrAdd />
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {userProfile?.bio}
                </p>
            </Card>
        </div>
    );
};

export default UserProfile;
