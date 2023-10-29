import React, { useEffect, useState, createContext } from "react";

export type Props = {
  children: JSX.Element;
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
};

export const WorkersListContext = createContext<WorkersContextType | undefined>(
  undefined
);

export const WorkersListContextProvider: React.FC<Props> = ({
  children,
}: Props) => {
  const [workers, setWorkers] = useState<Workers[]>([]);

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

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <WorkersListContext.Provider value={{ workers, setWorkers }}>
      {children}
    </WorkersListContext.Provider>
  );
};
