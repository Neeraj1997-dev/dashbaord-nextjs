import React, { useState } from "react";
import Link from "next/link";

const dummyTasks = [
  { id: 1, title: "Yearly Task 1", status: "Pending", date: "2024-01-15" },
  { id: 2, title: "Monthly Task 1", status: "Completed", date: "2024-11-10" },
  { id: 3, title: "Weekly Task 1", status: "In Progress", date: "2024-11-25" },
  { id: 4, title: "Weekly Task 2", status: "Pending", date: "2024-11-26" },
  { id: 5, title: "Monthly Task 2", status: "Completed", date: "2024-11-05" },
  { id: 6, title: "Yearly Task 2", status: "Pending", date: "2024-12-20" },
  { id: 7, title: "Weekly Task 3", status: "In Progress", date: "2024-11-27" },
  { id: 8, title: "Weekly Task 4", status: "Pending", date: "2024-11-28" },
  { id: 9, title: "Monthly Task 3", status: "Completed", date: "2024-10-15" },
];

const TaskTable = () => {
  const [filter, setFilter] = useState("weekly");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTasks = dummyTasks.filter((task) => {
    const taskDate = new Date(task.date);
    const now = new Date();

    let matchesFilter = false;
    if (filter === "weekly") {
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      matchesFilter = taskDate >= weekStart && taskDate <= weekEnd;
    } else if (filter === "monthly") {
      matchesFilter =
        taskDate.getMonth() === now.getMonth() &&
        taskDate.getFullYear() === now.getFullYear();
    } else if (filter === "yearly") {
      matchesFilter = taskDate.getFullYear() === now.getFullYear();
    } else {
      matchesFilter = true;
    }

    const matchesStatus =
      statusFilter === "all" || task.status.toLowerCase() === statusFilter;

    return matchesFilter && matchesStatus;
  });

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      {/* Filter Buttons */}
      <div className="mb-4">
        <div className="flex flex-wrap justify-between gap-4">
          {["weekly", "monthly", "yearly"].map((view) => (
            <button
              key={view}
              onClick={() => setFilter(view)}
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded ${
                filter === view
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} Tasks
            </button>
          ))}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value.toLowerCase())}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <tr
                  key={task.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{task.id}</td>
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">{task.status}</td>
                  <td className="px-6 py-4">{task.date}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No tasks found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 text-sm font-medium rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
