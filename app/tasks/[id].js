import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateTaskPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const data = { id, title: "Task 1", status: "Pending" };
        setTask(data);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = (updatedTask) => {
    console.log("Task updated:", { id, ...updatedTask });
    router.push("/tasks");
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
