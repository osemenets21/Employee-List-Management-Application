import React, { useContext, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { WorkersListContext } from "../../context/WorkersListContext";
import { Workers, WorkersContextType } from "../../types";
import "./AddWorker.scss";
import UniversalButton from "../../components/UniversalButton/UniversalButton";
import { AlertSuccess } from "../../components/AlertSuccess/AlertSuccess";
import { addWorkerSchema } from "../../Validations/AddWorkerValidation";
import { yupResolver } from "@hookform/resolvers/yup";
const { v4: uuidv4 } = require("uuid");

export const AddWorker = () => {
  const { addWorker } = useContext(WorkersListContext) as WorkersContextType;

  const { handleSubmit, control, reset } = useForm<Workers>({
    resolver: yupResolver(addWorkerSchema),
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Workers> = async (data) => {
    const newId = uuidv4();

    let formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      street: data.street,
      city: data.city,
      postCode: data.postCode,
      salary: data.salary,
      statusOfWork: data.statusOfWork,
      phone: data.phone,
    };

    const isValid = await addWorkerSchema.isValid(formData);

    console.log(isValid);

    const newWorker = { ...data, id: newId };
    addWorker(newWorker);
    reset();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="add-page flex dark:bg-slate-600">
      {showAlert && <AlertSuccess title={"Employee successfully added!"} />}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Add new employee
        </h2>
        <form
          name="AddNewWorker"
          className="add-form flex flex-wrap justify-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="firstName" className="dark:text-white">First name</label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  id="firstName"
                  className="appearance-none block bg-gray-200 text-gray-700 border py-3 px-4 mr-5 leading-tight focus:putline-none focus:bg-white"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="surname" className="dark:text-white">Surname</label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  id="surname"
                  className="appearance-none block bg-gray-200 text-gray-700 border py-3 px-4 leading-tight focus:putline-none focus:bg-white"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="dark:text-white">Date of birth</label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 mr-5 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  id="dateOfBirth"
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : (field.value as string) || ""
                  }
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="street" className="dark:text-white">Street</label>
            <Controller
              name="street"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  id="street"
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="dark:text-white">City</label>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  id="city"
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounder py-3 mr-5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postCode" className="dark:text-white">Post code</label>
            <Controller
              name="postCode"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  id="postCode"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="dark:text-white">Salary</label>
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounder py-3 mr-5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  id="salary"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="statusOfWork" className="dark:text-white">Status of work</label>
            <Controller
              name="statusOfWork"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  id="statusOfWork"
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="" disabled>
                    Select the job status...
                  </option>
                  <option value="Employed">Employee</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Maternity-leave">Maternity-leave</option>
                  <option value="Fired">Fired</option>
                  <option value="On-vacation">On vacation</option>
                </select>
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="dark:text-white">Phone number</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounder py-3 mr-5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  id="phoneNumber"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfEmployment" className="dark:text-white">Date of employment</label>
            <Controller
              name="dateOfEmployment"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="appearance-none block bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  id="dateOfEmployment"
                  value={
                    field.value
                      ? typeof field.value === "string"
                        ? field.value
                        : new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                />
              )}
            />
          </div>

          <div className="w-full mb-6 md:mb-0">
            <UniversalButton
              type="submit"
              title="Add new employee"
              classes={"btn-submit mb-10 dark:bg-slate-800"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

