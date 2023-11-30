import React, { useContext, useEffect, useCallback, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { WorkersListContext } from "../../context/WorkersListContext";
import { Workers, WorkersContextType } from "../../types";
import "./AddWorker.scss";
import UniversalButton from "../../components/UniversalButton/UniversalButton";
import { AlertSuccess } from "../../components/AlertSuccess/AlertSuccess";
const { v4: uuidv4 } = require("uuid");

export const AddWorker = () => {
  const { addWorker } = useContext(WorkersListContext) as WorkersContextType;
  const { handleSubmit, control, reset } = useForm<Workers>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
//   const [isDiasabled, setIsDisabled] = useState<boolean>(true);
  

  const onSubmit: SubmitHandler<Workers> = (data) => {
    const newId = uuidv4();
    if (!data.statusOfWork) {
      alert("Будь ласка, оберіть статус праці");
      return;
    }

    const newWorker = { ...data, id: newId };
    console.log(newWorker);
    

    addWorker(newWorker);


    reset();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };



  return (
    <div className="add-page dark:bg-slate-600">
      {showAlert && <AlertSuccess title={"Працівника успішно додано!"} />}
      <div className="form-container">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Add new employee
        </h2>
        <form
          name="AddNewWorker"
          className="add-form w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:putline-none focus:bg-white"
                placeholder="Ім'я"
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:putline-none focus:bg-white"
                placeholder="Прізвище"
              />
            )}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
                placeholder="Дата народження"
              />
            )}
          />

          <Controller
            name="street"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Вулиця"
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Місто"
              />
            )}
          />

          <Controller
            name="postCode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Поштовий індекс"
              />
            )}
          />

          <Controller
            name="salary"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Зарплата"
              />
            )}
          />

          <Controller
            name="statusOfWork"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Статус роботи"
              >
                <option value="" disabled>
                  Виберіть статус роботи...
                </option>
                <option value="Employed">Employee</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Maternity-leave">Maternity-leave</option>
                <option value="Fired">Fired</option>
                <option value="On-vacation">On vacation</option>
              </select>
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border-gray-200 rounder py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="Номер телефону"
              />
            )}
          />

          <div className="w-full mb-6 md:mb-0">
            <UniversalButton
              type="submit"
              title="Додати нового працівника"
              classes={"btn-submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
