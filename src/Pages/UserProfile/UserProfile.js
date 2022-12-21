import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="mt-10 grid justify-center">
            <div className="md:flex md:space-x-5 md:items-center">
                <div>
                    <img
                        className="w-64"
                        src={user?.photoURL}
                        alt={user?.displayName}
                    />
                </div>
                <div className="space-y-4 mt-3 md:mt-0">
                    <h2 className="text-4xl font-bold">{user?.displayName}</h2>
                    <p className="text-xl font-semibold flex items-center gap-3">
                        <MdEmail />
                        {user?.email}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <MdPhone />01720001535
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <FaHouseUser /> Dhaka, Bangladesh
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
