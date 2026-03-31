import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || (!isLogin && !email)) {
      setMessage("All fields are required");
      setShowPopup(true);
      return;
    }

    const adminCredentials = {
      username: "admin123",
      password: "admin@123",
    };

    if (isLogin) {
      // LOGIN LOGIC
      if (
        username === adminCredentials.username &&
        password === adminCredentials.password
      ) {
        // Login success
        login({
          name: "Alex R.",
          role: "Product Manager Prep",
          avatar: "https://i.pravatar.cc/150?u=alex"
        });
        setMessage("Login Successful! Welcome to Dashboard");
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage("Invalid Credentials");
        setShowPopup(true);
      }
    } else {
      // REGISTER LOGIC (demo)
      setMessage("Registration Successful! Please login.");
      setShowPopup(true);

      setTimeout(() => {
        setIsLogin(true); 
        setShowPopup(false);
      }, 2000);
    }
  };

  return (
   <div className="min-h-screen flex">

  {/* LEFT SIDE (IMAGE / CUSTOM BACKGROUND) */}
  <div 
    className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')"
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50"></div>

    <div className="relative text-white text-center px-10">
      <h1 className="text-4xl font-bold mb-4">
        Interview Prep Tracker 🚀
      </h1>
      <p className="text-lg text-gray-200">
        Track your progress, stay consistent, crack your dream job.
      </p>
    </div>
  </div>

  {/* RIGHT SIDE (FORM) */}
  <div className="flex w-full md:w-1/2 justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">

    <div className="w-full max-w-md p-[2px] rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl">

      <div className="bg-white rounded-3xl p-8">

        {/* Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-lg font-semibold transition ${
              isLogin ? "bg-indigo-600 text-white" : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-lg font-semibold transition ${
              !isLogin ? "bg-indigo-600 text-white" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>
      </div>
    </div>
  </div>

  {/* POPUP */}
  {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white px-10 py-8 rounded-2xl shadow-xl text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{message}</h3>
        <p className="text-gray-500 text-sm">
          {isLogin ? "Redirecting..." : "Switching to login..."}
        </p>
      </div>
    </div>
  )}
</div>
    
  );
};

export default Login;