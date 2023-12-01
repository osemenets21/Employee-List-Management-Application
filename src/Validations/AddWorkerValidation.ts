import * as yup from 'yup';

export const addWorkerSchema = yup.object().shape({
  firstName: yup.string().required().matches(/^[a-zA-Z]+$/, 'First name should only contain Latin letters'),
  lastName: yup.string().required().matches(/^[a-zA-Z]+$/, 'Last name should only contain Latin letters'),
  dateOfBirth: yup.date().required(),
  street: yup.string().required().matches(/^[a-zA-Z]+$/, 'Street should only contain Latin letters'),
  city: yup.string().required().matches(/^[a-zA-Z]+$/, 'Street should only contain Latin letters'),
  postCode: yup.number().required(),
  salary: yup.number().required(),
  statusOfWork: yup.string().required(),
  phone: yup.number().required(),
  dateOfEmployment: yup.date().required(),
})



