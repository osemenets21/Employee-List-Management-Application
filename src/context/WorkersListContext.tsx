import React, { useEffect, useState, createContext, ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export type Workers = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postCode: string;
  salary: number;
  statusOfWork: string;
  phone: string;
};

export type WorkersContextType = {
  workers: Workers[];
  setWorkers: React.Dispatch<React.SetStateAction<Workers[]>>;
  addWorker: (newWorker: Workers) => void;
  editWorker: (worker: Workers) => void;
  updatedWorker: Workers | null;
  deleteWorker: (workerId: number) => Promise<void>
};

export const WorkersListContext = createContext<WorkersContextType | undefined>(
  undefined
);

export type EditWorkersContextType = {
  editWorker: (worker: Workers) => void;
  updatedWorker: Workers | null;
  
};

export const WorkersListContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workers, setWorkers] = useState<Workers[]>([]);
  const [updatedWorker] = useState<Workers | null>(null);

  const getWorkers = async () => {
    try {
      const response = await fetch("http://localhost:5000/workerList");
      if (!response.ok) {
        throw new Error("Problem with the server");
      }

      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWorker = async (newWorkerData: Workers) => {
    try {
      const response = await fetch("http://localhost:5000/workerList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkerData),
      });

      if (!response.ok) {
        throw new Error("Problem with the server");
      }

      const newWorkerResponse = await response.json();
      setWorkers((prevWorkers) => [...prevWorkers, newWorkerResponse]);
    } catch (error) {
      console.log(error);
    }
  };

  const editWorker = async (updatedWorkerData: Workers) => {
    try {
      const response = await fetch(
        `http://localhost:5000/workerList/${updatedWorkerData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWorkerData),
        }
      );

      if (!response.ok) {
        throw new Error("Problem with the server");
      }
      const updatedWorkerResponse = await response.json();
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker.id === updatedWorkerData.id ? updatedWorkerResponse : worker
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorker = async (workerId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/workerList/${workerId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Problem with the server");
      }

      setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.id !== workerId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <WorkersListContext.Provider
      value={{ workers, setWorkers, addWorker, editWorker, updatedWorker, deleteWorker }}
    >
      {children}
    </WorkersListContext.Provider>
  );
};
