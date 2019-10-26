import React from 'react';
import useForm from 'react-hook-form';

export const SignIn = props => {
  const { register, handleSubmit, errors } = useForm({ mode: `onChange` });

  const onSubmit = data => {
    setTimeout(() => {
      alert(JSON.stringify(data, null, 2));
    }, 400);
    props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register({ required: true })}
        type="email"
        name="email"
        onChange={evt => {
          props.onChange(evt);
        }}
      />
      {errors.email && <span>This field is required</span>}
      <input ref={register({ required: true })} type="password" name="password" />
      {errors.password && <span>This field is required</span>}
      <button type="submit" onClick={props.onClick}>
        Submit
      </button>
      <p>current user: {props.name}</p>
    </form>
  );
};
