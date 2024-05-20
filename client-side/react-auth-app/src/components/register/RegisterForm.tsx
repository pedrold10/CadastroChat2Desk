import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data:any) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', data);
      console.log(response.data);
      alert('Registration successful');
    } catch (error:any) {
      console.error(error.response.data);
      alert(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input className="form-input" {...register('name')} />
        <p className="form-error">{errors.name?.message}</p>
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" {...register('email')} />
        <p className="form-error">{errors.email?.message}</p>
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input className="form-input" type="password" {...register('password')} />
        <p className="form-error">{errors.password?.message}</p>
      </div>
      <button type="submit">Register</button>
      <h3>Já possui cadastro? <a href="/login">Entre!</a></h3>
    </form>
  );
};

export default RegisterForm;
