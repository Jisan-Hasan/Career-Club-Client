import emailjs from "@emailjs/browser";
import {
    Button,
    Card,
    Label,
    Modal,
    TextInput,
    Textarea,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLink } from "react-icons/ai";
import { FaHouseUser, FaUniversity } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const ApplicantProfile = () => {
    const profile = useLoaderData().data;
    const { user } = useContext(AuthContext);
    const [emailModal, setEmailModal] = useState(false);
    setTitle(profile?.name);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setEmailModal(false);

        emailjs
            .sendForm(
                "service_49tpm03",
                "template_51r7c2w",
                e.target,
                "xjPqQtgtWWPID2g_p"
            )
            .then((res) => {
                toast.success("Email Send Successfully!");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };
    return (
        <div className="mt-10 grid justify-center">
            <div className="md:flex md:space-x-5 md:items-center">
                <div>
                    <img
                        className="w-64"
                        src={profile?.image}
                        alt={profile?.name}
                    />
                </div>
                <div className="space-y-4 mt-3 md:mt-0">
                    <h2 className="text-4xl font-bold">{profile?.name}</h2>
                    <p className="text-xl font-semibold flex items-center gap-3">
                        <MdEmail />
                        {profile?.email}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <MdPhone />
                        {profile?.phone}
                    </p>
                    <p className="flex items-center gap-3 text-lg font-medium">
                        <FaHouseUser />
                        {profile?.address}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <FaUniversity />
                        {profile?.institute} - CGPA: {profile?.cgpa}
                    </p>
                    <p className="flex items-center gap-3 text-lg">
                        <AiOutlineLink />{" "}
                        {profile?.github && profile?.github !== "" && (
                            <>
                                <a
                                    target="_blank"
                                    href={profile?.github}
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>{" "}
                                ||{" "}
                            </>
                        )}
                        {profile?.portfolio && profile?.portfolio !== "" && (
                            <>
                                <a
                                    target="_blank"
                                    href={profile?.portfolio}
                                    rel="noreferrer"
                                >
                                    Portfolio
                                </a>{" "}
                                ||{" "}
                            </>
                        )}
                        {profile?.linkedin && profile?.linkedin !== "" && (
                            <a
                                target="_blank"
                                href={profile?.linkedin}
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                        )}
                    </p>
                </div>
            </div>
            {/* Bio */}
            <Card className="mt-12">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    About {profile?.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {profile?.bio}
                </p>
            </Card>

            {/* Skills set */}
            <Card className="mt-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between items-center">
                    Skills
                </h5>
                <div className="mt-2 space-x-2">
                    {!profile?.skills
                        ? "No Skills Found"
                        : profile?.skills.map((skill, i) => (
                              <span
                                  key={i}
                                  className="font-normal text-gray-700 dark:text-gray-400 bg-red-400 px-4 py-2 rounded-2xl"
                              >
                                  {skill}
                              </span>
                          ))}
                </div>
            </Card>

            <div className="mt-8 text-center">
                <button
                    onClick={() => setEmailModal(true)}
                    className="btn btn-primary"
                >
                    Send Email
                </button>
            </div>

            {/* email modal */}
            {emailModal && (
                <React.Fragment>
                    <Modal
                        show={emailModal}
                        size="xl"
                        popup={true}
                        onClose={() => setEmailModal(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <form
                                    onSubmit={handleEmailSubmit}
                                    className="space-y-2"
                                    id="contact-form"
                                >
                                    <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                                        Contact Form
                                    </h3>
                                    {/* From */}
                                    <div>
                                        <div className=" block">
                                            <Label
                                                htmlFor="from"
                                                value="From"
                                            />
                                        </div>
                                        <TextInput
                                            type="email"
                                            id="from"
                                            name="from"
                                            value={user?.email}
                                            readOnly
                                        />
                                    </div>
                                    {/* To */}
                                    <div>
                                        <div className=" block">
                                            <Label
                                                htmlFor="recipient"
                                                value="To"
                                            />
                                        </div>
                                        <TextInput
                                            type="text"
                                            id="recipient"
                                            name="recipient"
                                            value={profile?.email}
                                            readOnly
                                        />
                                    </div>
                                    {/* Subject */}
                                    <div>
                                        <div className=" block">
                                            <Label
                                                htmlFor="subject"
                                                value="Subject"
                                            />
                                        </div>
                                        <TextInput
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Email Subject..."
                                        />
                                    </div>
                                    {/* Message */}
                                    <div>
                                        <div className=" block">
                                            <Label
                                                htmlFor="message"
                                                value="Message"
                                            />
                                        </div>
                                        <Textarea
                                            rows={4}
                                            id="message"
                                            name="message"
                                            placeholder="Write your message..."
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Send Email
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

export default ApplicantProfile;
