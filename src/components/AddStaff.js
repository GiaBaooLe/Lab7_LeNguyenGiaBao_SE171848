import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function AddStaff() {
  const url = 'https://65375a84bb226bb85dd31896.mockapi.io/api/v1/staffManagement';
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    if (showSuccessAlert || showErrorAlert) {
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessAlert, showErrorAlert]);

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      address: '',
      avatar: '',
      createdAt: new Date().toISOString(),
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(2, 'Must be 2 characters or more'),
      age: Yup.number().required('Age is required').integer('Age must be an integer'),
      address: Yup.string().required('Address is required'),
      avatar: Yup.string().url('Avatar must be a valid URL'),
    }),

    onSubmit: (values, { resetForm }) => {
      axios
        .post(url, values)
        .then((response) => {
          if (response.status !== 201) {
            throw new Error('Network response was not ok');
          }
          console.log('Server response:', response.data);
          setShowSuccessAlert(true);
          resetForm();
        })
        .catch((error) => {
          console.error('Error:', error);
          setShowErrorAlert(true);
        });
    },
  });

  return (
    <div className="content" style={{  width: '800px' }}>
      <h1>Add New Staff</h1>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={5}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              style={{ marginBottom: '12px' }}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name ? formik.errors.name : ''}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              fullWidth
              style={{ marginBottom: '12px' }}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age ? formik.errors.age : ''}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="CreatedAt"
              name="createdAt"
              value={formik.values.createdAt}
              onChange={formik.handleChange}
              fullWidth
              style={{ marginBottom: '12px' }}
              error={formik.touched.createdAt && Boolean(formik.errors.createdAt)}
              helperText={formik.touched.createdAt ? formik.errors.createdAt : ''}
              InputProps={{ readOnly: true }}
              inputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <TextField
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          fullWidth
          style={{ marginBottom: '12px' }}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address ? formik.errors.address : ''}
        />

        <TextField
          label="Avatar"
          name="avatar"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          fullWidth
          style={{ marginBottom: '12px' }}
          error={formik.touched.avatar && Boolean(formik.errors.avatar)}
          helperText={formik.touched.avatar ? formik.errors.avatar : ''}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            float: 'right',
            marginTop: '2%',
            marginRight: '4%',
            padding: '12px 64px',
            backgroundColor: '#000',
            color: '#fff',
          }}
        >
          Add
        </Button>
      </form>

      {showSuccessAlert && (
        <Alert
          severity="success"
          variant="filled"
          style={{ position: 'fixed', top: '2%', right: '1%' }}
        >
          New staff added successfully!
        </Alert>
      )}

      {showErrorAlert && (
        <Alert
          severity="error"
          variant="filled"
          style={{ position: 'fixed', top: '2%', right: '1%' }}
        >
          Failed to add new staff!
        </Alert>
      )}
    </div>
  );
}

export default AddStaff;
