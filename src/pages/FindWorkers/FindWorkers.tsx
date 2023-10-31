import React, { useContext, useState } from "react";
import {
  Workers,
  WorkersContextType,
  WorkersListContext,
} from "../../context/WorkersListContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export const FindWorkers: React.FC = () => {
  const workersContext = useContext<WorkersContextType | undefined>(
    WorkersListContext
  );
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorker, setEditedWorker] = useState<Workers | null>(null);

  const handleSearch = () => {
    setIsEditing(false); // Wyłącz tryb edycji
    setEditedWorker(null); // Wyczyść edytowanego pracownika
  };

  const handleEdit = (worker: Workers) => {
    setIsEditing(true);
    setEditedWorker({ ...worker }); // Skopiuj pracownika do edycji
  };

  const handleSave = () => {
    if (editedWorker && workersContext) {
      workersContext.editWorker(editedWorker);
      setIsEditing(false); // Wyłącz tryb edycji po zapisaniu
      setEditedWorker(null); // Wyczyść edytowanego pracownika
    }
  };

  return (
    <div>
      <h1>Find Workers</h1>
      <input
        type="text"
        placeholder="Search for a worker..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {workersContext && searchText && (
        <Table striped bordered hover>
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
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.firstName}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, firstName: e.target.value })
                        }
                      />
                    ) : (
                      worker.firstName
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.lastName}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, lastName: e.target.value })
                        }
                      />
                    ) : (
                      worker.lastName
                    )}
                  </td>
                  <td>{worker.dateOfBirth}</td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.street}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, street: e.target.value })
                        }
                      />
                    ) : (
                      worker.street
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.city}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, city: e.target.value })
                        }
                      />
                    ) : (
                      worker.city
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.postCode}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, postCode: e.target.value })
                        }
                      />
                    ) : (
                      worker.postCode
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.salary}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, salary: Number(e.target.value) })
                        }
                      />
                    ) : (
                      worker.salary
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.statusOfWork}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, statusOfWork: e.target.value })
                        }
                      />
                    ) : (
                      worker.statusOfWork
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <input
                        type="text"
                        value={editedWorker.phone}
                        onChange={(e) =>
                          setEditedWorker({ ...editedWorker, phone: e.target.value })
                        }
                      />
                    ) : (
                      worker.phone
                    )}
                  </td>
                  <td>
                    {isEditing && editedWorker && editedWorker.id === worker.id ? (
                      <Button variant="success" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleEdit(worker)}>
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FindWorkers;
