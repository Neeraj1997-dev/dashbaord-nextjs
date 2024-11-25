"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/Card/card";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");

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
            <div className="text-center">
              <p className="text-base sm:text-lg font-medium">Welcome to your dashboard!</p>
              {/* <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Here you can view your details, manage tasks, and more.
              </p> */}
            </div>
            {/* <div className="mt-6 space-y-4">
              <button className="btn btn-primary w-full sm:w-auto" onClick={() => alert("View your profile")}>
                View Profile
              </button>
              <button className="btn btn-secondary w-full sm:w-auto" onClick={() => alert("Manage tasks")}>
                Manage Tasks
              </button>
              <button
                className="btn btn-outline w-full sm:w-auto"
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/auth");
                }}
              >
                Logout
              </button>
            </div> */}
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
