import { Card, Tooltip } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { setTitle } from "../../api/title";
import { AuthContext } from "../../contexts/AuthProvider";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applicationCount, setApplicationCount] = useState(0);
    const [payments, setPayments] = useState([]);
    setTitle("Dashboard");

    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setUsers(data.data);
                }
            });
        fetch(`${process.env.REACT_APP_API_URL}/allJobs`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setJobs(data.data);
                }
            });
        fetch(`${process.env.REACT_APP_API_URL}/applicationsCount`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setApplicationCount(data.data);
                }
            });
        fetch(`${process.env.REACT_APP_API_URL}/allPayments`, {
            headers: {
                email: user?.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPayments(data.data);
                }
            });
    }, [user]);

    let totalPayments = 0;
    payments.forEach((payment) => {
        totalPayments += Number(payment.price);
    });

    // console.log(emp.length, jobSeeker.length)
    const usersData = [
        {
            name: "Employer",
            count: users.filter((user) => user?.role === "employer").length,
        },
        {
            name: "Job-Seeker",
            count: users.filter((user) => user?.role === "job-seeker").length,
        },
    ];
    const jobsData = [
        {
            name: "Approved",
            count: jobs.filter((job) => job?.isApproved).length,
        },
        {
            name: "Not-Approved",
            count: jobs.filter((job) => !job?.isApproved).length,
        },
    ];
    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-5">
                Admin Dashboard
            </h2>
            <div className="grid md:grid-cols-2">
                <div className="max-w-sm mx-auto">
                    <Card>
                        <BarChart width={300} height={300} data={usersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                        <p className="text-center text-xl font-semibold">
                            Registered Users
                        </p>
                    </Card>
                </div>
                <div className="max-w-sm mx-auto">
                    <Card>
                        <BarChart width={300} height={300} data={jobsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2CA02C" />
                        </BarChart>
                        <p className="text-center text-xl font-semibold">
                            All Jobs
                        </p>
                    </Card>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mt-8 text-center">
                <Card>
                    <h3 className="text-xl font-semibold">
                        Total Job Application
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">
                        {applicationCount}
                    </p>
                </Card>
                <Card>
                    <h3 className="text-xl font-semibold">Total Revenue</h3>
                    <p className="text-3xl font-bold text-[#2CA02C]">
                        {totalPayments}
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
