import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "Please double-check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-full w-full flex items-center justify-center my-40">
      <div className="flex flex-row p-7">
    
        <div className="bg-teal-700 p-5 flex items-center justify-center flex-col w-[30rem]">
          <h1 className="text-white font-medium text-3xl">Join Us Today!</h1>
          <h3 className="text-white text-lg mt-4 w-[22rem]">
            Create an account and be part of our community. We can't wait to welcome you aboard!
          </h3>
        </div>


        <section className="grid place-items-center bg-zinc-200">
          <Form
            method="post"
            className="p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 bg-opacity-40 w-[25rem]"
          >
            <h4 className="text-center text-3xl font-bold text-teal-800">
              Register
            </h4>
            <FormInput type="text" label="Username" name="username" />
            <FormInput type="email" label="Email" name="email" />
            <FormInput type="password" label="Password" name="password" />
            <div className="mt-4">
              <SubmitBtn text="Register" />
            </div>
            <p className="text-center">
              Already a member?{" "}
              <Link
                to="/login"
                className="ml-2 link link-hover link-primary capitalize"
              >
                Login
              </Link>
            </p>
          </Form>
        </section>
      </div>
    </section>
  );
};

export default Register;
