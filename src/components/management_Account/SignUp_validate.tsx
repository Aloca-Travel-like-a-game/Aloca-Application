import * as Yup from 'yup';

export const Signup_validate = Yup.object().shape({
  username: Yup.string()
    .min(5, 'name must be at least 5 characters!')
    .max(12, 'name must have a maximum of 20 characters!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Passwords must be at least 6 characters!')
    .max(20, 'Password must have a maximum of 20 characters!')
    .required('Required'),
  confirmpassword: Yup.string()
    .min(6, 'Passwords must be at least 6 characters!')
    .max(20, 'Password must have a maximum of 20 characters!')
    .required('Required'),
});
