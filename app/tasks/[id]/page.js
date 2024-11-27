'use client'; // Marks this file as a Client Component
import TaskForm from "@/components/TaskForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateTaskPage = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const router = useRouter();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        // Simulate fetching task data
        const data = { id, title: "Task 1", status: "Pending" };
        setTask(data);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = (updatedTask) => {
    console.log("Task updated:", { id, ...updatedTask });
    router.push("/tasks"); // Navigate back to the tasks list
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Update Task</h1>
      <TaskForm initialData={task} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateTaskPage;
