import { Button, Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const [searchStr, setSearchStr] = useState("");
    const [refresh, setRefresh] = useState(false);

    // console.log(users);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setUsers(data.data);
                }
            });
    }, [user, refresh]);

    const handleUserStatusAction = (email, status) => {
        fetch(`${process.env.REACT_APP_API_URL}/userAccess/${email}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ status: status }),
        })
            .then((res) => res.json())
            .then((data) => setRefresh(!refresh));
    };
    return (
        <div>
            <h3 className="text-center text-3xl font-bold">Users Activity!</h3>
            <div className="flex items-center max-w-lg mx-2 mt-5 md:mx-auto">
                <label htmlFor="voice-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="voice-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter email, name or role to sort user"
                        onChange={(e) => setSearchStr(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        {/* <Table.HeadCell>Serial</Table.HeadCell> */}
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users
                            ?.filter((u) => u.role !== "admin")
                            .filter((u) => {
                                if (searchStr === "") {
                                    return true;
                                } else {
                                    return (
                                        u?.email
                                            .toLowerCase()
                                            .includes(
                                                searchStr.toLowerCase()
                                            ) ||
                                        u?.name
                                            .toLowerCase()
                                            .includes(
                                                searchStr.toLowerCase()
                                            ) ||
                                        u?.role
                                            .toLowerCase()
                                            .includes(searchStr.toLowerCase())
                                    );
                                }
                            })
                            .map((u, i) => (
                                <Table.Row
                                    key={u._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {i + 1}
                        </Table.Cell> */}
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {u?.email}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {u?.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {u?.role}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {!u?.isBlocked ? (
                                            <Button
                                                color="failure" pill outline
                                                onClick={() =>
                                                    handleUserStatusAction(
                                                        u?.email,
                                                        true
                                                    )
                                                }
                                            >
                                                Block
                                            </Button>
                                        ) : (
                                            <Button
                                                color="success" pill 
                                                onClick={() =>
                                                    handleUserStatusAction(
                                                        u?.email,
                                                        false
                                                    )
                                                }
                                            >
                                                Unblock
                                            </Button>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default AllUsers;
