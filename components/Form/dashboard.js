'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/Card/card";
import Cookies from "js-cookie";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([
    { id: 1, name: "Mayank Dubey", role: "CEO/CTO", progress: 100 },
    { id: 2, name: "Navneet Singh", role: "Front End Developer", progress: 65 },
    { id: 3, name: "Harshil Rami", role: "Senior Data Scientist", progress: 90 },
    { id: 4, name: "Sandeep Raghuvanshi", role: "DevOps", progress: 85 },
    { id: 5, name: "Saurav Yadav", role: "Data Team", progress: 70 },
  ]);

  const [projectList, setProjectList] = useState([
    { id: 1, name: "Tender Tiger", status: "In Progress", progress: 70 },
    { id: 2, name: "Enterprise-Dashboard", status: "In Progress", progress: 60 },
    { id: 3, name: "Eagle Tender", status: "In Progress", progress: 90 },
    { id: 4, name: "YouData", status: "Completed", progress: 100 },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!token) {
      router.push("/auth");
    }
  }, [router, token]);
  if (!token) {
    return null;
  }

  const chartData = {
    labels: filteredData.map((data) => data.name),
    datasets: [
      {
        label: "Employee Progress (%)",
        data: filteredData.map((data) => data.progress),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Employee Progress Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className={`lg:block ${sidebarOpen ? "block" : "hidden"} fixed inset-0 z-50 bg-white lg:static`}>
        <Sidebar />
      </div>

      <div className="lg:hidden bg-gray-100 p-4 flex justify-between items-center">
        <button
          className="btn btn-primary"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
        <Card className="flex-1 w-full mt-4 sm:mt-8 p-6 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">YouData.AI</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Welcome Section */}
            <div className="text-center mb-6">
              <p className="text-lg sm:text-xl font-medium">Welcome to YouData.AI!</p>
            </div>

            {/* Search Input */}
            <div className="mb-4 flex justify-center">
              <input
                type="text"
                className="input input-bordered w-full sm:w-80"
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto mb-8">
              <table className="table-auto w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.id}>
                        <td className="border px-4 py-2">{row.id}</td>
                        <td className="border px-4 py-2">{row.name}</td>
                        <td className="border px-4 py-2">{row.role}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center border px-4 py-2">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bar Chart */}
            <div className="relative w-full h-64 sm:h-96">
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Project List */}
            <div className="mt-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Project List</h2>
              <table className="table-auto w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Project Name</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.length > 0 ? (
                    projectList.map((project) => (
                      <tr key={project.id}>
                        <td className="border px-4 py-2">{project.id}</td>
                        <td className="border px-4 py-2">{project.name}</td>
                        <td className="border px-4 py-2">{project.status}</td>
                        <td className="border px-4 py-2">{project.progress}%</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center border px-4 py-2">
                        No projects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
