import type { MouseEvent, SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = (data: FormValues) => {
    setTimeout(() => {
      alert(JSON.stringify(data, null, 2));
    }, 400);
    props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: true })}
        onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
          props.onChange(evt);
        }}
        type="email"
      />
      {errors.email && <span>This field is required</span>}
      <input type="password" {...register('password', { required: true })} />
      {errors.password && <span>This field is required</span>}
      <button onClick={props.onClick} type="submit">
        Submit
      </button>
    </form>
  );
};
