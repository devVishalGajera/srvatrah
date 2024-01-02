import React,{useState} from 'react'
import '../../assets/css/app.min.css'
import '../../assets/css/bootstrap.min.css'
import logo from '../../assets/images/mainLogo.svg'
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:6006/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            
            if (response.ok) {
                const data = await response.json();
                console.log('API Response:', data); 

                // Check if isAdmin is true
                if (data.user && data.user.isAdmin === true) {
                    // Successful login, you might want to redirect or perform other actions
                    alert('Login successful for admin');
                } else {
                    // User is not an admin, handle accordingly (e.g., show an error message)
                    alert('Login failed. User is not an admin.');
                }
            } else {
                // Handle failed login
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <div className="auth-page-wrapper pt-5">
                <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                    <div className="bg-overlay"></div>

                    <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                        </svg>
                    </div>
                </div>
                <div className="auth-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <a href="index.html" className="d-inline-block auth-logo">
                                            <img src={logo} alt="" height='100px' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4">

                                    <div className="card-body p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Sarvatrah.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form onSubmit={handleLogin} action="">

                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        placeholder="Enter Email Address"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <a href="auth-pass-reset-basic.html" className="text-muted">Forgot password?</a>
                                                    </div>
                                                    <label className="form-label" htmlFor="password-input">Password</label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <input
                                                            type="password"
                                                            className="form-control pe-5 password-input"
                                                            placeholder="Enter password"
                                                            id="password-input"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-secondary w-100" type="submit">Sign In</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account ? <a href="auth-signup-basic.html" className="fw-semibold text-primary text-decoration-underline"> Signup </a> </p>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
