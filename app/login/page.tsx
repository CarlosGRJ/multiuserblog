"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { showToastError, showToastSuccess } from "../utils/ErrorHandling";
import Link from "next/link";
import { signIn } from "next-auth/react";

function Login() {
  const [values, setValues] = useState({
    email: "carlos@test.com",
    password: "123456"
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginRequest = async () => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      ...values
    });

    setLoading(false);

    if (!result?.ok) {
      showToastError(result?.error ?? "Something went wrong");
    } else {
      showToastSuccess("Login successful");
      router.push("/");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void loginRequest();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleDisable = () => {
    if (
      loading ||
      values.email.trim().length === 0 ||
      values.password.trim().length === 0
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="container">
      <div className="d-flex row justify-content-center align-items-center vh-90">
        <div className="col-lg-5 p-4 shadow">
          <h2 className="fw-bold lead mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control p-3 mb-4"
              placeholder="Email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="form-control p-3 mb-4"
              placeholder="Password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-lg btn-primary w-100 mb-2"
              disabled={handleDisable()}
            >
              {loading ? "Please wait..." : "Submit"}
            </button>
          </form>

          <Link
            href="/forgot-password"
            className="nav-link text-center mt-3 text-danger"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
