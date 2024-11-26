import { useState } from "react";

const TaskForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [status, setStatus] = useState(initialData.status || "Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
