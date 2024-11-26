"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/Card/card";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  // State for search input and table data
  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
    { id: 3, name: "Mike Johnson", role: "Manager" },
  ]);

  // Filtered data based on search query
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
    <div className="flex flex-col lg:flex-row">
      <Sidebar className="hidden lg:block" /> {/* Sidebar hidden on small screens */}
      <div className="w-full lg:ml-64 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-base sm:text-lg font-medium">Welcome to your dashboard!</p>
            </div>

            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table table-auto w-full">
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
          <CardFooter className="text-center text-xs sm:text-sm text-muted-foreground">
            <p>
              Developed by{" "}
              <a
                href="https://www.neerajkumar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Neeraj Kumar
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
