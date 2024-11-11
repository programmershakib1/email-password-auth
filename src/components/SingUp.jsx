import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSingUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    console.log(name, photo, email, password, terms);

    setErrorMessage("");
    setSuccess(false);

    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "al least one uppercase,one lowercase,one number,one special character and must be 6 character"
      );
      return;
    }

    if(!terms){
        setErrorMessage('Please accept our terms and condition');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('verification email sent');
        })
        const profile = {
          displayName: name,
          photoURL: photo
        }
        updateProfile(auth.currentUser, profile)
        .then(() => {
          console.log('update user profile');
        })
        .catch(error => console.log('update profile error', error))
      })
      .catch((error) => {
        console.log("error", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="mx-auto card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl font-bold text-center pt-5">Sing Up now!</h3>
      <form onSubmit={handleSingUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            name="photo"
            type="text"
            placeholder="photo url"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute btn-xs right-6 top-12"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label justify-start gap-5 cursor-pointer">
            <input name="terms" type="checkbox" className="checkbox" />
            <span className="label-text">Accept Our Terms nd Condition</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sing Up</button>
        </div>
      </form>
      {errorMessage && (
        <p className="text-red-600 text-center pb-3">{errorMessage}</p>
      )}
      {success && (
        <p className="text-green-600 text-center pb-3">
          Sing Up is Successful.
        </p>
      )}
      <p className="pb-5 text-center">Already have an account? Please <Link className="bg-primary text-white py-2 px-6 rounded-xl ml-2" to="/login">Login</Link></p>
    </div>
  );
};

export default SingUp;
