import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { SyntheticEvent, MouseEvent } from 'react';
import { Schema } from 'yup';
import * as Yup from 'yup';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
  onChange: (evt: SyntheticEvent) => void;
  onClick: (evt: MouseEvent) => void;
  name: string;
};

const formValidation: Schema<FormValues> = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string().required('Password is required')
});

export const SignIn = (props: Props) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={formValidation}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
      props.onSubmit(values);
    }}>
    {({ isSubmitting, handleChange }) => (
      <Form>
        <Field
          type="email"
          name="email"
          onChange={(evt: SyntheticEvent) => {
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
