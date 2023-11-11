import React, { useState, useContext } from "react";
import { WorkersListContext } from "../../context/WorkersListContext";
import { WorkersContextType } from "../../context/WorkersListContext";

export const AddWorker = () => {
  const { addWorker } = useContext(WorkersListContext) as WorkersContextType;
  const [nextId, setNextId] = useState(1);
  const [newWorker, setNewWorker] = useState({
    id: nextId,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    street: "",
    city: "",
    postCode: "",
    salary: 0,
    statusOfWork: "",
    phone: "",
  });

  const handleAddWorker = () => {
    if (newWorker.firstName.trim() === "" || newWorker.lastName.trim() === "") {
      alert("First name and last name cannot be empty");
      return;
    }

    addWorker(newWorker);
    setNextId(nextId + 1);
    setNewWorker({
      id: nextId + 1,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      street: "",
      city: "",
      postCode: "",
      salary: 0,
      statusOfWork: "",
      phone: "",
    });
  };

  return (
    <div>
      <h2>Add new worker</h2>
      <form>
        <div>
          <label>ID:</label>
          <input type="text" value={newWorker.id} readOnly />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={newWorker.firstName}
            onChange={(e) =>
              setNewWorker({ ...newWorker, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={newWorker.lastName}
            onChange={(e) =>
              setNewWorker({ ...newWorker, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Date of birth:</label>
          <input
            type="text"
            value={newWorker.dateOfBirth}
            onChange={(e) =>
              setNewWorker({ ...newWorker, dateOfBirth: e.target.value })
            }
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            type="text"
            value={newWorker.street}
            onChange={(e) =>
              setNewWorker({ ...newWorker, street: e.target.value })
            }
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={newWorker.city}
            onChange={(e) =>
              setNewWorker({ ...newWorker, city: e.target.value })
            }
          />
        </div>
        <div>
          <label>Post Code:</label>
          <input
            type="text"
            value={newWorker.postCode}
            onChange={(e) =>
              setNewWorker({ ...newWorker, postCode: e.target.value })
            }
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            value={newWorker.salary}
            onChange={(e) =>
              setNewWorker({ ...newWorker, salary: parseFloat(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Status of Work:</label>
          <input
            type="text"
            value={newWorker.statusOfWork}
            onChange={(e) =>
              setNewWorker({ ...newWorker, statusOfWork: e.target.value })
            }
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={newWorker.phone}
            onChange={(e) =>
              setNewWorker({ ...newWorker, phone: e.target.value })
            }
          />
        </div>
        <button className="btn-submit" type="button" onClick={handleAddWorker}>
          Add new worker
        </button>
      </form>
    </div>
  );
};
