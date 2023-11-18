import React, { useContext, useState } from "react";
import "./WorkersList.scss";
import {
  WorkersListContext,
  WorkersContextType,
} from "../../context/WorkersListContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Pensja</th>
            <th>Status</th>
            <th>Szczegóły</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.salary} zł</td>
              <td>{worker.statusOfWork}</td>
              <td>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => handleDetailsClick(worker)}
                >
                  Szczegóły
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedWorker && (
        <Card className="Card mt-4">
          <Card.Body>
            <Card.Title>Szczegóły Pracownika</Card.Title>
            <Card.Text>
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
              <Button
                variant="danger"
                type="button"
                onClick={handleCloseDetails}
              >
                Zamknij
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
