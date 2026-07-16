import { useState, useRef } from "react";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assests/images/logo-1.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordhidden = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must be 8 characters or more")
        .max(20, "Must be 20 characters or less"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(
          import.meta.env.VITE_SERVER_URL + "/api/login",
          {
            username: values.username,
            password: values.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setLoading(false);
          localStorage.setItem("token", res.data.token);
          formik.resetForm();
          window.location.assign("/profile");
          toast.success("Logged in successfully", {
            position: "bottom-right",
            theme: "colored",
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            theme: "colored",
          });
        });
    },
  });

  const changeVisibility = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      if (passwordhidden.current) passwordhidden.current.type = "password";
    } else {
      if (passwordhidden.current) passwordhidden.current.type = "text";
    }
  };

  return (
    <div className="login">
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin">Login</div>
          <img
            src={logo}
            alt="logo"
            className="logo"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              margin: "auto",
              marginBottom: "20px",
            }}
          />
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="Enter your email"
                autoComplete="off"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
            <div className="field">
              <input
                id="password"
                value={formik.values.password}
                className="login-input"
                onChange={formik.handleChange}
                type="password"
                ref={passwordhidden}
                placeholder="Enter your password"
                autoComplete="on"
              />
              <div className="eye" onClick={() => changeVisibility()}>
                {showPassword ? (
                  <MdVisibilityOff
                    style={{
                      color: "#d7d7d7",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <MdVisibility
                    style={{
                      color: "grey",
                      fontSize: "20px",
                    }}
                  />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
            <button
              className="login-button"
              type="submit"
              title="Login"
              disabled={loading}
            >
              {loading ? (
                <RotatingLines strokeColor="#fff" width="15" />
              ) : (
                "Log In"
              )}
            </button>
            <div className="other">
              {/* <Link className="forgot-password" to="">
                Forgot password?
              </Link> */}
            </div>
          </form>
        </div>
        <div className="box1">
          <p
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
