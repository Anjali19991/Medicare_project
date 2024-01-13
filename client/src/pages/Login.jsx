import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);

      // Check if the login credentials match the admin credentials

      if (
        data.identifier === "medicareadmin@gmail.com" &&
        data.password === "medicare_admin"
      ) {
        // If the credentials match, treat the user as an admin
        // Redirect to admin page or show admin-specific content

        store.dispatch(loginUser(response.data));
        return redirect("/admin-dashboard");
      }

      // For regular users, dispatch the login action and show success toast
      store.dispatch(loginUser(response.data));
      toast.success("Logged in successfully");

      // Redirect to the default home page
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double-check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Guest user login error. Please try again");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center my-40">
      <div className="flex flex-row p-7">

        <div className="bg-teal-700 p-5  flex items-center justify-center flex-col w-[30rem]">
          <h1 className="text-white font-medium text-3xl">Welcome Back!</h1>
          <h3 className="text-white  text-lg mt-4 w-[22rem]">
            We are so very happy to have you here. It is great to see you again.
            We hope you had a safe and enjoyable time away.
          </h3>
        </div>

        <section className="grid place-items-center bg-zinc-200">
          <Form
            method="post"
            className=" p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 bg-opacity-40 w-[25rem]"
          >
            <h4 className="text-center text-3xl font-bold text-teal-800">
              Login
            </h4>
            <FormInput type="email" label="Email" name="identifier" />
            <FormInput type="password" label="Password" name="password" />
            <div className="mt-4">
              <SubmitBtn text="Login" />
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={loginAsGuestUser}
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
          </Form>
        </section>
      </div>

    </div>
  );
};

export default Login;
