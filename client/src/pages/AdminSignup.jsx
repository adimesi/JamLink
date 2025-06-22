import { useState,useContext } from 'react';
import { adminSignup,login} from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminSignup.css';


function AdminSignup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    

    const handleSignUp =  async(e) => {
        e.preventDefault(); 
        try{
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            await adminSignup(username, password);
            console.log('Signup successful');
            const userData = await login(username, password);
            console.log('Login successful:', userData);
            setUser(userData);
            navigate('/admin'); 
           
        }
        catch (err) {
            console.error('Signup failed:', err);
            setError('Signup failed. Please try again.');
        }
    }
    const handleLogin = () => {
        console.log('Redirecting to sign-up page...');
        navigate('/'); 
    }

    return (
        <div className='Signup-container'>
            <h2 className='Signup-title'>Admin signup</h2>
            <p className='Signup-subtitle'>Please fill in the fields to create an account</p>
            <form className='Signup-form' onSubmit={handleSignUp}>
                <label className='username-label'>Username: </label>
                <input
                    type='text'
                    className='username-input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label className='password-label' htmlFor="password" >Password: </label>
                <input
                    type='password'
                    className='password-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label className='confirm-password-label' htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type='password'
                    className='confirm-password-input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {password && confirmPassword && password !== confirmPassword && (
                <p className="signup-error" style={{ color: "red" }}>Passwords do not match</p>
                )}
                <button type='submit' className='Signup-button'>Signup</button>
            </form>
            {error && <p className='error-message'>{error}</p>}
            <div className='login-link'>
                <p>Already have an account? {''}
                    <button className='login-button' onClick={handleLogin}>
                        Login
                    </button>
                </p>
            </div>
        </div>
        
    )
}
export default AdminSignup;