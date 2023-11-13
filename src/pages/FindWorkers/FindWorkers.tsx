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
    <Container className="FindWorkers bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Find Workers</h1>
      <Form>
        <Form.Group as={Row}>
          <Col xs="9" sm="10">
            <Form.Control
              type="text"
              placeholder="Search for a worker..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border rounded p-2"
            />
          </Col>
          <Col xs="3" sm="2"></Col>
        </Form.Group>
      </Form>
      {workersContext && searchText && (
        <div className="overflow-x-auto">
          <Table striped bordered hover responsive className="table-auto w-full border mt-4">
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
                    <td className="border px-4 py-2">{worker.id}</td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "firstName", "First Name", "text")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "lastName", "Last Name", "text")}
                    </td>
                    <td className="border px-4 py-2">{worker.dateOfBirth}</td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "street", "Street", "text")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "city", "City", "text")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "postCode", "Post Code", "text")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "salary", "Salary", "number")}
                    </td>
                    <td className="border px-4 py-2">
                      {renderField(
                        worker,
                        "statusOfWork",
                        "Status of Work",
                        "text"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {renderField(worker, "phone", "Phone", "text")}
                    </td>
                    <td className="border px-4 py-2">
                      {isEditing &&
                      editedWorker &&
                      editedWorker.id === worker.id ? (
                        <Button
                          variant="primary"
                          onClick={handleSave}
                          className="mr-2 bg-blue-500 rounded-full"
                        >
                          Save
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleEdit(worker)}
                            className="mr-2 bg-green-500 rounded-full"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(worker)}
                            className="bg-red-500 rounded-full"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
            </Table>
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
            <Button
              onClick={() => setShowDeleteAlert(false)}
              variant="outline-success"
              className="rounded-full px-4 py-2 mr-2"
            >
              No
            </Button>
            <Button
              onClick={confirmDelete}
              variant="danger"
              className="rounded-full px-4 py-2"
            >
              Yes
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default FindWorkers;
