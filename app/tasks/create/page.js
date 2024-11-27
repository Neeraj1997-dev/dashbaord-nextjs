'use client'; // Marks this file as a Client Component

import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/navigation";

const CreateTaskPage = () => {
  const router = useRouter();

  const handleSubmit = (task) => {
    console.log("Task created:", task);
    router.push("/tasks");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTaskPage;
