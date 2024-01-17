import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = UserAuth();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      await logIn(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen border">
      <div className="w-full px-4 py-40">
        <div className="max-w-[450px] h-[600px] mx-auto bg-[#352036]/40 rounded-3xl text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-4xl text-[#352036]">Login</h1>
              {error && (
                <p className="text-red-600 font-bold">Please Login Again</p>
              )}
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col py-4 "
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-[#a199a4] rounded placeholder-black"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-[#a199a4] rounded placeholder-black"
                type="password"
                placeholder="Password"
                autoComplete="current-passowrd"
              />
              <button
                type="submit"
                className="bg-[#301933] py-3 my-6 rounded font-bold "
              >
                Login
              </button>
              <p className="py-4 space-x-3">
                <span className="text-gray-600">New to Movies?</span>
                <Link
                  to="/signup"
                  className="font-bold text-xl text-[#352036]"
                  onclick
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
