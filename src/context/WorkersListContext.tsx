import React, {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useCallback,
} from "react";
import { Workers, WorkersContextType } from "../types";

export const WorkersListContext = createContext<WorkersContextType | undefined>(
    undefined
);

export const WorkersListContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workers, setWorkers] = useState<Workers[]>([]);
  const [updatedWorker] = useState<Workers | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(0);
  
  const getWorkers = useCallback(async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/workerList?_page=${page}&_limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Problem z serwerem");
      }
      
      const data = await response.json();
      setWorkers((prevWorkers) => [...prevWorkers, ...data]);

      const count = response.headers.get("X-Total-Count");
      
      if (count) setMaxPage(Math.ceil(Number(count) / limit));

      
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addWorker = async (newWorkerData: Workers) => {
    try {
        console.log(newWorkerData);
        
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
        await getWorkers(pageNumber, 10);
      } catch (error) {
        console.error("Błąd podczas pobierania pracowników:", error);
      }
    };

    

    fetchData();
  }, [getWorkers, pageNumber]);

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
        maxPage,
        setPageNumber
      }}
    >
      {children}
    </WorkersListContext.Provider>
  );
};
