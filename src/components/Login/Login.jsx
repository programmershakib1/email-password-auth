import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        setSuccess(false);
        setLoginError('');

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            if(!result.user.emailVerified){
              setLoginError('please verify your email address.');
            }
            else{
              setSuccess(true);
            }
        })
        .catch(error => {
            console.log('error', error.message);
            setLoginError(error.message);
        })
    }

    const handleForgetPassword = () => {
      console.log(emailRef.current.value);
      const email = emailRef.current.value;
      if(!email){
        console.log('please provide a valid email');
      }
      else{
        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Password reset email sent, please check your email');
        })
      }
    }
  return (
        <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              name="email"
              ref={emailRef}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
              name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgetPassword} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {
            success && <p className="text-green-600 text-center pb-3">User login Successful</p>
          }
          {
            loginError && <p className="text-red-600 text-center pb-3">{loginError}</p>
          }
          <p className="pb-5 text-center">New to this website please<Link className="bg-primary text-white py-2 px-6 rounded-xl ml-5" to="/singUp">Sing Up</Link></p>
        </div>
  );
};

export default Login;
