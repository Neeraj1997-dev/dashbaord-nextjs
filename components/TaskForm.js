import { useState } from "react";
import Select from "react-select";

const TaskForm = ({ initialData = {}, onSubmit, availableAssignees = [] }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [date, setDate] = useState(initialData.date || "");
  const [status, setStatus] = useState(initialData.status || "Pending");
  const [assignees, setAssignees] = useState(initialData.assignees || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, date, status, assignees });
  };

  const handleAssigneeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setAssignees(selectedOptions);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg"
    >
      {/* Task Title */}
      <div>
        <label className="block text-gray-700 text-sm mb-2">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          required
        />
      </div>

      {/* Task Description */}
      <div>
        <label className="block text-gray-700 text-sm mb-2">Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          rows="4"
          placeholder="Enter task details..."
          required
        />
      </div>

      {/* Task Date */}
      <div>
        <label className="block text-gray-700 text-sm mb-2">Task Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          required
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-gray-700 text-sm mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Assignees */}
      {/* <div>
        <label className="block text-gray-700 text-sm mb-2">Assignees</label>
        <select
          multiple
          value={assignees}
          onChange={handleAssigneeChange}
          className="w-full border border-gray-300 rounded-md p-2 text-sm sm:text-base"
          style={{
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {availableAssignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Hold <kbd className="font-mono bg-gray-200 px-1 rounded">Ctrl</kbd>{" "}
          (or <kbd className="font-mono bg-gray-200 px-1 rounded">Cmd</kbd> on
          Mac) to select multiple.
        </p>
      </div> */}

      <div>
        <label className="block text-gray-700 text-sm mb-2">Assignees</label>
        <Select
          isMulti
          value={assignees}
          options={availableAssignees.map((assignee) => ({
            value: assignee,
            label: assignee,
          }))}
          onChange={(selected) => setAssignees(selected)}
          className="text-sm sm:text-base"
        />
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
