import React, { useContext, useState } from "react";
import {
  Workers,
  WorkersContextType,
  WorkersListContext,
} from "../../context/WorkersListContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
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

  const handleEdit = (worker: Workers) => {
    setIsEditing(true);
    setEditedWorker({ ...worker });
  };

  const handleSave = () => {
    if (editedWorker && workersContext) {
      workersContext.editWorker(editedWorker);
      setIsEditing(false); 
      setEditedWorker(null); 
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

  const renderField = (
    worker: Workers,
    field: keyof Workers,
    label: string,
    type: string
  ) => {
    const isEditingField =
      isEditing && editedWorker && editedWorker.id === worker.id;

    return isEditingField ? (
      <Form.Control
        as="textarea"
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
    <Container className="FindWorkers">
      <h1>Find Workers</h1>
      <Form>
        <Form.Group as={Row}>
          <Col xs="9" sm="10">
            <Form.Control
              type="text"
              placeholder="Search for a worker..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs="3" sm="2"></Col>
        </Form.Group>
      </Form>
      {workersContext && searchText && (
        <Table striped bordered hover responsive className="expanded-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>Post Code</th>
              <th>Salary</th>
              <th>Status of Work</th>
              <th>Phone</th>
              <th>Actions</th>
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
                <tr key={worker.id}>
                  <td>
                    {renderField(worker, "firstName", "First Name", "text")}
                  </td>
                  <td>
                    {renderField(worker, "lastName", "Last Name", "text")}
                  </td>
                  <td>{worker.dateOfBirth}</td>
                  <td>{renderField(worker, "street", "Street", "text")}</td>
                  <td>{renderField(worker, "city", "City", "text")}</td>
                  <td>
                    {renderField(worker, "postCode", "Post Code", "text")}
                  </td>
                  <td>{renderField(worker, "salary", "Salary", "number")}</td>
                  <td>
                    {renderField(
                      worker,
                      "statusOfWork",
                      "Status of Work",
                      "text"
                    )}
                  </td>
                  <td>{renderField(worker, "phone", "Phone", "text")}</td>
                  <td>
                    {isEditing &&
                    editedWorker &&
                    editedWorker.id === worker.id ? (
                      <Button variant="success" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(worker)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(worker)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <Alert show={showDeleteAlert} variant="danger">
        <Alert.Heading>Confirmation</Alert.Heading>
        <p>
          Czy na pewno chcesz usunąć pracownika {workerToDelete?.firstName}{" "}
          {workerToDelete?.lastName}?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => setShowDeleteAlert(false)}
            variant="outline-success"
          >
            Nie
          </Button>
          <Button onClick={confirmDelete} variant="danger">
            Tak
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default FindWorkers;
