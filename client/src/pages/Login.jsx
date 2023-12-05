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
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error. please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center bg-zinc-200">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 bg-opacity-40"
      >
        <h4 className="text-center text-3xl font-bold text-teal-800">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
