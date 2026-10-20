// src/components/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(email, password);
  };

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h2 className='auth-title'>Inscrever-se</h2>

        <input
          id='email'
          name='email'
          type='email'
          placeholder='E-mail'
          value={formValue.email}
          onChange={handleChange}
          className='auth-input'
          required
        />

        <input
          id='password'
          name='password'
          type='password'
          placeholder='Senha'
          value={formValue.password}
          onChange={handleChange}
          className='auth-input'
          required
        />

        <button type='submit' className='auth-button'>
          Inscrever-se
        </button>

        <div className='auth-redirect'>
          <p>
            Já é um membro?{" "}
            <Link to='/signin' className='auth-link'>
              Faça o login aqui!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
