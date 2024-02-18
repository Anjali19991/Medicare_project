// import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useAuth } from "../AuthContext";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const cookies = new Cookies()
  const { user, setUser } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/')
  //   }
  // })

  // const loginAsGuestUser = async () => {
  //   try {
  //     const response = await customFetch.post("/auth/local", {
  //       identifier: "test@test.com",
  //       password: "secret",
  //     });
  //     dispatch(loginUser(response.data));
  //     toast.success("Welcome guest user");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Guest user login error. Please try again");
  //   }
  // };

  const loginUser = async () => {
    console.log(email)
    console.log(password)
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      cookies.set('TOKEN', data.token, {
        path: '/',
      });
      console.log(data)
      setUser(data.user);
      if (data.user.role === "patient") {
        navigate('/', { replace: true,state: data.user })
      }
      else if (data.user.role === "doctor") {
        navigate('/doctordashboard', { replace: true, state: data.user })
      }
      else {
        navigate('/admin-dashboard', { replace: true,state: data.user })
      }
      // navigate('/')
    } catch (error) {
      console.log('Error: ', error.message)
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-row p-7 rounded-md shadow-2xl">

        <div className="bg-teal-700 p-5 shadow-lg  flex items-center justify-center flex-col w-[30rem] rounded-l-md">
          <h1 className="text-white font-medium text-3xl">Welcome Back!</h1>
          <h3 className="text-white  text-lg mt-4 w-[22rem]">
            We are so very happy to have you here. It is great to see you again.
            We hope you had a safe and enjoyable time away.
          </h3>
        </div>

        <section className="grid place-items-center bg-zinc-200 rounded-r-md">
          <form
            method="post"
            className=" p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 bg-opacity-40 w-[25rem]"
          >
            <h4 className="text-center text-3xl font-bold text-teal-800">
              Login
            </h4>
            <input className="px-4 py-3 rounded-md" placeholder="email" type="email" label="Email" name="identifier" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="px-4 py-3 rounded-md" placeholder="password" type="password" label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="mt-4">
              <button className="px-4 py-3 w-full text-white rounded-md bg-teal-600" type="submit" onClick={(e) => {
                e.preventDefault()
                loginUser()
              }}>Login</button>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block"
            >
              Guest User
            </button>
            <p className="text-center">
              Not a member yet?{" "}
              <Link
                to="/register"
                className="ml-2 link link-hover link-primary capitalize"
              >
                Register
              </Link>
            </p>
          </form>
        </section>
      </div>

    </div>
  );
};

export default Login;
