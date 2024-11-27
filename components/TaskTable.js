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
];

const TaskTable = () => {
  const [filter, setFilter] = useState("weekly");
  const filteredTasks = dummyTasks.filter((task) => {
    const taskDate = new Date(task.date); 
    const now = new Date();

    if (filter === "weekly") {
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay())); 
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); 
      return taskDate >= weekStart && taskDate <= weekEnd;
    } else if (filter === "monthly") {
      return (
        taskDate.getMonth() === now.getMonth() &&
        taskDate.getFullYear() === now.getFullYear()
      );
    } else if (filter === "yearly") {
      return taskDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-center mb-4">
        {["weekly", "monthly", "yearly"].map((view) => (
          <button
            key={view}
            onClick={() => setFilter(view)}
            className={`px-4 py-2 mx-1 text-sm font-medium rounded ${
              filter === view
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)} Tasks
          </button>
        ))}
      </div>

      {/* Task Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {task.id}
                </td>
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">{task.date}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
                No tasks found for {filter} view.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
