import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from "react";

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
  deleteWorker: (workerId: number) => Promise<void>;
  pageNumber: number;
  getWorkers: (page: number, limit?: number) => Promise<void>;
  hasMoreWorkers: boolean;
  setHasMoreWorkers: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkersListContext = createContext<WorkersContextType | undefined>(
  undefined
);

export type EditWorkersContextType = {
  editWorker: (worker: Workers) => void;
  updatedWorker: Workers | null;
};

export const WorkersListContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workers, setWorkers] = useState<Workers[]>([]);
  const [updatedWorker] = useState<Workers | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [perPage] = useState<number>(10);
const [hasMoreWorkers, setHasMoreWorkers] = useState<boolean>(true);

const getWorkers = useCallback(
  async (page: number, limit?: number): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:5000/workerList?_page=${page}&_limit=${
          limit || perPage
        }`
      );
      if (!response.ok) {
        throw new Error("Problem z serwerem");
      }

      const data = await response.json();
      setWorkers(data);
      setPageNumber(page + 1);
      setHasMoreWorkers(data.length > 0);
    } catch (error) {
      console.log(error);
      setHasMoreWorkers(false);
    }
  },
  [setPageNumber, setWorkers, perPage]
);

  

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
  const fetchData = async () => {
    try {
      await getWorkers(1); // Fetch the first page with the default limit (10 workers)
      setPageNumber(2);
    } catch (error) {
      console.error("Błąd podczas pobierania pracowników:", error);
    }
  };

  fetchData();
}, [getWorkers]);

  return (
    <WorkersListContext.Provider
      value={{
        workers,
        setWorkers,
        addWorker,
        editWorker,
        updatedWorker,
        deleteWorker,
        pageNumber,
        getWorkers,
        hasMoreWorkers,
        setHasMoreWorkers
      }}
    >
      {children}
    </WorkersListContext.Provider>
  );
};
