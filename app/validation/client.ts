import * as Yup from 'yup';

const clientSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default clientSchema;
