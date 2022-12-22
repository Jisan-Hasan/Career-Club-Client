import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaHouseUser, FaUniversity } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { setTitle } from "../../api/title";
import { Link } from "react-router-dom";
import { Button, Card, Modal, TextInput } from "flowbite-react";
import { GrAdd } from "react-icons/gr";
import { toast } from "react-hot-toast";

const UserProfile = () => {
    setTitle("My Profile");
    const { user } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    // get userinfo from db
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setUserProfile(data.data);
                }
            });
    }, [user, refresh]);

    // handle add skills
    const handleSubmit = (e) => {
        e.preventDefault();
        setAddModal(false);

        let skills = userProfile?.skills;
        if (!skills) {
            skills = [e.target.title.value];
        } else {
            skills = [...skills, e.target.title.value];
        }

        fetch(`${process.env.REACT_APP_API_URL}/addSkill/${userProfile?._id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ skills: skills }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRefresh(!refresh);
                    toast.success("New Skill Added");
                }
            });
        // const skills = userProfile?.skills;
        console.log(skills);
    };
    return (
        <div className="mt-10 grid justify-center">
            <div className="md:flex md:space-x-5 md:items-center">
                <div>
                    <img
                        className="w-64"
                        src={userProfile?.image}
                        alt={userProfile?.name}
                    />
                </div>
                <div className="space-y-4 mt-3 md:mt-0">
                    <h2 className="text-4xl font-bold">{userProfile?.name}</h2>
                    <p className="text-xl font-semibold flex items-center gap-3">
                        <MdEmail />
                        {userProfile?.email}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <MdPhone />
                        {userProfile?.phone}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <FaHouseUser />
                        {userProfile?.address}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <FaUniversity />
                        {userProfile?.institute} - CGPA: {userProfile?.cgpa}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <AiOutlineLink />{" "}
                        <Link target="_blank" to={userProfile?.github}>
                            GitHub
                        </Link>{" "}
                        ||{" "}
                        <Link target="_blank" to={userProfile?.portfolio}>
                            Portfolio
                        </Link>{" "}
                        ||{" "}
                        <Link target="_blank" to={userProfile?.linkedin}>
                            LinkedIn
                        </Link>
                    </p>
                </div>
            </div>
            {/* Bio */}
            <Card className="mt-12">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    About {userProfile?.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {userProfile?.bio}
                </p>
            </Card>

            {/* Skills set */}
            <Card className="mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between items-center">
                    Skills <GrAdd onClick={() => setAddModal(true)} />
                </h5>
                <div className="mt-2 space-x-2">
                    {!userProfile?.skills
                        ? "No Skills Found"
                        : userProfile?.skills.map((skill,i) => (
                              <span key={i} className="font-normal text-gray-700 dark:text-gray-400 bg-red-400 px-4 py-2 rounded-2xl">
                                  {skill}
                              </span>
                          ))}
                </div>
            </Card>

            {/* update modal */}
            {addModal && (
                <React.Fragment>
                    <Modal
                        show={addModal}
                        size="md"
                        popup={true}
                        onClose={() => setAddModal(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                                        Add New Skill
                                    </h3>
                                    {/* title */}
                                    <div>
                                        <TextInput
                                            type="text"
                                            name="title"
                                            placeholder="HTML, CSS, JavaScript"
                                            required={true}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            )}
        </div>
    );
};

export default UserProfile;
