import React, { useState, useContext } from "react";
import { WorkersListContext } from "../../context/WorkersListContext";
import { WorkersContextType } from "../../types";
import './AddWorker.scss';

export const AddWorker = () => {
  const { workers, addWorker } = useContext(WorkersListContext) as WorkersContextType;
  const [newWorker, setNewWorker] = useState({
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

    const newId = workers.length > 0 ? Math.max(...workers.map((worker) => worker.id)) + 1 : 1;

    addWorker({ ...newWorker, id: newId });
    setNewWorker({
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
    <div className="add-page">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add new worker form</h2>
      <form className="add-form w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">First Name:</label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:putline-none focus:bg-white"
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  value={newWorker.firstName}
                  onChange={(e) => setNewWorker({ ...newWorker, firstName: e.target.value })}
                />
                <p className="text-red-500 text-xs italic">Please fill out this fields</p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">Last Name:</label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:putline-none focus:bg-white"
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  value={newWorker.lastName}
                  onChange={(e) => setNewWorker({ ...newWorker, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date-of-birth">Date of birth:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="date-of-birth"
              type="text"
              placeholder="Enter date of birth..."
              value={newWorker.dateOfBirth}
              onChange={(e) => setNewWorker({ ...newWorker, dateOfBirth: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">Street:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="street"
              type="text"
              placeholder="Enter street..."
              value={newWorker.street}
              onChange={(e) => setNewWorker({ ...newWorker, street: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">City:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="city"
              type="text"
              placeholder="Enter city..."
              value={newWorker.city}
              onChange={(e) => setNewWorker({ ...newWorker, city: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="post-code">Post Code:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="post-code"
              type="text"
              placeholder="Enter post code..."
              value={newWorker.postCode}
              onChange={(e) => setNewWorker({ ...newWorker, postCode: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salary">Salary:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="salary"
              type="number"
              value={newWorker.salary}
              onChange={(e) => setNewWorker({ ...newWorker, salary: parseFloat(e.target.value) })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status-of-work">Status of Work:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="status-of-work"
              type="text"
              placeholder="Enter status of work..."
              value={newWorker.statusOfWork}
              onChange={(e) => setNewWorker({ ...newWorker, statusOfWork: e.target.value })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">Phone:</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="phone"
              type="text"
              placeholder="Enter phone number..."
              value={newWorker.phone}
              onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="w-full mb-6 md:mb-0">
          <button className="btn-submit" type="button" onClick={handleAddWorker}>
            Add new worker
          </button>
        </div>
      </form>
    </div>
  );
};