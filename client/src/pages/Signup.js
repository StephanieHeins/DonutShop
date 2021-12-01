import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
    <div className="container">

      <div className="column is-one-fifth is-offset-one-fifth">
      <Link to="/login">← Login</Link>
      </div>

      <div className="has-text-centered is-size-3">
        Signup
      </div>

      <form onSubmit={handleFormSubmit}>
      <div className="column is-three-fifths is-offset-one-fifth is-vcentered">
        <div className="field">
          <label htmlFor="firstName" className="label">First Name</label>
            <div className="control">
              <input 
            className="input"
            placeholder="Bob"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="column is-three-fifths is-offset-one-fifth is-vcentered">
        <div className="field">
          <label htmlFor="lastName" className="label">Last Name</label>
            <div className="control">
            <input
            className="input"
            placeholder="Boblast"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
            />
          </div>
        </div>
      </div>

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

      <div className="column is-three-fifths is-offset-one-fifth is-vcentered">
        <div class="field">
          <label htmlFor="pwd" class="label">Password</label>
            <div class="control">
            <input
            className="input"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div class="buttons is-centered">
        <button type="submit" className="button is-primary">Submit</button>
      </div>
      </form>
    </div>
  </div>
  );
}

export default Signup;
