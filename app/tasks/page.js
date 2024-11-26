"use client";

import TaskTable from "@/components/TaskTable";
import { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = [
        { id: 1, title: "Task 1", status: "Pending" },
        { id: 2, title: "Task 2", status: "Completed" },
      ];
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <div className="flex justify-end mb-4">
        <Link
          href="/tasks/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create Task
        </Link>
      </div>
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default Page;
