import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://user-forgot-backend.onrender.com/api/user/forgotuser",
        values
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to send reset link", error);
      alert("Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <button type="submit">Send Reset Link</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
