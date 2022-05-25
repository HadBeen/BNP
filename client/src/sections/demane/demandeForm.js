import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

export default function DemandeForm() {
  const [value, setValue] = useState(null);
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
      monnaie: '',
      m_lettre: '',
      m_chiffre: '',
      debit: '',
      virement_par: '',
      frais: '',
      date_de_valeur: '',
      num_transaction: { date: '', siege: '', racin: '', ordinal: '', cle: '', devise: '' }, //rempli par cfa
      nature_de_paiement: '',
      num_dom: '',
      benificier: { nom: '', prenom: '', num_cmpt: '', address_cmplt: '', nom_banque: '', adr_swift: '' },
      expatrie: '', //user lui meme
      statue: '', //default : pending
      capture_blocage: '', //rempli par vfo
      piece_jointe: {
        contrat: '',
        fiche_de_paie_2: '',
        fiche_de_paie_1: '',
        accord_operation_remarquable: '',
        attestation_de_situation_fiscale: '',
        contact_de_travail: '',
        permis_de_travail: '',
        ecrit_explicatif: '',
      },
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
              label=" monnaie"
              {...getFieldProps(' monnaie')}
              error={Boolean(touched.monnaie && errors.monnaie)}
              helperText={touched.monnaie && errors.monnaie}
            />

            <TextField
              fullWidth
              label="m_lettre"
              {...getFieldProps('m_lettre')}
              error={Boolean(touched.m_lettre && errors.m_lettre)}
              helperText={touched.m_lettre && errors.m_lettre}
            />
            <TextField
              fullWidth
              label="m_chiffre"
              {...getFieldProps('m_chiffre')}
              error={Boolean(touched.m_chiffre && errors.m_chiffre)}
              helperText={touched.m_chiffre && errors.m_chiffre}
            />
            <TextField
              fullWidth
              label="debit"
              {...getFieldProps('debit')}
              error={Boolean(touched.debit && errors.debit)}
              helperText={touched.debit && errors.debit}
            />
            <TextField
              fullWidth
              label="virement_par"
              {...getFieldProps('virement_par')}
              error={Boolean(touched.virement_par && errors.virement_par)}
              helperText={touched.virement_par && errors.virement_par}
            />
            <TextField
              fullWidth
              label="frais"
              {...getFieldProps('frais')}
              error={Boolean(touched.frais && errors.frais)}
              helperText={touched.frais && errors.frais}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="date_de_valeur"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...getFieldProps('date_de_valeur')}
                    error={Boolean(touched.date_de_valeur && errors.date_de_valeur)}
                    helperText={touched.date_de_valeur && errors.date_de_valeur}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
          {/* num_transaction */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="num_transaction.date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...getFieldProps('num_transaction.date')}
                  error={Boolean(touched.num_transaction.date && errors.num_transaction.date)}
                  helperText={touched.num_transaction.date && errors.num_transaction.date}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="num_transaction.siege"
            {...getFieldProps('num_transaction.siege')}
            error={Boolean(touched.num_transaction.siege && errors.num_transaction.siege)}
            helperText={touched.num_transaction.siege && errors.num_transaction.siege}
          />
          <TextField
            fullWidth
            label="num_transaction.racin"
            {...getFieldProps('num_transaction.racin')}
            error={Boolean(touched.num_transaction.racin && errors.num_transaction.racin)}
            helperText={touched.num_transaction.racin && errors.num_transaction.racin}
          />
          <TextField
            fullWidth
            label="num_transaction.ordinal"
            {...getFieldProps('num_transaction.ordinal')}
            error={Boolean(touched.num_transaction.ordinal && errors.num_transaction.ordinal)}
            helperText={touched.num_transaction.ordinal && errors.num_transaction.ordinal}
          />
          <TextField
            fullWidth
            label="num_transaction.cle"
            {...getFieldProps('num_transaction.cle')}
            error={Boolean(touched.num_transaction.cle && errors.num_transaction.cle)}
            helperText={touched.num_transaction.cle && errors.num_transaction.t}
          />
          <TextField
            fullWidth
            label="num_transaction.devise"
            {...getFieldProps('num_transaction.devise')}
            error={Boolean(touched.num_transaction.devise && errors.num_transaction.devise)}
            helperText={touched.num_transaction.devise && errors.num_transaction.t}
          />
          {/* num_transaction */}
          {/* expatrie */}
          <TextField
            fullWidth
            disabled={disabled}
            autoComplete={user.id}
            label="expatrie"
            {...getFieldProps('expatrie')}
            error={Boolean(touched.expatrie && errors.expatrie)}
            helperText={touched.expatrie && errors.expatrie}
          />
          {/* expatrie */}
          <TextField
            fullWidth
            label="nature_de_paiement"
            {...getFieldProps('nature_de_paiement')}
            error={Boolean(touched.nature_de_paiement && errors.nature_de_paiement)}
            helperText={touched.nature_de_paiement && errors.nature_de_paiement}
          />
          <TextField
            fullWidth
            label="num_dom"
            {...getFieldProps('num_dom')}
            error={Boolean(touched.num_dom && errors.num_dom)}
            helperText={touched.num_dom && errors.num_dom}
          />
          <TextField
            disabled={disabled}
            fullWidth
            label="capture_blocage"
            {...getFieldProps('capture_blocage')}
            error={Boolean(touched.capture_blocage && errors.capture_blocage)}
            helperText={touched.capture_blocage && errors.capture_blocage}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
