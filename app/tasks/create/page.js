'use client'; // Marks this file as a Client Component

import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/navigation";

const availableAssignees = ["Navneet", "Harshil", "Sandeep", "Saurav", "Neeraj"];

const CreateTaskPage = () => {
  const router = useRouter();

  const handleSubmit = (task) => {
    console.log("Task created:", task);
    router.push("/tasks");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
          Create Task
        </h1>
        <TaskForm
          onSubmit={handleSubmit}
          availableAssignees={availableAssignees}
        />
      </div>
    </div>
  );
};

export default CreateTaskPage;
