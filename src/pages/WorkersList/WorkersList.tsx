import React, { useContext, useState } from "react";
import "./WorkersList.scss";
import {
  WorkersListContext,
  WorkersContextType,
} from "../../context/WorkersListContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

  if (!workersContext) {
    return <div>Loading...</div>;
  }

  const { workers } = workersContext;

  return (
    <div>
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
        <Card className="mt-4">
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
