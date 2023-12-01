import React from "react";
import UniversalButton from "../UniversalButton/UniversalButton";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import { ModalDetailsProps } from "../../types";
import './ModalDetails.scss';

export const ModalDetails = ({
  selectedWorker,
  editedWorker,
  isEditing,
  renderField,
  handleSave,
  handleEdit,
  setIsEditing,
  handleDelete,
  handleCloseDetails,
}: ModalDetailsProps) => {
  return (
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
                      <input
                        className="px-2"
                        readOnly
                        value={selectedWorker.id}
                      />
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
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
                        onChange={renderField("firstName")}
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
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
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
                          editedWorker &&
                          editedWorker.dateOfBirth instanceof Date
                            ? editedWorker.dateOfBirth
                                .toISOString()
                                .split("T")[0]
                            : editedWorker &&
                              typeof editedWorker.dateOfBirth === "string"
                            ? editedWorker.dateOfBirth
                            : new Date().toISOString().split("T")[0]
                        }
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
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
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
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
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
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
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
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
                        value={editedWorker ? `${editedWorker.salary}` : ""}
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
                        onChange={renderField("salary")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="statusOfWork">Status of work:</label>
                    </td>
                    <td>
                      <input
                        id="statusOfWork"
                        type="text"
                        value={editedWorker ? editedWorker.statusOfWork : ""}
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
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
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
                        onChange={renderField("phone")}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="employment">Employment:</label>
                    </td>
                    <td>
                    <input
                        id="employment"
                        type="text"
                        value={
                          editedWorker &&
                          editedWorker.dateOfEmployment instanceof Date
                            ? editedWorker.dateOfEmployment
                                .toISOString()
                                .split("T")[0]
                            : editedWorker &&
                              typeof editedWorker.dateOfEmployment === "string"
                            ? editedWorker.dateOfEmployment
                            : new Date().toISOString().split("T")[0]
                        }
                        className={`px-2 ${isEditing ? "input-editing" : ""}`}
                        onChange={renderField("dateOfEmployment")}
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
  );
};
