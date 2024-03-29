import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
// component
import Iconify from '../../../components/Iconify';
import { useSignUpMutation } from '../../../app/backend';
import { useNotification, useUser } from '../../../hooks';

// ------------------------------gender----------------------------------
const genders = [
  {
    value: 'F',
    label: 'Femme',
  },
  {
    value: 'H',
    label: 'Homme',
  },
];
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [gender, setGender] = useState('Femme');
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [SignUp, { isLoading }] = useSignUpMutation();
  const { setUser } = useUser();

  const { Notify, Errofy } = useNotification();
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (body) => {
      SignUp({ body })
        .unwrap()
        .then((user) => {
          Notify({
            title: 'You have Registered in the platform',
            description: 'Welcome among us! you can check the dashboard for news',
            type: 'success',
          });
          setUser(user);
        })
        .catch((e) => Errofy(e));
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          {/* gender debut  */}

          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                select
                label="Sexe"
                value={gender}
                onChange={handleChange}
                {...getFieldProps('gender')}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
          {/* gender fin */}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

