import React, { useContext, useEffect, useState } from "react";
import "./Workers-list.scss";
import trash2 from "react-useanimations/lib/trash2";
import { SortKeys, Workers, WorkersContextType } from "../../types";
import { WorkersListContext } from "../../context/WorkersListContext";
import UniversalButton from "../../components/UniversalButton/UniversalButton";
import UseAnimations from "react-useanimations";
import { ModalDialogScrollable } from "../../components/ModalDialogScrollable/ModalDialogScrollable";
import { AlertSuccess } from "../../components/AlertSuccess/AlertSuccess";



export const WorkersList: React.FC = () => {
  const workersContext = useContext<WorkersContextType | undefined>(
    WorkersListContext
  );
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorker, setEditedWorker] = useState<Workers | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState<Workers | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Workers | null>(null);
  const [sortColumn, setSortColumn] = useState<SortKeys>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const isDisabled =
    !workersContext ||
    workersContext.pageNumber >= (workersContext.maxPage || 1);

  const handleDetailsClick = (worker: Workers) => {
    setSelectedWorker(worker);
    setEditedWorker({ ...worker });
  };

  const handleCloseDetails = () => {
    setSelectedWorker(null);
  };

  const handleEdit = (worker: Workers) => {
    setIsEditing(true);
    setEditedWorker({ ...worker });
  };

  const handleSort = (column: SortKeys) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSave = () => {
    if (editedWorker && workersContext) {
      workersContext.editWorker(editedWorker);
      setSelectedWorker(editedWorker);
      setIsEditing(false);
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
      setSelectedWorker(null);
    }
  };

  const handleLoadMore = () => {
    if (workersContext && workersContext.pageNumber < workersContext.maxPage) {
      workersContext.setPageNumber((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showSuccessAlert) {
      timeoutId = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [showSuccessAlert]);

  const renderField =
    (field: keyof Workers) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isEditingField =
        isEditing && editedWorker && editedWorker.id === selectedWorker?.id;

      if (isEditingField && editedWorker) {
        setEditedWorker({ ...editedWorker, [field]: event.target.value });
      }
    };

  const handleFilterAndSort = () => {
    if (workersContext) {
      let filteredAndSortedWorkers = [...workersContext.workers];

      filteredAndSortedWorkers.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (sortOrder === "asc") {
          return String(columnA).localeCompare(String(columnB), undefined, {
            numeric: true,
          });
        } else {
          return String(columnB).localeCompare(String(columnA), undefined, {
            numeric: true,
          });
        }
      });

      filteredAndSortedWorkers = filteredAndSortedWorkers.filter(
        (worker) =>
          worker.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          worker.lastName.toLowerCase().includes(searchText.toLowerCase())
      );

      return filteredAndSortedWorkers;
    }

    return [];
  };

  const workersToDisplay = handleFilterAndSort();

  return (
    <div className="workers-container bg-gray-200 p-4 dark:bg-slate-600">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Find Workers</h1>
        <UniversalButton
          type="link"
          action="/add-worker"
          title="Add worker"
          classes="bg-green-600 text-white px-3 py-1 mt-0 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={searchText ? "" : "Search for a worker..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded p-2 w-full dark:bg-slate-300"
        />
        {searchText && (
          <p className="text-center mt-2">Searching for workers...</p>
        )}
      </div>
      <div className="WorkersList">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 dark:bg-slate-600 dark:text-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th onClick={() => handleSort("id")}>
                  #
                  {sortColumn === "id" && sortOrder === "asc" ? (
                    <span className="up-arrow">▲</span>
                  ) : (
                    <span className="down-arrow">▼</span>
                  )}
                </th>
                <th onClick={() => handleSort("firstName")}>
                  Name
                  {sortColumn === "firstName" && sortOrder === "asc" ? (
                    <span className="up-arrow">▲</span>
                  ) : (
                    <span className="down-arrow">▼</span>
                  )}
                </th>
                <th onClick={() => handleSort("lastName")}>
                  Surname
                  {sortColumn === "lastName" && sortOrder === "asc" ? (
                    <span className="up-arrow">▲</span>
                  ) : (
                    <span className="down-arrow">▼</span>
                  )}
                </th>
                <th onClick={() => handleSort("salary")}>
                  Salary
                  {sortColumn === "salary" && sortOrder === "asc" ? (
                    <span className="up-arrow">▲</span>
                  ) : (
                    <span className="down-arrow">▼</span>
                  )}
                </th>
                <th onClick={() => handleSort("statusOfWork")}>
                  Status
                  {sortColumn === "statusOfWork" && sortOrder === "asc" ? (
                    <span className="up-arrow">▲</span>
                  ) : (
                    <span className="down-arrow">▼</span>
                  )}
                </th>
                <th className="py-2 px-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {workersToDisplay.map((worker) => (
                <tr key={worker.id}>
                  <td className="py-2 px-4 text-center">{worker.id}</td>
                  <td className="py-2 px-4 text-center">{worker.firstName}</td>
                  <td className="py-2 px-4 text-center">{worker.lastName}</td>
                  <td className="py-2 px-4 text-center">{worker.salary} zł</td>
                  <td className="py-2 px-4 text-center">
                    {worker.statusOfWork}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <UniversalButton
                      type="button"
                      action={() => handleDetailsClick(worker)}
                      title="Details"
                      classes="bg-blue-500 text-white py-2 px-4 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <UniversalButton
            type="button"
            action={handleLoadMore}
            title={isDisabled ? "No more data" : "Load more..."}
            classes="bg-blue-500 mt-5 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            isDisabled={isDisabled}
          />
        </div>

        {/* MODAL WINDOW  */}

        {selectedWorker && (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-800 text-white px-4 py-2">
                  <h3 className="text-lg font-medium">Details of worker</h3>
                </div>
                <div className="px-4 py-4">
                  <div className="flex flex-col items-start">
                    <table className="datails-of-worker">
                      <tbody>
                        <tr>
                          <td>ID:</td>
                          <td>
                            <input className="px-2" readOnly value={selectedWorker.id} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="input-name">Name:</label>
                          </td>
                          <td>
                            <input
                              id="input-name"
                              type="text"
                              value={editedWorker ? editedWorker.firstName : ""}
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField(
                                "firstName"
                              )}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="sureName">Sure name:</label>
                          </td>
                          <td>
                            <input
                              id="sureName"
                              type="text"
                              value={editedWorker ? editedWorker.lastName : ""}
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("lastName")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="DateOfBirth">Date of birth:</label>
                          </td>
                          <td>
                            <input
                              id="DateOfBirth"
                              type="text"
                              value={
                                editedWorker ? editedWorker.dateOfBirth : ""
                              }
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              
                              onChange={renderField("dateOfBirth")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="street">Street:</label>
                          </td>
                          <td>
                            <input
                              id="street"
                              type="text"
                              value={editedWorker ? editedWorker.street : ""}
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("street")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="city">City:</label>
                          </td>
                          <td>
                            <input
                              id="city"
                              type="text"
                              value={editedWorker ? editedWorker.city : ""}
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("city")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="postCode">Post code:</label>
                          </td>
                          <td>
                            <input
                              id="postCode"
                              type="text"
                              value={editedWorker ? editedWorker.postCode : ""}
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("postCode")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="salary">Salary:</label>
                          </td>
                          <td>
                            <input
                              id="salary"
                              type="text"
                              value={
                                editedWorker ? `${editedWorker.salary}` : ""
                              }
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("salary")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="statusOfWork">
                              Status of work:
                            </label>
                          </td>
                          <td>
                            <input
                              id="statusOfWork"
                              type="text"
                              value={
                                editedWorker ? editedWorker.statusOfWork : ""
                              }
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("statusOfWork")}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="phone">Phone:</label>
                          </td>
                          <td>
                            <input
                              id="phone"
                              type="text"
                              value={editedWorker ? editedWorker.phone : ""}
                              className={`px-2 ${
                                isEditing ? "input-editing" : ""
                              }`}
                              onChange={renderField("phone")}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="btns-wrapper flex justify-between w-full">
                      <UniversalButton
                        type="button"
                        action={() => {
                          if (isEditing) {
                            handleSave();
                          } else {
                            handleEdit(selectedWorker);
                          }
                          setIsEditing(!isEditing);
                        }}
                        title={isEditing ? "Save" : "Edit"}
                        classes={`mr-2 ${
                          isEditing ? "btn-save" : "btn-edit"
                        } text-white rounded-md`}
                      />

                      <div className="cursor-pointer">
                        <UseAnimations
                          animation={trash2}
                          size={40}
                          onClick={() => handleDelete(selectedWorker)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 text-center py-2">
                  <UniversalButton
                    type="button"
                    action={handleCloseDetails}
                    title="Close"
                    classes="bg-blue-500 text-white py-2 px-4 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* THE END OF MODAL WINDOW  */}

      {showSuccessAlert && <AlertSuccess />}

      {showDeleteAlert && (
        <ModalDialogScrollable
          name={selectedWorker?.firstName}
          surname={selectedWorker?.lastName}
          setShowDeleteAlert={setShowDeleteAlert}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default WorkersList;
