import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = () => {
    const validUser = {
      username: "admin",
      password: "1234"
    };

    if (username === validUser.username && password === validUser.password) {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/manage");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-blue-50 flex mx-auto">
        <div className="w-full px-5 lg:w-1/3 h-full flex flex-col gap-4 mx-auto justify-center">
          <p className="flex justify-center font-bold text-2xl text-blue-600">
            Login
          </p>
          {/* username  */}
          <div className="flex flex-col text-left gap-2">
            <label
              htmlFor="username"
              className="font-bold text-lg text-blue-600 text-left"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 shadow-md"
            />
          </div>

          {/* Enter password   */}
          <div className="flex flex-col w-full text-left gap-1">
            <label
              htmlFor="password"
              className="font-bold text-lg text-blue-600"
            >
              Password
            </label>
            <div className="flex w-full gap-2">
              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" text-black py-1 px-2 rounded-md outline-none focus:outline-blue-400 w-full shadow-md"
                required
              />
              <div
                className="flex justify-center items-center py-1 rounded-md w-20 h-full bg-blue-600 text-white cursor-pointer shadow-md"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <HiOutlineEyeOff className="text-2xl" />
                ) : (
                  <HiOutlineEye className="text-2xl" />
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="flex w-fit items-center gap-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:opacity-80 transition duration-300 ease-in-out "
          >
            Login {loading ? <WhiteSpinner /> : ""}
          </button>

          {/* <p className="flex gap-2 justify-center items-center text-blue-600 font-thin text-lg">
            Don't have an account ?
            <span
              className="flex font-semibold pl-2 gap-1 items-center underline cursor-pointer"
              onClick={navigateToSignup}
            >
              Signup 
              <FaExternalLinkAlt />
            </span>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
