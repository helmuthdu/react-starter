import type { MouseEvent, SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  pending?: boolean;
  onSubmit: (values: FormValues) => void;
  onChange: (evt: SyntheticEvent<HTMLInputElement>) => void;
  onClick: (evt: MouseEvent) => void;
};

export const SignIn = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({ mode: 'onChange' });

  return (
    <form
      onSubmit={handleSubmit((data: FormValues) => {
        props.onSubmit(data);
      })}>
      <input
        {...register('email', { required: true })}
        onChange={(evt: SyntheticEvent<HTMLInputElement>) => {
          props.onChange(evt);
        }}
        type="email"
      />
      {formState.errors.email && <span>This field is required</span>}
      <input type="password" {...register('password', { required: true })} />
      {formState.errors.password && <span>This field is required</span>}
      <button disabled={props.pending} onClick={props.onClick} type="submit">
        Submit
      </button>
    </form>
  );
};
