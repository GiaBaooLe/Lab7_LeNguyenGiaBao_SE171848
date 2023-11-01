import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateStaff() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
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

  useEffect(() => {
    const url = `https://65375a84bb226bb85dd31896.mockapi.io/api/v1/staffManagement/${id}`;
    axios(url)
      .then((response) => {
        const fetchedData = response.data;
        setStaff(fetchedData);
      })
      .catch((error) => console.log(error.message));
  }, [id]);

  useEffect(() => {
    if (staff) {
      formik.setValues({
        name: staff.name || '',
        age: staff.age || '',
        address: staff.address || '',
        avatar: staff.avatar || '',
        createdAt: staff.createdAt || '',
      });
    }
  }, [staff]);

  const formik = useFormik({
    initialValues: {
      name: staff ? staff.name : '',
      age: staff ? staff.age : '',
      address: staff ? staff.address : '',
      avatar: staff ? staff.avatar : '',
      createdAt: staff ? staff.createdAt : '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(2, 'Must be 2 characters or more'),
      age: Yup.number().required('Age is required').integer('Age must be an integer'),
      address: Yup.string().required('Address is required'),
      avatar: Yup.string().url('Avatar must be a valid URL'),
    }),

    onSubmit: (values) => {
      axios
        .put(`https://65375a84bb226bb85dd31896.mockapi.io/api/v1/staffManagement/${id}`, values)
        .then((response) => {
          if (response.status !== 200) {
            if (response.status === 404) {
              throw new Error('Staff member not found');
            } else {
              throw new Error('Network response was not ok');
            }
          }
          console.log('Server response:', response.data);
          setShowSuccessAlert(true);
        })
        .catch((error) => {
          console.error('Error:', error);
          setShowErrorAlert(true);
        });
    },
  });

  return (
    <div className="content" style={{width: '800px' }}>
      <h1>Update Staff</h1>
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
          Update
        </Button>
      </form>

      {showSuccessAlert && (
        <Alert
          severity="success"
          variant="filled"
          style={{ position: 'absolute', top: '12%', right: '1%' }}
        >
          Staff member updated successfully!
        </Alert>
      )}

      {showErrorAlert && (
        <Alert
          severity="error"
          variant="filled"
          style={{ position: 'absolute', top: '12%', right: '1%' }}
        >
          Failed to update staff member!
        </Alert>
      )}
    </div>
  );
}

export default UpdateStaff;
