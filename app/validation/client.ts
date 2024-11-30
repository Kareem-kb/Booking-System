import * as Yup from 'yup';

const clientSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password_hash: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default clientSchema;
