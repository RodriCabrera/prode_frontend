import React, { useState } from 'react';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Form,
  Input,
  Label,
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
          <Form>
            <Label htmlFor="name">
              Email:
              <Input
                type="text"
                placeholder="Email"
                name="name"
                value={registerData?.name}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData?.password}
                onChange={handleChange}
              />
            </Label>
            <Button onClick={handleSubmit}>Register</Button>
          </Form>
          <GoogleAuth text="Register" />
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default Register;
