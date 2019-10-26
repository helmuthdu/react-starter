import React, { SyntheticEvent, MouseEvent } from 'react';
import useForm from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
  onChange: (evt: SyntheticEvent<HTMLInputElement>) => void;
  onClick: (evt: MouseEvent) => void;
};

export const SignIn = (props: Props) => {
  const { register, handleSubmit, errors } = useForm<FormValues>({ mode: `onChange` });

  const onSubmit = (data: FormValues) => {
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
        onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
          props.onChange(evt);
        }}
      />
      {errors.email && <span>This field is required</span>}
      <input ref={register({ required: true })} type="password" name="password" />
      {errors.password && <span>This field is required</span>}
      <button type="submit" onClick={props.onClick}>
        Submit
      </button>
    </form>
  );
};
