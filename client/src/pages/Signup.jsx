import { useState,useContext  } from 'react';
import { signup ,login} from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

function Signup (){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        instrument: ''
    });
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp =  async(e) => {
        e.preventDefault(); 
        setError(null); 
        try{
            if (!formData.username.trim() || !formData.password || !formData.confirmPassword || !formData.instrument) {
                setError('All fields are required');
            return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            
            await signup(formData.username, formData.password, formData.instrument);
            console.log('Signup successful');
            const userData = await login(formData.username, formData.password);
            console.log('Login successful:', userData);
            setUser(userData);
            navigate('/player');
        }
        catch (err) {
            setError('Signup failed. Please try again.');
        }
    }
    const handleLogin = () => {
        console.log('Redirecting to login page...');
        navigate('/'); 
    }


    return (
        <div className='Signup-container'>
            <h2 className='Signup-title'>Signup</h2>
            <form className='Signup-form' onSubmit={handleSignUp}>
                <label className='username-label' htmlFor="signup-username">Username: </label>
                <input
                    id="signup-username"
                    name="username"
                    type='text'
                    className='username-input'
                    autoComplete="username"
                    value={formData.username}
                    onChange={(e) => {setFormData({ ...formData, username: e.target.value });setError(null);}}
                    required
                />

                <label className='password-label' htmlFor="signup-password">Password: </label>
                <input
                    id="signup-password"
                    name="password"
                    type='password'
                    className='password-input'
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => {setFormData({ ...formData, password: e.target.value });setError(null);}}
                    required
                />

                <label className='confirm-password-label' htmlFor="signup-confirm-password">Confirm Password: </label>
                <input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type='password'
                    className='confirm-password-input'
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={(e) => {setFormData({ ...formData, confirmPassword: e.target.value });setError(null);}}
                    required
                />

                <label className='instrument-label' htmlFor="signup-instrument">Instrument: </label>
                <select
                    id="signup-instrument"
                    name="instrument"
                    onChange={(e) => {setFormData({ ...formData, instrument: e.target.value });setError(null);}}
                    value={formData.instrument}
                    className='instrument-select'
                    required
                >
                    <option value="">Choose your instrument</option>
                    <option value="vocals">Vocals</option>
                    <option value="guitar">Guitar</option>
                    <option value="drums">Drums</option>
                    <option value="bass">Bass</option>
                    <option value="saxophone">Saxophone</option>
                    <option value="keyboards">Keyboards</option>
                </select>
                {error && <p className="signup-error" style={{ color: "red" }}>{error}</p>}
                
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
export default Signup;