"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/Card/card";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([
    { id: 1, name: "Mayank Dubey", role: "CEO/CTO" },
    { id: 2, name: "Navneet Singh", role: "Front End Developer" },
    { id: 3, name: "Harshil Rami", role: "Senior Data Scientist" },
    { id: 4, name: "Sandeep Raghuvanshi", role: "DevOps" },
    { id: 5, name: "Saurav Yadav", role: "Data Team" },
  ]);

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar className="lg:block hidden" />

      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
        <Card className="flex-1 w-full mt-8 p-6 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">YouData.AI</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-center mb-6">
              <p className="text-lg sm:text-xl font-medium">Welcome to your YouData.AI!</p>
            </div>

            <div className="mb-4 flex justify-center">
              <input
                type="text"
                className="input input-bordered w-full sm:w-80"
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="table table-auto w-full text-left">
                <thead>
                  <tr>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
