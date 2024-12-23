import React, { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import "jspdf-autotable";

const dummyTasks = [
  {
    id: 1,
    title: "Yearly Report Review",
    status: "Pending",
    date: "2024-01-15",
    assignees: ["Navneet", "Harshil"],
  },
  {
    id: 2,
    title: "Monthly Financial Update",
    status: "Completed",
    date: "2024-11-10",
    assignees: ["Sandeep"],
  },
  {
    id: 3,
    title: "Weekly Client Follow-Up",
    status: "In Progress",
    date: "2024-11-25",
    assignees: ["Saurav", "Neeraj"],
  },
  {
    id: 4,
    title: "Weekly Team Meeting",
    status: "Pending",
    date: "2024-11-26",
    assignees: ["Navneet", "Saurav"],
  },
  {
    id: 5,
    title: "Monthly Performance Review",
    status: "Completed",
    date: "2024-11-05",
    assignees: ["Harshil", "Neeraj"],
  },
  {
    id: 6,
    title: "Yearly Strategy Planning",
    status: "Pending",
    date: "2024-12-20",
    assignees: ["Sandeep", "Saurav"],
  },
  {
    id: 7,
    title: "Weekly Sales Analysis",
    status: "In Progress",
    date: "2024-11-27",
    assignees: ["Neeraj"],
  },
  {
    id: 8,
    title: "Weekly Task Delegation",
    status: "Pending",
    date: "2024-11-28",
    assignees: ["Navneet", "Harshil"],
  },
  {
    id: 9,
    title: "Monthly Project Update",
    status: "Completed",
    date: "2024-10-15",
    assignees: ["Sandeep"],
  },
  {
    id: 10,
    title: "Yearly System Audit",
    status: "Pending",
    date: "2024-12-15",
    assignees: ["Saurav", "Neeraj"],
  },
  {
    id: 11,
    title: "Monthly Newsletter Creation",
    status: "In Progress",
    date: "2024-11-20",
    assignees: ["Navneet", "Sandeep"],
  },
  {
    id: 12,
    title: "Weekly Social Media Review",
    status: "Pending",
    date: "2024-11-29",
    assignees: ["Harshil"],
  },
  {
    id: 13,
    title: "Yearly Budget Finalization",
    status: "Completed",
    date: "2024-01-10",
    assignees: ["Saurav", "Neeraj"],
  },
  {
    id: 14,
    title: "Monthly IT Infrastructure Check",
    status: "Pending",
    date: "2024-11-15",
    assignees: ["Harshil", "Sandeep"],
  },
  {
    id: 15,
    title: "Weekly Customer Support Training",
    status: "In Progress",
    date: "2024-11-30",
    assignees: ["Navneet", "Saurav"],
  },
];

const TaskTable = () => {
  const [filter, setFilter] = useState("weekly");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTask, setCurrentTask] = useState(null); // For editing assignees
  const [newAssignee, setNewAssignee] = useState("");

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

  const handleAssigneeUpdate = (task) => {
    setCurrentTask(task);
    setNewAssignee("");
  };

  const addAssignee = () => {
    if (newAssignee.trim()) {
      currentTask.assignees.push(newAssignee.trim());
      setCurrentTask(null);
    }
  };

  const removeAssignee = (name) => {
    currentTask.assignees = currentTask.assignees.filter(
      (assignee) => assignee !== name
    );
    setCurrentTask(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        {/* Filter Buttons */}
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

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Assignees</th>
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
                    {task.assignees.join(", ") || "None"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAssigneeUpdate(task)}
                      className="text-blue-600 hover:underline"
                    >
                      Update Assignees
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {currentTask && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">
            Update Assignees for &quot;{currentTask.title}&quot;
          </h3>
          <div>
            <input
              type="text"
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
              placeholder="Add new assignee"
            />
            <div className="flex justify-between gap-4">
              <button
                onClick={addAssignee}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Assignee
              </button>
              <button
                onClick={() => setCurrentTask(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4">
              {currentTask.assignees.map((assignee) => (
                <div
                  key={assignee}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{assignee}</span>
                  <button
                    onClick={() => removeAssignee(assignee)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskTable;
