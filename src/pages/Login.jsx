import { useState } from 'react';

function Login() {
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
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
    </div>
  );
}

export default Login;
