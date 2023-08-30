import { Card, Table, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const JobApplication = () => {
    const { user } = useContext(AuthContext);
    setTitle("Applications");
    const [applications, setApplications] = useState([]);
    const location = useLocation();

    const [university, setUniversity] = useState("");
    const [minCGPA, setMinCGPA] = useState(0);
    const [maxCGPA, setMaxCGPA] = useState(4);

    console.log(university, minCGPA, maxCGPA);

    // console.log(location.pathname);
    const applicationId = location.pathname.split("/")[3];
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}/application/${applicationId}?uni=${university}`,
            {
                headers: {
                    email: user?.email,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setApplications(data.data);
                }
            });
    }, [applicationId, university, minCGPA, maxCGPA]);

    if (minCGPA === "") {
        setMinCGPA(0);
    }
    if (maxCGPA === "") {
        setMaxCGPA(4);
    }
    let filteredResult = applications.filter((application) => {
        if (
            Number(application.cgpa) >= minCGPA &&
            Number(application.cgpa) <= maxCGPA
        ) {
            return application;
        }
    });
    // console.log(applications);
    return (
        <div className="lg:flex lg:flex-row-reverse gap-3">
            <div>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content space-y-3">
                    <li>
                        <Card className="grid py-0">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                University
                            </h5>
                            <hr />
                            <TextInput
                                name="university"
                                type="text"
                                placeholder="United International University"
                                onChange={(e) => setUniversity(e.target.value)}
                            ></TextInput>
                        </Card>
                    </li>

                    <li>
                        <Card className="grid py-0">
                            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                CGPA Range
                            </h5>
                            <hr />
                            <div className="flex gap-3">
                                <TextInput
                                    name="min"
                                    type="number"
                                    placeholder="Min. CGPA"
                                    onChange={(e) => setMinCGPA(e.target.value)}
                                ></TextInput>
                                <TextInput
                                    name="max"
                                    type="number"
                                    placeholder="Max. CGPA"
                                    onChange={(e) => setMaxCGPA(e.target.value)}
                                ></TextInput>
                            </div>
                        </Card>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <div className="mt-10">
                    <Table hoverable={true}>
                        <Table.Head className="text-base text-[#05A3B7]">
                            <Table.HeadCell>Serial</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>CGPA</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredResult.map((application, i) => (
                                <Table.Row
                                    key={application._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {application?.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {application?.seeker_email}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {application?.cgpa}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={`/employerDashboard/applicantProfile/${application?.seeker_email}`}
                                            className="btn btn-info btn-outline duration-500"
                                        >
                                            See Profile
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default JobApplication;
