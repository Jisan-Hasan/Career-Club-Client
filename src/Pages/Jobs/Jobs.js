import { Card, Label, Radio, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { setTitle } from "../../api/title";

const Jobs = () => {
    setTitle('Jobs')
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("all");
    const [experience, setExperience] = useState("all");
    const [type, setType] = useState("all");
    const [duration, setDuration] = useState("all");
    const [searchStr, setSearchStr] = useState("");

    console.log(category, experience, type, duration, searchStr);
    // get all categories
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/category`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setCategories(data.data);
                }
            });
    }, []);
    return (
        <div className="container mx-auto">
            <div className="drawer drawer-mobile">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* search box */}

                    <form className="flex items-center max-w-lg mx-2 md:mx-auto">
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
                                placeholder="Search Jobs, Find the best one..."
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
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 mr-2 -ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                            Search
                        </button>
                    </form>

                    <Outlet />
                </div>
                <div className="drawer-side scroll-smooth">
                    <label
                        htmlFor="my-drawer-2"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content space-y-3">
                        {/* <!-- Sidebar content here --> */}

                        <li>
                            <Card className="grid py-0">
                                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Category
                                </h5>
                                <hr />
                                <Select
                                    name="category"
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <option value="all" defaultChecked={true}>
                                        All Jobs
                                    </option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.title}
                                        </option>
                                    ))}
                                </Select>
                            </Card>
                        </li>
                        <li>
                            <Card className="grid py-0">
                                <fieldset
                                    className="flex flex-col gap-4"
                                    id="radio"
                                    onChange={(e) =>
                                        setExperience(e.target.value)
                                    }
                                >
                                    <legend className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                                        Experience
                                    </legend>
                                    <hr />
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="exp-all"
                                                name="experience"
                                                value="all"
                                                defaultChecked
                                            />
                                            <Label htmlFor="exp-all">All</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="fresher"
                                                name="experience"
                                                value="Fresher"
                                            />
                                            <Label htmlFor="fresher">Fresher</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="mid"
                                                name="experience"
                                                value="1-3 years"
                                            />
                                            <Label htmlFor="mid">1-3 years</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="senior"
                                                name="experience"
                                                value="3-5 years"
                                            />
                                            <Label htmlFor="senior">3-5 years</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="expert"
                                                name="experience"
                                                value="5+ years"
                                            />
                                            <Label htmlFor="expert">5+ years</Label>
                                        </div>
                                    </div>
                                </fieldset>
                            </Card>
                        </li>

                        <li>
                            <Card className="grid py-0">
                                <fieldset
                                    className="flex flex-col gap-4"
                                    id="radio"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <legend className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                                        Type
                                    </legend>
                                    <hr />
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="type-all"
                                                name="type"
                                                value="all"
                                                defaultChecked
                                            />
                                            <Label htmlFor="type-all">All</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="on-site"
                                                name="type"
                                                value="On Site"
                                            />
                                            <Label htmlFor="on-site">On Site</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="Remote"
                                                name="type"
                                                value="Remote"
                                            />
                                            <Label htmlFor="Remote">Remote</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="Hybrid"
                                                name="type"
                                                value="Hybrid"
                                            />
                                            <Label htmlFor="Hybrid">Hybrid</Label>
                                        </div>
                                    </div>
                                </fieldset>
                            </Card>
                        </li>

                        <li>
                            <Card className="grid py-0">
                                <fieldset
                                    className="flex flex-col gap-4"
                                    id="radio"
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                >
                                    <legend className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                                        Duration
                                    </legend>
                                    <hr />

                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="duration-all"
                                                name="duration"
                                                value="all"
                                                defaultChecked
                                            />
                                            <Label htmlFor="duration-all">All</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="part-time"
                                                name="duration"
                                                value="Part Time"
                                                
                                            />
                                            <Label htmlFor="part-time">Part Time</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="full-time"
                                                name="duration"
                                                value="Full Time"
                                            />
                                            <Label htmlFor="full-time">Full Time</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="Internship"
                                                name="duration"
                                                value="Internship"
                                            />
                                            <Label htmlFor="Internship">Internship</Label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Radio
                                                id="Contract"
                                                name="duration"
                                                value="Contract"
                                            />
                                            <Label htmlFor="Contract">Contract</Label>
                                        </div>
                                    </div>
                                </fieldset>
                            </Card>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
