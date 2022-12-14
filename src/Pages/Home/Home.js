import React from "react";
import { setTitle } from "../../api/title";
import { Link } from "react-router-dom";
const Home = () => {
    setTitle("Home");
    return (
        <div>
            <div className="md:grid md:grid-cols-2 xl:px-10">
                <div className="self-center ml-2">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold uppercase">
                        Career Club
                        <br />
                        Job Finder
                    </h1>
                    <h3 className="text-xl md:text-2xl xl:text-3xl font-bold mt-3 mb-6 uppercase">
                        Join The Best. Be The Best
                    </h3>
                    <p className="text-lg font-semibold text-gray-600 w-4/5 capitalize">
                    Having Trouble Finding The Right One? We are here to connect The Best Employees With The Best Companies.
                         Leave It Up To Us
                        Growing A Business Means Having The Right People In Your
                        Team
                    </p>
                    <Link to='/jobs'
                        className="focus:!ring-2 group flex-1 h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-full bg-emerald-400 px-6 py-2 mt-8 text-white"
                        type="button"
                    >
                        <span className="flex items-center rounded-md text-sm px-4 py-2 uppercase">
                            Explore Jobs
                        </span>
                    </Link>
                </div>
                <div className="self-center">
                    <img
                        src="https://service-e74b1.web.app/static/media/image.6f936b291abc81b147fc.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
