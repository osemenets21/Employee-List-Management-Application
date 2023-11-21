import React, { useContext, useEffect, useState } from "react";
import { Workers } from "../../context/WorkersListContext";

interface TableComponentProps {
  workers: Workers[];
  handleDetailsClick: (worker: Workers) => void;
  filterWorkers: (searchText: string) => Workers[] | undefined;
}

const TableComponent: React.FC<TableComponentProps> = ({
  handleDetailsClick,
  filterWorkers,
}) => {
  const filteredWorkers = filterWorkers("");

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-2 px-4 text-center">#</th>
          <th className="py-2 px-4 text-center">Name</th>
          <th className="py-2 px-4 text-center">Surname</th>
          <th className="py-2 px-4 text-center">Salary</th>
          <th className="py-2 px-4 text-center">Status</th>
          <th className="py-2 px-4 text-center">Details</th>
        </tr>
      </thead>
      <tbody>
        {(filteredWorkers || []).map((worker) => (
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
                Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
