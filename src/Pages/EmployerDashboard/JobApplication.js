import { Card, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const JobApplication = () => {
    const [applications, setApplications] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    // console.log(location.pathname);
    const applicationId = location.pathname.split("/")[3];
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/application/${applicationId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setApplications(data.data);
                }
            });
    }, [refresh, applicationId]);
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
                                ></TextInput>
                                <TextInput
                                    name="max"
                                    type="number"
                                    placeholder="Max. CGPA"
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
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {applications.map((application, i) => (
                                <Table.Row
                                    key={application._id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {application?.seeker_email}
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
