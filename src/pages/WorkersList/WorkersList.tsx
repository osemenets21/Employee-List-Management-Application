import React, { useContext, useState } from "react";
import "./WorkersList.scss";
import {
  WorkersListContext,
  WorkersContextType,
} from "../../context/WorkersListContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const WorkersList = () => {
  const workersContext = useContext<WorkersContextType | undefined>(
    WorkersListContext
  );
  const [selectedWorker, setSelectedWorker] = useState<any | null>(null);

  const handleDetailsClick = (worker: any) => {
    setSelectedWorker(worker);
  };

  const handleCloseDetails = () => {
    setSelectedWorker(null);
  };

  const navigate = useNavigate();

  if (!workersContext) {
    return <div>Loading...</div>;
  }

  if (!workersContext) {
    return <div>Loading...</div>;
  }

  const { workers } = workersContext;

  const handleAddWorkerClick = () => {
    navigate("/add-worker");
  };

  return (
    <div className="WorkersList">
      <Button variant="primary" type="button" onClick={handleAddWorkerClick}>
        Add Worker
      </Button>
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
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td className="py-2 px-4 text-center">{worker.id}</td>
                <td className="py-2 px-4 text-center">{worker.firstName}</td>
                <td className="py-2 px-4 text-center">{worker.lastName}</td>
                <td className="py-2 px-4 text-center">{worker.salary} zł</td>
                <td className="py-2 px-4 text-center">{worker.statusOfWork}</td>
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
            <p>ID: {selectedWorker.id}</p>
            <p>Imię: {selectedWorker.firstName}</p>
            <p>Nazwisko: {selectedWorker.lastName}</p>
            <p>Data urodzenia: {selectedWorker.dateOfBirth}</p>
            <p>Ulica: {selectedWorker.street}</p>
            <p>Miasto: {selectedWorker.city}</p>
            <p>Kod pocztowy: {selectedWorker.postCode}</p>
            <p>Pensja: {selectedWorker.salary} zł</p>
            <p>Status pracy: {selectedWorker.statusOfWork}</p>
            <p>Telefon: {selectedWorker.phone}</p>
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
  );
};
