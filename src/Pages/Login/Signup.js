import { Button, FileInput, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 lg:mt-20 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Sign Up</h3>
            <form className="flex flex-col">
                {/* name */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput
                        id="name"
                        type="email"
                        placeholder="Jisan Hasan"
                        required={true}
                    />
                </div>
                {/* email */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="jisan@gmail.com"
                        required={true}
                    />
                </div>

                {/* image */}
                <div id="fileUpload" className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Profile Picture" />
                    </div>
                    <FileInput id="file" required={true} />
                </div>
                {/* password */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="******"
                        required={true}
                    />
                </div>

                {/* role select */}
                <fieldset
                    className="mt-4 grid grid-cols-3"
                    id="radio"
                >
                    <div>
                        <legend>
                            Select Your Role:
                        </legend>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Radio
                            id="job-seeker"
                            name="role"
                            value="job-seeker"
                            defaultChecked={true}
                        />
                        <Label htmlFor="job-seeker">Job Seeker</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Radio id="employer" name="role" value="employer" />
                        <Label htmlFor="employer">Employer</Label>
                    </div>
                </fieldset>

                {/* Signup button */}
                <Button className="mt-4" type="submit">
                    Sign Up
                </Button>

                <div className="mt-2 mb-3">
                    <div className="mb-2 text-sm block">
                        Already have any account?{" "}
                        <Link to="/login" className="text-sm text-blue-500">
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
            <div>
                <h4 className="mt-3 text-center text-green-400">
                    Sign In With Social Account
                </h4>
                <div className="flex justify-center gap-12 mt-4">
                    <FaGoogle size={25} />
                    <FaFacebook size={25} />
                    <FaGithub size={25} />
                </div>
            </div>
        </div>
    );
};

export default Signup;
