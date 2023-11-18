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
  const [selectedWorker, setSelectedWorker] = useState<Workers | null>(null);

  const handleDetailsClick = (worker: Workers) => {
    setSelectedWorker(worker);
  };

  const handleCloseDetails = () => {
    setSelectedWorker(null);
  };

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

  const filteredWorkers = workersContext?.workers.filter(
    (worker) =>
      worker.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

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
          <p className="text-center mt-2">Searching for workers...</p>
        )}
      </div>
      <div className="WorkersList">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-center">#</th>
                <th className="py-2 px-4 text-center">Imię</th>
                <th className="py-2 px-4 text-center">Nazwisko</th>
                <th className="py-2 px-4 text-center">Pensja</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4 text-center">Szczegóły</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers?.map((worker) => (
                <tr key={worker.id}>
                  <td className="py-2 px-4 text-center">{worker.id}</td>
                  <td className="py-2 px-4 text-center">{worker.firstName}</td>
                  <td className="py-2 px-4 text-center">{worker.lastName}</td>
                  <td className="py-2 px-4 text-center">{worker.salary} zł</td>
                  <td className="py-2 px-4 text-center">
                    {worker.statusOfWork}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => handleDetailsClick(worker)}
                    >
                      Szczegóły
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedWorker && (
          <div className="mt-4 p-4 bg-white border border-gray-300 text-center">
            {/* ... (details for selected worker) */}
          </div>
        )}
      </div>
      {workersContext && searchText && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            {/* ... (filtered workers table) */}
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
          {/* ... (delete alert) */}
        </div>
      )}
    </div>
  );
};

export default FindWorkers;
