import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/imageForLogin.png'; // Update the path to your image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up forms
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://photo-lab.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      sessionStorage.setItem('userName', res.data.name);
      console.log(res);
      alert('Login successful');
      navigate('/Dashboard');
    } catch (err) {
      alert('Login Failed.. Invalid Credentials.. please try again');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://photo-lab.onrender.com/api/auth/signup', signUpForm);
      alert('Sign Up successful!');
      setIsSignUp(false); // Switch back to login form after successful sign-up
    } catch (err) {
      console.error(err);
      alert('Sign Up failed. Please try again.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('https://photo-lab.onrender.com/api/auth/google-login', {
        tokenId: credentialResponse.credential,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      sessionStorage.setItem('userName', res.data.name);
      alert('Google Login successful');
      navigate('/Dashboard');
    } catch (err) {
      alert('Google Login failed');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
    alert('Google Login failed');
  };

  return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
        }}
      >
        {/* Left Half: Image */}
        <div
          style={{
            flex: 1,
            backgroundImage: `url(${loginImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

       
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1000px', 
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              height: '400px',
              transformStyle: 'preserve-3d', 
              transition: 'transform 0.6s',
              transform: isSignUp ? 'rotateY(180deg)' : 'rotateY(0deg)', 
            }}
          >
           
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden', 
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: '26px',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Sign In To Your Account
              </h2>
              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label
                    htmlFor="email"
                    style={{ display: 'block', marginBottom: '5px' }}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label
                    htmlFor="password"
                    style={{ display: 'block', marginBottom: '5px' }}
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Login
                </button>
              </form>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>OR</p>
                <GoogleOAuthProvider clientId="193955188076-7tlu9loipvdh9tnnli2sr4afl0o73sr3.apps.googleusercontent.com">

                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                />
                </GoogleOAuthProvider>
              </div>
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  cursor: 'pointer',
                  color: '#007BFF',
                }}
                onClick={() => setIsSignUp(true)}
              >
                Don't have an account? Sign Up
              </p>
            </div>

            {/* Sign-Up Form */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '134%',
                backfaceVisibility: 'hidden', 
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'rotateY(180deg)', 
                top:"-75px"
              }}
            >
              <h2
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: '26px',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Create an Account
              </h2>
              <form  onSubmit={handleSignUpSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label
                    htmlFor="name"
                    style={{ display: 'block', marginBottom: '5px' }}
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={signUpForm.name}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, name: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label
                    htmlFor="email"
                    style={{ display: 'block', marginBottom: '5px' }}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signUpForm.email}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, email: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label
                    htmlFor="password"
                    style={{ display: 'block', marginBottom: '5px' }}
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={signUpForm.password}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, password: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
               
                <div style={{ marginBottom: '15px' }}>
                  <label
                    htmlFor="phoneNumber"
                    style={{ display: 'block', marginBottom: '5px' }}
                  >
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={signUpForm.phoneNumber}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        phoneNumber: e.target.value,
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Sign Up
                </button>
              </form>
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  cursor: 'pointer',
                  color: '#007BFF',
                }}
                onClick={() => setIsSignUp(false)}
              >
                Already have an account? Login
              </p>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Login;