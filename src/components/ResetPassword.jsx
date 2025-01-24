import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ResetPassword = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    const token = new URLSearchParams(window.location.search).get("token");
    try {
      const response = await axios.post(
        "https://user-forgot-backend.onrender.com/api/user/passwordreset",
        { token, password: values.password }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to reset password", error);
      alert("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>New Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <button type="submit">Reset Password</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
