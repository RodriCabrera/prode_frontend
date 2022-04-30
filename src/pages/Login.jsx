import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import GoogleAuth from '../GoogleAuth';
import Loader from '../Loader';

function Login() {
  const userContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  useEffect(() => {
    if (userContext.user) {
      navigate('/');
    }
  }, [userContext]);

  if (userContext.isLoading) return <Loader />;

  return (
    <div>
      <h1>LOGIN</h1>
      <form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={loginData?.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData?.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Btn
        </button>
      </form>
      <button type="button" onClick={() => navigate('/register')}>
        Register
      </button>
      <br />
      <GoogleAuth />
    </div>
  );
}

export default Login;
