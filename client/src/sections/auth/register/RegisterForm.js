import * as Yup from 'yup';
import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment ,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useSignUpMutation } from '../../../app/backend';
import { useNotification, useUser } from '../../../hooks';

// ----------------------------------------------------------------------

export default function RegisterForm() {
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


  const[gender,setGender]= useState('H');



  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (body) => {
      SignUp({ body })
        .unwrap()
        .then((user) => {
          Notify({
            title: 'Inscription avec succés !',
            description: 'Bienvenue parmis nous, jetez un oeil au tableau de bord et faite votre premiére demande de transfert libre',
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

        {/* <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Sexe</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="H"
            name="gender"
            row 
          >
            <FormControlLabel value="H" control={<Radio />} label="Homme" />
            <FormControlLabel value="F" control={<Radio />} label="Femme"/>

      
          </RadioGroup>
        </FormControl> */}

<FormControl id="demo-radio-buttons-group-label">
          <FormLabel>sexe</FormLabel>
          <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value="F" control={<Radio />} label="Femme" />
            <FormControlLabel value="H" control={<Radio />} label="Homme" />
 
          </RadioGroup>
        </FormControl>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
