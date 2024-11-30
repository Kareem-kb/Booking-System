import * as Yup from 'yup';

const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password_hash: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default signinSchema;
