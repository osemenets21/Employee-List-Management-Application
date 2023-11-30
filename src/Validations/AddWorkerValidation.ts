import * as yup from 'yup';

export const addWorkerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  postCode: yup.number().required(),
  salary: yup.number().required(),
  statusOfWork: yup.string().required(),
  phone: yup.number().required(),
})



