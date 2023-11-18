import React, { useContext, useEffect, useState } from "react";
import {
  Workers,
  WorkersContextType,
  WorkersListContext,
} from "../../context/WorkersListContext";
import "./FindWorkers.scss";

export const FindWorkers: React.FC = () => {
  const workersContext = useContext<WorkersContextType | undefined>(
    WorkersListContext
  );
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorker, setEditedWorker] = useState<Workers | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState<Workers | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleEdit = (worker: Workers) => {
    setIsEditing(true);
    setEditedWorker({ ...worker });
  };

  const handleSave = () => {
    if (editedWorker && workersContext) {
      workersContext.editWorker(editedWorker);
      setIsEditing(false);
      setEditedWorker(null);
      setShowSuccessAlert(true);
    }
  };

  const handleDelete = (worker: Workers) => {
    setWorkerToDelete(worker);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (workerToDelete && workersContext) {
      workersContext.deleteWorker(workerToDelete.id);
      setIsEditing(false);
      setEditedWorker(null);
      setShowDeleteAlert(false);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showSuccessAlert) {
      timeoutId = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [showSuccessAlert]);

  const renderField = (
    worker: Workers,
    field: keyof Workers,
    label: string,
    type: string
  ) => {
    const isEditingField =
      isEditing && editedWorker && editedWorker.id === worker.id;

    return isEditingField ? (
      <textarea
        rows={2}
        value={editedWorker ? editedWorker[field] : ""}
        onChange={(e) =>
          setEditedWorker({ ...editedWorker, [field]: e.target.value })
        }
        className="formControl"
      />
    ) : (
      worker[field].toString()
    );
  };

  return (
    <div className="FindWorkers bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Find Workers</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder={searchText ? "" : "Search for a worker..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded p-2 w-full"
        />
        {searchText && (
          <p className="text-center mt-2">Wyszukiwanie pracowników...</p>
        )}
      </div>
      {workersContext && searchText && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Date of Birth</th>
                <th className="border p-2">Street</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Post Code</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">Status of Work</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workersContext.workers
                .filter((worker) =>
                  Object.values(worker)
                    .map((value) => value.toString().toLowerCase())
                    .some((value) => value.includes(searchText.toLowerCase()))
                )
                .map((worker) => (
                  <tr key={worker.id} className="border">
                    <td className="border px-4 py-2"> {worker.id}</td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "firstName", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "lastName", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 hidden md:table-cell">
                      {worker.dateOfBirth}
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "street", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "city", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "postCode", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "salary", "", "number")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "statusOfWork", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2 md:table-cell">
                      <div className="md:inline">
                        {renderField(worker, "phone", "", "text")}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing &&
                        editedWorker &&
                        editedWorker.id === worker.id && (
                          <button
                            onClick={handleSave}
                            className="mr-2 bg-blue-500 text-white py-1 px-2 rounded-full"
                          >
                            Save
                          </button>
                        )}
                      {!isEditing && (
                        <>
                          <button
                            onClick={() => handleEdit(worker)}
                            className="mr-2 bg-green-500 text-white py-1 px-2 rounded-full"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(worker)}
                            className="bg-red-500 text-white py-1 px-2 rounded-full"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {showSuccessAlert && (
        <div className="bg-green-500 text-white p-4 mb-4 rounded-md">
          Data updated successfully!
        </div>
      )}
      {showDeleteAlert && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
          <p className="mb-2">Are you sure you want to delete this employee?</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowDeleteAlert(false)}
              className="text-white bg-green-500 py-1 px-2 rounded-full mr-2"
            >
              No
            </button>
            <button
              onClick={confirmDelete}
              className="text-white bg-red-500 py-1 px-2 rounded-full"
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindWorkers;
