import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Register</h1>
      <form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={user?.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user?.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Btn
        </button>
      </form>
    </>
  );
}

export default Register;
