import { Button, FileInput, Label, Radio, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { saveUser, setImageUrl, setUserRole } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthProvider";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";
import { setTitle } from "../../api/title";

const Signup = () => {
    setTitle("Sign Up");
    const {
        createUser,
        signInWithGoogle,
        updateUserProfile,
        loading,
        setLoading,
        signInWithFacebook,
    } = useContext(AuthContext);

    const navigate = useNavigate();
    // handle signup
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        // get form data
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        // console.log(name, email, password, role);

        // get image & host on imgbb
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const url = `${process.env.REACT_APP_imgbbURL}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.success) {
                    const img_url = data.data.display_url;
                    // create user with email & password
                    createUser(email, password)
                        .then((result) => {
                            const user = result.user;
                            // console.log(user);

                            // update user info
                            updateUser(user, name, img_url, role);
                        })
                        .catch((err) => {
                            toast.error(err.message);
                            setLoading(false);
                        });
                }
            });
    };

    const updateUser = async (user, name, img, role) => {
        updateUserProfile(name, img)
            .then(() => {
                // save user in db
                saveUser(user);
                // show success toast
                toast.success("Account Registered Successfully.");
                navigate("/");
                // setUserRole
                setUserRole(user?.email, role);

                // save user image
                setImageUrl(user?.email, img);
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;

                // save user in db
                saveUser(user);
                // setUserRole
                setUserRole(user?.email, "job-seeker");
                // show success
                toast.success("Signin Successfully.");

                // save user image
                setImageUrl(user?.email, user?.photoURL);
                navigate("/");
            })
            .catch((err) => {
                toast.error(`${err.message}`);
            });
    };

    // implement facebook signin
    const handleFacebookSignIn = () => {
        signInWithFacebook()
            .then((result) => {
                const user = result.user;

                // save user in db
                saveUser(user);
                // setUserRole
                setUserRole(user?.email, "job-seeker");
                // show success
                toast.success("Signin Successfully.");

                // save user image
                setImageUrl(user?.email, user?.photoURL);
                navigate("/");
            })
            .catch((err) => {
                toast.error(`${err.message}`);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 lg:mt-20 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Sign Up</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* name */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Jisan Hasan"
                        required={true}
                    />
                </div>

                {/* image */}
                <div id="fileUpload" className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Profile Picture" />
                    </div>
                    <FileInput name="image" id="file" required={true} />
                </div>

                {/* email */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="jisan@gmail.com"
                        required={true}
                    />
                </div>

                {/* password */}
                <div className="mt-3">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="******"
                        required={true}
                    />
                </div>

                {/* role select */}
                <fieldset className="mt-4 grid grid-cols-3" id="radio">
                    <div>
                        <legend>Select Your Role:</legend>
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
                <PrimaryButton
                    type="submit"
                    classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
                >
                    {loading ? <SmallSpinner /> : "Sign Up"}
                </PrimaryButton>

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
                    <FaGoogle onClick={handleGoogleSignIn} size={25} />
                    <FaFacebook onClick={handleFacebookSignIn} size={25} />
                    <FaGithub size={25} />
                </div>
            </div>
        </div>
    );
};

export default Signup;
