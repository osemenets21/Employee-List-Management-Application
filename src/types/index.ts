import { ReactNode } from "react";

export interface IButtonProps {
  type: "button" | "link";
  action: (() => void) | string;
  title: string | JSX.Element;
  classes?: string;
  isDisabled?: boolean;
}

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
  maxPage: number;
  pageNumber: number;
  getWorkers: (page: number, limit: number) => Promise<void>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export type EditWorkersContextType = {
  editWorker: (worker: Workers) => void;
  updatedWorker: Workers | null;
};

export type ModalDialogScrollableProps = {
    name: string | undefined;
    surname: string | undefined;
    setShowDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
    confirmDelete: () => void;
};

export type SortKeys = keyof Workers;

export type ModalDetailsProps = {
    selectedWorker: Workers;
    editedWorker: Workers | null;
    isEditing: boolean;
    renderField: (field: keyof Workers) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
    handleEdit: (worker: Workers) => void;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: (worker: Workers) => void;
    handleCloseDetails: () => void;
}