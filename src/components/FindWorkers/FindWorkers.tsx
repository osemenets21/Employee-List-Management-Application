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
            <h2 className="text-xl font-semibold text-gray-800">
              Szczegóły Pracownika
            </h2>
            <div>
                <label htmlFor="worker-id">ID</label>
              <input type="text" id="worker-id" value={selectedWorker.id} />
              <p>ID: {selectedWorker.id}</p>
              <p>Name: {selectedWorker.firstName}</p>
              <p>Sure name: {selectedWorker.lastName}</p>
              <p>Date of birgth: {selectedWorker.dateOfBirth}</p>
              <p>Street: {selectedWorker.street}</p>
              <p>City: {selectedWorker.city}</p>
              <p>Zip-code: {selectedWorker.postCode}</p>
              <p>Salary: {selectedWorker.salary} zł</p>
              <p>Status of work: {selectedWorker.statusOfWork}</p>
              <p>Phone: {selectedWorker.phone}</p>

              {isEditing &&
                editedWorker &&
                editedWorker.id === selectedWorker.id && (
                  <button
                    onClick={handleSave}
                    className="mr-2 bg-blue-500 text-white py-1 px-2 rounded-full"
                  >
                    Save
                  </button>
                )}

              <button
                onClick={() => handleEdit(selectedWorker)}
                className="mr-2 bg-green-500 text-white py-1 px-2 rounded-full"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(selectedWorker)}
                className="bg-red-500 text-white py-1 px-2 rounded-full"
              >
                Delete
              </button>

              <button
                className="bg-red-500 text-white py-2 px-4 rounded mt-2"
                onClick={handleCloseDetails}
              >
                Zamknij
              </button>
            </div>
          </div>
        )}
      </div>

      {showSuccessAlert && (
        <div className="bg-green-500 text-white p-4 mb-4 rounded-md">
          Data updated successfully!
        </div>
      )}
      {showDeleteAlert && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
          <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
            <p className="mb-2">
              Are you sure you want to delete this employee?
            </p>
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
        </div>
      )}
    </div>
  );
};

export default FindWorkers;
