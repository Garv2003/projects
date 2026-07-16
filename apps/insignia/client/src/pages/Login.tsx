import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { LoginSchema } from "@/schema";
import { LOGIN_MUTATION } from "@/graphql/schema";

function Login() {
  const [login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      try {
        LoginSchema.validateSync(values, { abortEarly: false });
        return {};
      } catch (error) {
        return (error as yup.ValidationError).inner.reduce((errors, err) => {
          return {
            ...errors,
            [`${err.path}`]: err.message,
          };
        }, {});
      }
    },
    onSubmit: async (values) => {
      try {
        await login({ variables: values });
      } catch (error) {
        reset();
        toast.error((error as Error).message);
      }
    },
  });

  if (data) {
    if (data.login.success) {
      localStorage.setItem("token", data.login.token);
      toast.success(data.login.message);
      reset();
      window.location.assign("/");
    } else {
      reset();
      toast.error(data.login.message);
    }
  }

  if (error) {
    reset();
    toast.error((error as Error)?.message);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Login
        </div>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <span className="text-xs text-red-500">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="mt-6">
            <button
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              type="submit"
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/sign"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
