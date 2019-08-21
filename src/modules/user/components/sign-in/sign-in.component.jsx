import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const formValidation = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string().required('Password is required')
});

export const SignIn = props => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={formValidation}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
      props.onSubmit(values);
    }}
  >
    {({ isSubmitting, handleChange }) => (
      <Form>
        <Field
          type="email"
          name="email"
          onChange={evt => {
            props.onChange(evt);
            handleChange(evt);
          }}
        />
        <ErrorMessage name="email" component="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit" disabled={isSubmitting} onClick={props.onClick}>
          Submit
        </button>
        <p>current user: {props.name}</p>
      </Form>
    )}
  </Formik>
);

SignIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
