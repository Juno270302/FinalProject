import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      const check = await signUp(email, password, name);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen border">
      <div className="w-full px-4 py-40">
        <div className="max-w-[450px] h-[600px] mx-auto bg-[#352036]/40 rounded-3xl text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="font-bold text-4xl text-[#352036]">Sign Up</h1>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col py-4 "
            >
              <input
                onChange={(e) => setName(e.target.value)}
                className="p-3 my-2 bg-[#a199a4] rounded placeholder-black"
                type="text"
                placeholder="Username"
              />
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
                Sign Up
              </button>
              <p className="py-4">
                <span className="text-gray-600">
                  Already subscribed to Movies?
                </span>
                <Link to="/login" className="font-bold text-xl text-[#352036]">
                  {" "}
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
