import React, { useContext, useState } from "react";
import {
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
  const [filteredWorkers, setFilteredWorkers] = useState(
    workersContext?.workers || []
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = () => {
    if (workersContext) {
      const filtered = workersContext.workers.filter((worker) => {
        const values = Object.values(worker).map((value) =>
          value.toString().toLowerCase()
        );
        return values.some((value) => value.includes(searchText.toLowerCase()));
      });
      setFilteredWorkers(filtered);
      setIsEditing(filtered.length > 0); 
    }
  };

  const handleDelete = (id: number) => {
    if (workersContext) {
      workersContext.setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.id !== id)
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
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
      {isEditing ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
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
            {filteredWorkers.map((worker) => (
              <tr key={worker.id}>
                <td>
                  <input type="text" value={worker.firstName} />
                </td>
                <td>
                  <input type="text" value={worker.lastName} />
                </td>
                <td>
                  <input type="text" value={worker.street} />
                </td>
                <td>
                  <input type="text" value={worker.city} />
                </td>
                <td>
                  <input type="text" value={worker.postCode} />
                </td>
                <td>
                  <input type="text" value={worker.salary} />
                </td>
                <td>
                  <input type="text" value={worker.statusOfWork} />
                </td>
                <td>
                  <input type="text" value={worker.phone} />
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(worker.id)}>
                    Delete
                  </Button>
                  <Button variant="success" >
                    Save
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
      {filteredWorkers.length > 0 && isEditing && (
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default FindWorkers;
