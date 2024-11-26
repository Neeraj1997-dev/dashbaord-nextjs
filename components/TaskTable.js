import Link from "next/link";

const TaskTable = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-4 border border-gray-700">ID</th>
            <th className="p-4 border border-gray-700">Title</th>
            <th className="p-4 border border-gray-700">Status</th>
            <th className="p-4 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {tasks.map((task) => (
            <tr key={task.id} className="border border-gray-700">
              <td className="p-4 text-center">{task.id}</td>
              <td className="p-4">{task.title}</td>
              <td className="p-4">{task.status}</td>
              <td className="p-4 flex justify-center space-x-3">
                <Link href={`/tasks/${task.id}`} className="text-blue-600">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
