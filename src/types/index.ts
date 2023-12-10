import { ReactNode } from "react";

export interface IButtonProps {
  type: "button" | "link" | "submit";
  action?: (() => void) | string;
  title: string | JSX.Element;
  classes?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export interface IAlertSuccess {
  title: string;
}

export interface UserAuth {
  uid: string;
  displayName?: string | null;
  email?: string | null;
}

export type Props = {
  children: ReactNode;
};

export type Workers = {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  postCode: number;
  salary: number;
  statusOfWork: string;
  phone: number;
  dateOfEmployment: Date;
};

export type WorkersContextType = {
  workers: Workers[];
  updatedWorker: Workers | null;
  maxPage: number;
  pageNumber: number;
  setWorkers: React.Dispatch<React.SetStateAction<Workers[]>>;
  addWorker: (newWorker: Workers) => void;
  editWorker: (worker: Workers) => void;
  deleteWorker: (workerId: string) => Promise<void>;
  getWorkers: (page: number, limit: number) => Promise<void>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export type EditWorkersContextType = {
  updatedWorker: Workers | null;
  editWorker: (worker: Workers) => void;
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
  renderField: (
    field: keyof Workers
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleEdit: (worker: Workers) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (worker: Workers) => void;
  handleCloseDetails: () => void;
};
