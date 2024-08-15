import React, { useState } from 'react';
import { auth } from '../../Firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [control, setControl] = useState(false);

    const handleSignIn = async () => {
        try {
            // await auth.createUserWithEmailAndPassword(email, password);
            // console.log('User signed up successfully!');
            if (email !== "" && password !== "") {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user + " Login Success")
                    })
                    .catch((err) => console.log("Login Error", err.message));
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }

    };

    const handleSignUp = async () => {
        try {
            if (email !== "" && password !== "") {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => console.log("Signup Success"))
                    .catch((err) => console.log("Signup Error", err.message));
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };
    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            console.log('reset sent')
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    if (control === true) {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Signup</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button onClick={handleSignUp} type="button" className="btn btn-primary">
                                Signup
                            </button>
                        </div>
                        <p style={{ cursor: 'pointer' }} onClick={() => setControl(false)} className="text-center mt-3">
                            Not Registered Yet?
                        </p>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Signin</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button onClick={handleSignIn} type="button" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <p style={{ cursor: 'pointer' }} onClick={() => setControl(true)} className="text-center mt-3">
                        Not Registered Yet?
                    </p>
                    <p style={{ cursor: 'pointer' }} onClick={handleForgotPassword} className="forgot-password text-center mt-3">
                        Forgot Password?
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Auth;
