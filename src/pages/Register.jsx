import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  PageWrapper,
} from '../common/common.styles';
import GoogleAuth from '../common/GoogleAuth/GoogleAuth';

function Register() {
  const [registerData, setRegisterData] = useState({});

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <PageWrapper id="register-page">
      <CardContainer id="register-card-container">
        <CardWrapper id="register-card-wrapper">
          <CardTitle>Register</CardTitle>
          <form>
            <label htmlFor="name">
              Email:
              <input
                type="text"
                placeholder="Email"
                name="name"
                value={registerData?.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData?.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit" onClick={handleSubmit}>
              Btn
            </button>
          </form>
          <GoogleAuth text="Register" />
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default Register;
