import React from "react";

const UserBlocked = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center font-semibold">
                <div className="text-red-500 text-3xl mb-4">
                    You Can't Access the System.
                </div>
                <div className="text-gray-600 text-lg mb-4">
                    An Admin restricted your access.
                </div>
                <div className="text-gray-600 text-lg mb-4">
                    Please contact the admin ASAP.
                </div>
                <div className="text-green-500 text-2xl">Thank You!</div>
            </div>
        </div>
    );
};

export default UserBlocked;
