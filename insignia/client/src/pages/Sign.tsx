import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { SignSchema } from "@/schema";
import { SIGN_MUTATION } from "@/graphql/schema";

const Sign = () => {
  const [sign, { data, loading, error, reset }] = useMutation(SIGN_MUTATION);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      try {
        SignSchema.validateSync(values, { abortEarly: false });
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
      const NewValues = {
        email: values.email,
        password: values.password,
        name: values.name,
      };

      try {
        await sign({ variables: NewValues });
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  });

  if (data) {
    if (data.sign.success) {
      formik.resetForm();
      reset();
      toast.success(data.sign.message);
      navigate("/login");
    } else {
      reset();
      toast.error(data.sign.message);
    }
  }

  if (error) {
    toast.error("Something went wrong");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Sign Up
        </div>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="name"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          {formik.errors.name && formik.touched.name ? (
            <span className="text-xs text-red-500">{formik.errors.name}</span>
          ) : null}
          <div className="mt-4">
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>

          {formik.errors.email && formik.touched.email ? (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          ) : null}

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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>

          {formik.errors.password && formik.touched.password ? (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          ) : null}

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
          </div>

          {formik.errors.password && formik.touched.password ? (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          ) : null}

          <div className="mt-6">
            <button
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
