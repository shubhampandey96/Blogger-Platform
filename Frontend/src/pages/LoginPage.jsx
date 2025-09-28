import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetLoginForm, updateEmail, updatePassword } from '../features/form/loginFormSlice';
import { loginUser, setAuthError, setAuthLoading } from '../features/auth/authSlice';
import API from '../api'; // ✅ use centralized axios instance

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state for form fields
    const { email, password } = useSelector((state) => state.loginForm);
    const { status, error } = useSelector((state) => state.auth);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            dispatch(updateEmail(value));
        } else if (name === 'password') {
            dispatch(updatePassword(value));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setAuthLoading());

        try {
            // ✅ now using API instance (baseURL from .env)
            const response = await API.post('/auth/login', { email, password });

            console.log('✅ Login successful:', response.data);
            dispatch(loginUser(response.data));
            dispatch(resetLoginForm());
            navigate('/'); // redirect after login
        } catch (err) {
            console.error('❌ Login failed:', err);
            if (err.response?.data?.error) {
                dispatch(setAuthError(err.response.data.error));
            } else {
                dispatch(setAuthError('An unexpected error occurred. Please try again.'));
            }
        }
    };

    return (
        <div className="flex justify-center items-center py-20 bg-gray-50 min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center text-cyan-700 mb-6">
                    Login
                </h2>

                {/* Show error or success messages */}
                {error && (
                    <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                {status === 'succeeded' && (
                    <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-md">
                        Login successful!
                    </div>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full px-6 py-3 rounded-full font-bold text-white transition-colors duration-200 ${
                            status === 'loading'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
                        }`}
                    >
                        {status === 'loading' ? 'Processing...' : 'Log In'}
                    </button>
                </form>

                {/* Register link */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-cyan-600 hover:text-cyan-700 font-semibold cursor-pointer ml-1"
                    >
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
