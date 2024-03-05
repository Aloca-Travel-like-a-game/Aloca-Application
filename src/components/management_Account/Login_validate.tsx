import * as Yup from 'yup';
export const Login_validate = Yup.object().shape({
  username: Yup.string()
    .min(5, 'name must be at least 5 characters!')
    .max(12, 'name must have a maximum of 20 characters!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự!')
    .max(20, 'Mật khẩu tối đa 20 ký tự!')
    .required('Nhập Mật Khẩu'),
});
