import { Button, Label, TextInput, Textarea } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setTitle } from "../../api/title";

const UpdateProfile = () => {
    setTitle("Update Profile");
    const { user } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();
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

    // console.log(userProfile);
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // get form value
        const phone = form.phone.value;
        const address = form.address.value;
        const institute = form.institute.value;
        const cgpa = form.cgpa.value;
        const github = form.github.value;
        const portfolio = form.portfolio.value;
        const linkedin = form.linkedin.value;
        const bio = form.bio.value;

        const updateProfile = {
            phone,
            address,
            institute,
            cgpa,
            github,
            portfolio,
            linkedin,
            bio,
        };

        fetch(
            `${process.env.REACT_APP_API_URL}/updateProfile/${userProfile?._id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(updateProfile),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    navigate("/profile");
                    toast.success("Profile Updated Successfully.");
                }
            });
    };
    return (
        <div className="max-w-2xl mx-auto mt-10  md:mt-14 bg-gray-100 px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">
                Update Profile
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                {/* name & email */}
                <div className="mt-3 grid md:grid-cols-2 md:gap-3 space-y-3 md:space-y-0">
                    <div>
                        <TextInput
                            type="text"
                            defaultValue={user?.displayName}
                            readOnly
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            required
                        />
                    </div>
                </div>

                {/* phone & address */}
                <div className="mt-3 grid md:grid-cols-2 md:gap-3 space-y-3 md:space-y-0">
                    <div>
                        <TextInput
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            defaultValue={userProfile?.phone}
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            name="address"
                            placeholder="Address"
                            defaultValue={userProfile?.address}
                            required
                        />
                    </div>
                </div>

                {/* education & result */}
                <div className="mt-3 grid md:grid-cols-2 md:gap-3 space-y-3 md:space-y-0">
                    <div>
                        <TextInput
                            type="text"
                            name="institute"
                            placeholder="Institute Name"
                            defaultValue={userProfile?.institute}
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            name="cgpa"
                            placeholder="C.G.P.A."
                            defaultValue={userProfile?.cgpa}
                            required
                        />
                    </div>
                </div>

                {/* github */}
                <div className="mt-3">
                    <TextInput
                        type="url"
                        name="github"
                        placeholder="Github URL"
                        defaultValue={userProfile?.github}
                    />
                </div>

                {/* portfolio */}
                <div className="mt-3">
                    <TextInput
                        type="url"
                        name="portfolio"
                        placeholder="Portfolio URL"
                        defaultValue={userProfile?.portfolio}
                    />
                </div>

                {/* LinkedIn */}
                <div className="mt-3">
                    <TextInput
                        type="url"
                        name="linkedin"
                        placeholder="LinkedIn Profile"
                        defaultValue={userProfile?.linkedin}
                    />
                </div>

                {/* Requirements */}
                <div>
                    <div id="textarea">
                        <Textarea
                            name="bio"
                            required={true}
                            rows={4}
                            placeholder="Write about yourself..."
                            defaultValue={userProfile?.bio}
                        />
                    </div>
                </div>

                <Button className="mt-6" type="submit">
                    Update
                </Button>
            </form>
        </div>
    );
};

export default UpdateProfile;
