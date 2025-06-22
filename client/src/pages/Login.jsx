import { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/auth'; 
import '../styles/Login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username.trim(), password);
            setUser(userData);
            console.log('Login successful:', userData);
            userData.role === 'admin'? navigate('/admin'):navigate('/player'); 
        }
        catch (err) {
            console.error('Login failed:', err);
            setError('Invalid username or password');
        }
    };
        
    
    const handleSignUp = () => {
        navigate('/Signup'); 
    };


    return (
        <div className='login-container'>
            <h2 className='login-title'>Login</h2>
           <form className='login-form' onSubmit={handleLogin}>
                <label className='username-label' htmlFor="login-username">Username: </label>
                <input
                    id="login-username"
                    name="username"
                    type='text'
                    className='username-input'
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className='password-label' htmlFor="login-password">Password: </label>
                <input
                    id="login-password"
                    name="password"
                    type='password'
                    className='password-input'
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className='error-message'>{error}</p>}
                <button type='submit' className='login-button'>Login</button>
            </form>
            <div className='signup-link'>
                <p>Don't have an account? {''}
                    <button className='signup-button' onClick={handleSignUp}>
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
        
    )
}
export default Login;