// src/pages/RegisterPage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  resetRegistrationForm, 
  updateUsername, 
  updateEmail, 
  updatePassword 
} from '../features/form/registrationFormSlice';
import { setAuthError, setAuthLoading } from '../features/auth/authSlice';
import axios from 'axios';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the form data from Redux store
  const { username, email, password } = useSelector(
    (state) => state.registrationForm
  );

  // Get auth state from Redux store
  const { status, error } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        dispatch(updateUsername(value));
        break;
      case 'email':
        dispatch(updateEmail(value));
        break;
      case 'password':
        dispatch(updatePassword(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setAuthLoading());

    const endpoint = 'http://localhost:5000/api/auth/register';
    const data = { username, email, password };

    try {
      const response = await axios.post(endpoint, data, {
        withCredentials: true,
      });

      console.log('✅ Registration successful:', response.data);

      // Reset the form fields after successful submission
      dispatch(resetRegistrationForm());

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.log('❌ Registration failed:', error);
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(setAuthError(error.response.data.error));
      } else {
        dispatch(setAuthError('An unexpected error occurred. Please try again.'));
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-6">
          Register
        </h2>

        {/* Show error */}
        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Show success */}
        {status === 'succeeded' && (
          <div className="p-4 mb-4 bg-green-100 text-green-700 text-center rounded-md">
            Registration Successful!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full px-6 py-3 rounded-full font-bold text-white transition-colors duration-200 
              ${
                status === 'loading'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
              }`}
          >
            {status === 'loading' ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
