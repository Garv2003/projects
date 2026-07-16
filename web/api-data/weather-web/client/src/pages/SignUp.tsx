import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import { useRef, useState } from "react";
import "./Login/Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assests/images/logo-1.png";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordhidden = useRef<HTMLInputElement>(null);
  const confirmpasswordhidden = useRef<HTMLInputElement>(null);
  const navigate = useNavigate({ from: "/login" });

  const changeVisibility = (
    setshowpassword: React.Dispatch<React.SetStateAction<boolean>>,
    showpassword: boolean,
    ref: React.RefObject<HTMLInputElement>
  ): void => {
    setshowpassword(!showpassword);
    if (ref.current) ref.current.type = showpassword ? "password" : "text";
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must be 8 characters or more")
        .max(20, "Must be 20 characters or less"),
      confirmpassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_SERVER_URL + "/api/register", {
          fullname: values.fullname,
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          toast.success("Sign up successful", {
            position: "bottom-right",
            theme: "colored",
          });
          formik.resetForm();
          navigate({ to: "/login" });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.error, {
            position: "bottom-right",
            theme: "colored",
          });
        });
    },
  });

  return (
    <div className="login">
      <div className="containerlogin">
        <div className="box1">
          <div className="headinglogin">Sign Up</div>
          <img
            src={logo}
            alt="logo"
            className="logo"
            style={{ width: "100px" }}
          />
          <form className="login-form" onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                id="fullname"
                name="fullname"
                type="text"
                className="login-input"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                placeholder="Full Name"
              />
            </div>
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="error">{formik.errors.fullname}</div>
            ) : null}
            <div className="field">
              <input
                id="username"
                type="name"
                className="login-input"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
            <div className="field">
              <input
                id="email"
                type="name"
                className="login-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
            <div className="field">
              <input
                id="password"
                type="password"
                ref={passwordhidden}
                placeholder="Password"
                className="login-input"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility(
                    setShowPassword,
                    showPassword,
                    passwordhidden
                  );
                }}
              >
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
            <div className="field">
              <input
                type="password"
                placeholder="Confirm Password"
                ref={confirmpasswordhidden}
                id="confirmpassword"
                name="confirmpassword"
                className="login-input"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                autoComplete="off"
              />
              <div
                className="eye"
                onClick={() => {
                  changeVisibility(
                    setShowPassword2,
                    showPassword2,
                    confirmpasswordhidden
                  );
                }}
              >
                {showPassword2 ? (
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
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <div className="error">{formik.errors.confirmpassword}</div>
            ) : null}
            <button className="login-button" title="login" disabled={loading}>
              {loading ? (
                <RotatingLines strokeColor="#fff" width="15" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="hother">Sign up to see weather updates, and more</div>
        </div>
        <div className="box1">
          <p
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            Have an account?{" "}
            <Link className="signup" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
