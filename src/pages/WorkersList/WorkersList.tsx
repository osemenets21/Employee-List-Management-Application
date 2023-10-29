import React, { useContext } from "react";
import "./WorkersList.scss";
import {
  WorkersListContext,
  WorkersContextType,
} from "../../context/WorkersListContext";

export const WorkersList = () => {
  const workersContext = useContext<WorkersContextType | undefined>(
    WorkersListContext
  );

  if (!workersContext) {
    return <div>Loading...</div>;
  }

  const { workers } = workersContext;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>Post Code</th>
            <th>Salary</th>
            <th>Status of Work</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.dateOfBirth}</td>
              <td>{worker.street}</td>
              <td>{worker.city}</td>
              <td>{worker.postCode}</td>
              <td>{worker.salary} zł</td>
              <td>{worker.statusOfWork}</td>
              <td>{worker.phone}</td>
              <td>
                <button type="button">DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
