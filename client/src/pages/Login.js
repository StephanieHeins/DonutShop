import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
  <div>
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

    <div>
    <div className="container">

      <div className="column is-one-fifth is-offset-one-fifth">
        <Link to="/signup">← Signup</Link>
      </div>

      <div className="has-text-centered is-size-3">
        Login
      </div>

      <form onSubmit={handleFormSubmit}>
      <div className="column is-three-fifths is-offset-one-fifth is-vcentered">
        <div class="field">
          <label htmlFor="email" class="label">Email</label>
            <div class="control">
            <input 
            className="input"
            placeholder="bob@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            />
          </div>
        </div>
      </div>


    </form>
    </div>
    </div>

  </div>
  );
}

export default Login;
