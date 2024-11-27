"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const clientToken = Cookies.get("token");
    if (!clientToken) {
      router.push("/auth");
    } else {
      setToken(clientToken);
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://tendor-stage-node.linebyline.live/api/users/details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile data.");

        const data = await response.json();
        setProfileData({
          name: data.user.name || "Neeraj Kumar",
          email: data.user.email || "neeraj@aisv.in",
          phone: data.user.phone || "7056330417",
        });
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(
        "https://tendor-stage-node.linebyline.live/api/users/details",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile.");

      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={profileData.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="tel"
            className="input input-bordered w-full"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
          />
        </div>
        <button
          className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white 
          bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 
          focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed 
          transition-all duration-300 ease-in-out transform hover:scale-105 ${
            isUpdating ? "loading" : ""
          }`}
          onClick={handleUpdateProfile}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className="flex items-center justify-center">
              <span className="loader mr-2"></span>Updating...
            </span>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;
