import { Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";
import { saveUser, setImageUrl, setUserRole } from "../../api/auth";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
    setTitle("Login");
    const [email, setEmail] = useState("");
    const [isHuman, setIsHuman] = useState(false);
    // const [isBlocked, setIsBlocked] = useState(false);
    const {
        signInWithGoogle,
        signIn,
        loading,
        setLoading,
        resetPassword,
        signInWithFacebook,
        signInWithGithub,
    } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleReset = () => {
        resetPassword(email)
            .then(() => {
                setLoading(false);
                toast.success(`A password reset link send on ${email}`);
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    // implement email password signin
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isHuman) {
            toast.error("Verify yourself as human");
            return;
        }
        const form = e.target;
        // get form data
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                // const user = result.user;

                // check for block or not
                fetch(`${process.env.REACT_APP_API_URL}/user/${email}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data?.data?.isBlocked) {
                            toast.error(
                                "You are blocked. Contract to Authority!"
                            );
                            navigate("/blocked");
                        } else {
                            toast.success("Signin Successfully.");
                            navigate(from);
                        }
                    });
                toast.success("Signin Successfully.");
                navigate(from);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
                setLoading(false);
            });
    };

    // implement google signin
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
                navigate(from);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
                setLoading(false);
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
                navigate(from);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
                setLoading(false);
            });
    };
    // implement github signin
    const handleGithubSignIn = () => {
        signInWithGithub()
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
                navigate(from);
            })
            .catch((err) => {
                toast.error(`${err.message}`);
                setLoading(false);
            });
    };

    function onChange(value) {
        setIsHuman(true);
    }
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 lg:mt-20 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Login</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        onBlur={(e) => setEmail(e.target.value)}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="jisan@gmail.com"
                        required={true}
                    />
                </div>
                <div className="mt-4">
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
                    <div className="mb-2 block">
                        <button
                            onClick={handleReset}
                            className="text-sm mt-2 hover:text-blue-400"
                        >
                            Forget Password?
                        </button>
                    </div>
                </div>

                <div className="mb-2">
                    <ReCAPTCHA
                        sitekey="6LcoC8gnAAAAAJUwd5XXd645dST6JgD91IqCJeEn"
                        onChange={onChange}
                    />
                </div>

                <PrimaryButton
                    type="submit"
                    classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
                >
                    {loading ? <SmallSpinner /> : "Log in"}
                </PrimaryButton>

                <div className="mt-2 mb-3">
                    <div className="mb-2 text-sm block">
                        Don't have any account?{" "}
                        <Link to="/signup" className="text-sm text-blue-500">
                            Sign Up
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
                    <FaGithub onClick={handleGithubSignIn} size={25} />
                </div>
            </div>
        </div>
    );
};

export default Login;
