import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { setTitle } from "../../api/title";

const BuyPackage = () => {
    setTitle("Buy Package");
    const [packages, setPackages] = useState([]);
    // get all packages
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/package`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPackages(data.data);
                }
            });
    }, []);
    return (
        <div>
            <h3 className="text-3xl font-bold text-center mt-8 mb-14">
                Buy Package
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {packages.map((pack) => (
                    <div key={pack._id}>
                        <Card>
                            <h5 className="mb-4 text-center text-xl font-medium text-gray-500 dark:text-gray-400">
                                {pack.title}
                            </h5>
                            <div className="flex justify-center items-baseline text-gray-900 dark:text-white">
                                <span className="text-3xl font-semibold">
                                    $
                                </span>
                                <span className="text-5xl font-extrabold tracking-tight">
                                    {pack.price}
                                </span>
                            </div>
                            <ul
                                role="list"
                                className="my-7 space-y-5 flex flex-col items-center"
                            >
                                <li className="flex space-x-3">
                                    <svg
                                        className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {pack.postNumber} Job Posts
                                    </span>
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="inline-flex w-2/3 mx-auto justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                            >
                                Buy Package
                            </button>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyPackage;
